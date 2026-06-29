/**
 * Unit tests for StorageManager class.
 * Tests localStorage operations with mocked localStorage.
 * Requirements: 4.1, 4.2
 */

const StorageManager = require('../src/StorageManager.js');

describe('StorageManager', () => {
  let manager;
  let mockStorage;

  beforeEach(() => {
    // Mock localStorage - create fresh instance per test
    mockStorage = {};
    global.localStorage = {
      getItem: (key) => mockStorage[key] || null,
      setItem: (key, value) => {
        mockStorage[key] = value;
      },
      removeItem: (key) => {
        delete mockStorage[key];
      },
      clear: () => {
        mockStorage = {};
      }
    };

    manager = new StorageManager();
  });

  afterEach(() => {
    // Clean up between tests
    mockStorage = {};
    if (global.localStorage) {
      delete global.localStorage;
    }
  });

  describe('isAvailable', () => {
    test('returns true when localStorage is available', () => {
      expect(manager.isAvailable()).toBe(true);
    });

    test('returns false when localStorage throws on setItem', () => {
      // Create new localStorage mock that throws
      global.localStorage = {
        setItem: () => {
          throw new Error('localStorage not available');
        },
        getItem: () => null,
        removeItem: () => {},
        clear: () => {}
      };

      const newManager = new StorageManager();
      expect(newManager.isAvailable()).toBe(false);
    });
  });

  describe('saveResult', () => {
    test('saves single result to localStorage', () => {
      const result = {
        id: 'test-1',
        range: 100,
        primeCount: 25,
        timestamp: Date.now(),
        computeTimeMs: 5
      };

      manager.saveResult(result);

      const stored = JSON.parse(mockStorage[StorageManager.STORAGE_KEY]);
      expect(stored).toHaveLength(1);
      expect(stored[0]).toEqual(result);
    });

    test('saves multiple results in order (newest first)', () => {
      const result1 = {
        id: 'test-1',
        range: 100,
        primeCount: 25,
        timestamp: 1000,
        computeTimeMs: 5
      };

      const result2 = {
        id: 'test-2',
        range: 200,
        primeCount: 46,
        timestamp: 2000,
        computeTimeMs: 10
      };

      manager.saveResult(result1);
      manager.saveResult(result2);

      const stored = JSON.parse(mockStorage[StorageManager.STORAGE_KEY]);
      expect(stored).toHaveLength(2);
      expect(stored[0]).toEqual(result2); // Newer first
      expect(stored[1]).toEqual(result1);
    });

    test('maintains max 10 items', () => {
      for (let i = 0; i < 15; i++) {
        const result = {
          id: `test-${i}`,
          range: 100 + i,
          primeCount: 25 + i,
          timestamp: 1000 + i,
          computeTimeMs: 5
        };
        manager.saveResult(result);
      }

      const stored = JSON.parse(mockStorage[StorageManager.STORAGE_KEY]);
      expect(stored).toHaveLength(10);
      // Oldest items should be removed
      expect(stored[0].id).toBe('test-14'); // Most recent
      expect(stored[9].id).toBe('test-5'); // 10th most recent
    });

    test('throws error if localStorage unavailable', () => {
      const tempStorage = global.localStorage;
      global.localStorage = {
        setItem: () => {
          throw new Error('localStorage not available');
        },
        getItem: () => null,
        removeItem: () => {},
        clear: () => {}
      };

      const newManager = new StorageManager();

      const result = {
        id: 'test-1',
        range: 100,
        primeCount: 25,
        timestamp: Date.now(),
        computeTimeMs: 5
      };

      expect(() => newManager.saveResult(result)).toThrow();

      // Restore
      global.localStorage = tempStorage;
    });
  });

  describe('getHistory', () => {
    test('returns empty array when no history exists', () => {
      const history = manager.getHistory();
      expect(history).toEqual([]);
    });

    test('retrieves stored history', () => {
      const result = {
        id: 'test-1',
        range: 100,
        primeCount: 25,
        timestamp: Date.now(),
        computeTimeMs: 5
      };

      manager.saveResult(result);
      const history = manager.getHistory();

      expect(history).toHaveLength(1);
      expect(history[0]).toEqual(result);
    });

    test('retrieves multiple results in correct order', () => {
      const result1 = { id: 'test-1', range: 100, primeCount: 25, timestamp: 1000, computeTimeMs: 5 };
      const result2 = { id: 'test-2', range: 200, primeCount: 46, timestamp: 2000, computeTimeMs: 10 };

      manager.saveResult(result1);
      manager.saveResult(result2);

      const history = manager.getHistory();
      expect(history).toHaveLength(2);
      expect(history[0].id).toBe('test-2'); // Newest first
      expect(history[1].id).toBe('test-1');
    });

    test('returns empty array if localStorage data is corrupted', () => {
      mockStorage[StorageManager.STORAGE_KEY] = 'invalid json {]';
      const history = manager.getHistory();
      expect(history).toEqual([]);
    });

    test('returns empty array if localStorage unavailable', () => {
      const tempStorage = global.localStorage;
      global.localStorage = {
        setItem: () => {
          throw new Error('localStorage not available');
        },
        getItem: () => {
          throw new Error('localStorage not available');
        },
        removeItem: () => {},
        clear: () => {}
      };

      const newManager = new StorageManager();
      const history = newManager.getHistory();
      expect(history).toEqual([]);

      // Restore
      global.localStorage = tempStorage;
    });
  });

  describe('deleteResult', () => {
    test('removes result by id', () => {
      const result1 = { id: 'test-1', range: 100, primeCount: 25, timestamp: 1000, computeTimeMs: 5 };
      const result2 = { id: 'test-2', range: 200, primeCount: 46, timestamp: 2000, computeTimeMs: 10 };

      manager.saveResult(result1);
      manager.saveResult(result2);

      manager.deleteResult('test-1');

      const history = manager.getHistory();
      expect(history).toHaveLength(1);
      expect(history[0].id).toBe('test-2');
    });

    test('does nothing if result id not found', () => {
      const result = { id: 'test-1', range: 100, primeCount: 25, timestamp: 1000, computeTimeMs: 5 };

      manager.saveResult(result);
      manager.deleteResult('nonexistent-id');

      const history = manager.getHistory();
      expect(history).toHaveLength(1);
      expect(history[0].id).toBe('test-1');
    });

    test('does nothing if localStorage unavailable', () => {
      const tempStorage = global.localStorage;
      global.localStorage = {
        setItem: () => {
          throw new Error('localStorage not available');
        },
        getItem: () => null,
        removeItem: () => {},
        clear: () => {}
      };

      const newManager = new StorageManager();
      expect(() => newManager.deleteResult('test-1')).not.toThrow();

      // Restore
      global.localStorage = tempStorage;
    });
  });

  describe('clearHistory', () => {
    test('removes all results', () => {
      const result1 = { id: 'test-1', range: 100, primeCount: 25, timestamp: 1000, computeTimeMs: 5 };
      const result2 = { id: 'test-2', range: 200, primeCount: 46, timestamp: 2000, computeTimeMs: 10 };

      manager.saveResult(result1);
      manager.saveResult(result2);

      manager.clearHistory();

      const history = manager.getHistory();
      expect(history).toEqual([]);
    });

    test('does nothing if localStorage unavailable', () => {
      const tempStorage = global.localStorage;
      global.localStorage = {
        setItem: () => {
          throw new Error('localStorage not available');
        },
        getItem: () => null,
        removeItem: () => {
          throw new Error('localStorage not available');
        },
        clear: () => {}
      };

      const newManager = new StorageManager();
      expect(() => newManager.clearHistory()).not.toThrow();

      // Restore
      global.localStorage = tempStorage;
    });
  });

});
