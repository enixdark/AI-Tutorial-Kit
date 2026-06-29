/**
 * Unit tests for HistoryManager class.
 * Tests in-memory history state and storage synchronization.
 * Requirements: 5.1, 5.2, 5.3
 */

const HistoryManager = require('../src/HistoryManager.js');
const StorageManager = require('../src/StorageManager.js');

describe('HistoryManager', () => {
  let manager;
  let mockStorage;
  let mockStorageInstance;

  beforeEach(() => {
    // Mock localStorage
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

    manager = new HistoryManager();

    // Inject real StorageManager instance
    mockStorageInstance = new StorageManager();
    manager.storage = mockStorageInstance;
  });

  afterEach(() => {
    mockStorage = {};
    if (global.localStorage) {
      delete global.localStorage;
    }
  });

  describe('add', () => {
    test('stores new result in history', () => {
      const result = {
        id: 'test-1',
        range: 100,
        primeCount: 25,
        timestamp: 1000,
        computeTimeMs: 5
      };

      manager.add(result);

      expect(manager.getAll()).toHaveLength(1);
      expect(manager.getAll()[0]).toEqual(result);
    });

    test('adds results newest first', () => {
      const result1 = { id: 'test-1', range: 100, primeCount: 25, timestamp: 1000, computeTimeMs: 5 };
      const result2 = { id: 'test-2', range: 200, primeCount: 46, timestamp: 2000, computeTimeMs: 10 };

      manager.add(result1);
      manager.add(result2);

      const all = manager.getAll();
      expect(all).toHaveLength(2);
      expect(all[0]).toEqual(result2); // Newer first
      expect(all[1]).toEqual(result1);
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
        manager.add(result);
      }

      const all = manager.getAll();
      expect(all).toHaveLength(10);
      // Most recent should be test-14, oldest should be test-5
      expect(all[0].id).toBe('test-14');
      expect(all[9].id).toBe('test-5');
    });

    test('persists result to storage', () => {
      const result = {
        id: 'test-1',
        range: 100,
        primeCount: 25,
        timestamp: 1000,
        computeTimeMs: 5
      };

      manager.add(result);

      const stored = mockStorageInstance.getHistory();
      expect(stored).toHaveLength(1);
      expect(stored[0]).toEqual(result);
    });

    test('persists each new result to storage', () => {
      const result1 = { id: 'test-1', range: 100, primeCount: 25, timestamp: 1000, computeTimeMs: 5 };
      const result2 = { id: 'test-2', range: 200, primeCount: 46, timestamp: 2000, computeTimeMs: 10 };

      manager.add(result1);
      manager.add(result2);

      const stored = mockStorageInstance.getHistory();
      expect(stored).toHaveLength(2);
      expect(stored[0].id).toBe('test-2'); // Newest first in storage too
    });
  });

  describe('getAll', () => {
    test('returns empty array initially', () => {
      const all = manager.getAll();
      expect(all).toEqual([]);
    });

    test('returns copy not reference', () => {
      const result = { id: 'test-1', range: 100, primeCount: 25, timestamp: 1000, computeTimeMs: 5 };
      manager.add(result);

      const all1 = manager.getAll();
      const all2 = manager.getAll();

      expect(all1).not.toBe(all2); // Different array instances
      expect(all1).toEqual(all2); // But equal content
    });

    test('returns items in correct order', () => {
      for (let i = 0; i < 5; i++) {
        manager.add({
          id: `test-${i}`,
          range: 100 + i,
          primeCount: 25 + i,
          timestamp: 1000 + i,
          computeTimeMs: 5
        });
      }

      const all = manager.getAll();
      for (let i = 1; i < all.length; i++) {
        const prevId = parseInt(all[i - 1].id.split('-')[1]);
        const currId = parseInt(all[i].id.split('-')[1]);
        expect(prevId).toBeGreaterThan(currId); // Descending order
      }
    });
  });

  describe('delete', () => {
    test('removes result by id', () => {
      const result1 = { id: 'test-1', range: 100, primeCount: 25, timestamp: 1000, computeTimeMs: 5 };
      const result2 = { id: 'test-2', range: 200, primeCount: 46, timestamp: 2000, computeTimeMs: 10 };

      manager.add(result1);
      manager.add(result2);

      manager.delete('test-1');

      const all = manager.getAll();
      expect(all).toHaveLength(1);
      expect(all[0].id).toBe('test-2');
    });

    test('does nothing if id not found', () => {
      const result = { id: 'test-1', range: 100, primeCount: 25, timestamp: 1000, computeTimeMs: 5 };

      manager.add(result);
      manager.delete('nonexistent');

      const all = manager.getAll();
      expect(all).toHaveLength(1);
      expect(all[0].id).toBe('test-1');
    });

    test('persists deletion to storage', () => {
      const result1 = { id: 'test-1', range: 100, primeCount: 25, timestamp: 1000, computeTimeMs: 5 };
      const result2 = { id: 'test-2', range: 200, primeCount: 46, timestamp: 2000, computeTimeMs: 10 };

      manager.add(result1);
      manager.add(result2);

      manager.delete('test-1');

      const stored = mockStorageInstance.getHistory();
      expect(stored).toHaveLength(1);
      expect(stored[0].id).toBe('test-2');
    });

    test('can delete multiple items', () => {
      for (let i = 0; i < 5; i++) {
        manager.add({
          id: `test-${i}`,
          range: 100 + i,
          primeCount: 25 + i,
          timestamp: 1000 + i,
          computeTimeMs: 5
        });
      }

      manager.delete('test-0');
      manager.delete('test-2');

      const all = manager.getAll();
      expect(all).toHaveLength(3);
      expect(all.map(r => r.id)).toEqual(['test-4', 'test-3', 'test-1']);
    });
  });

  describe('getById', () => {
    test('returns result by id', () => {
      const result1 = { id: 'test-1', range: 100, primeCount: 25, timestamp: 1000, computeTimeMs: 5 };
      const result2 = { id: 'test-2', range: 200, primeCount: 46, timestamp: 2000, computeTimeMs: 10 };

      manager.add(result1);
      manager.add(result2);

      const found = manager.getById('test-1');
      expect(found).toEqual(result1);
    });

    test('returns null if id not found', () => {
      const result = { id: 'test-1', range: 100, primeCount: 25, timestamp: 1000, computeTimeMs: 5 };
      manager.add(result);

      const found = manager.getById('nonexistent');
      expect(found).toBeNull();
    });

    test('finds result regardless of position in history', () => {
      for (let i = 0; i < 5; i++) {
        manager.add({
          id: `test-${i}`,
          range: 100 + i,
          primeCount: 25 + i,
          timestamp: 1000 + i,
          computeTimeMs: 5
        });
      }

      // Find oldest item
      const found = manager.getById('test-0');
      expect(found).not.toBeNull();
      expect(found.id).toBe('test-0');
    });
  });

  describe('loadFromStorage', () => {
    test('loads history from storage on initialization', () => {
      // Add items to storage first
      const result1 = { id: 'test-1', range: 100, primeCount: 25, timestamp: 1000, computeTimeMs: 5 };
      const result2 = { id: 'test-2', range: 200, primeCount: 46, timestamp: 2000, computeTimeMs: 10 };

      mockStorageInstance.saveResult(result1);
      mockStorageInstance.saveResult(result2);

      // Create new manager and load
      const newManager = new HistoryManager();
      newManager.storage = mockStorageInstance;
      newManager.loadFromStorage();

      const all = newManager.getAll();
      expect(all).toHaveLength(2);
      expect(all[0].id).toBe('test-2'); // Newest first
      expect(all[1].id).toBe('test-1');
    });

    test('loads empty array if storage is empty', () => {
      const newManager = new HistoryManager();
      newManager.storage = mockStorageInstance;
      newManager.loadFromStorage();

      expect(newManager.getAll()).toEqual([]);
    });

    test('preserves loaded order when adding new items', () => {
      // Load from storage
      const result1 = { id: 'stored-1', range: 100, primeCount: 25, timestamp: 1000, computeTimeMs: 5 };
      mockStorageInstance.saveResult(result1);

      const newManager = new HistoryManager();
      newManager.storage = mockStorageInstance;
      newManager.loadFromStorage();

      // Add new item
      const result2 = { id: 'new-1', range: 200, primeCount: 46, timestamp: 2000, computeTimeMs: 10 };
      newManager.add(result2);

      const all = newManager.getAll();
      expect(all[0].id).toBe('new-1'); // New item first
      expect(all[1].id).toBe('stored-1'); // Old item second
    });
  });
});
