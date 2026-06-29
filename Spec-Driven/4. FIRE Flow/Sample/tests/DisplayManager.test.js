/**
 * Integration tests for DisplayManager class.
 * Tests DOM updates for results, history, and error display.
 * Requirements: 3.1, 3.2, 3.3
 */

const DisplayManager = require('../src/DisplayManager.js');

describe('DisplayManager', () => {
  let display;
  let container;

  beforeEach(() => {
    // Create mock DOM
    document.body.innerHTML = `
      <div id="resultsContainer" style="display: none;">
        <div id="resultRange">-</div>
        <div id="primeCount">-</div>
        <div id="computeTime">-</div>
        <div id="resultTimestamp">-</div>
        <button id="togglePrimesBtn">Show Prime List</button>
        <div id="primeListContainer" style="display: none;">
          <div id="primeList"></div>
        </div>
      </div>
      <div id="loadingSpinner" style="display: none;">
        <p id="loadingMessage">Calculating...</p>
      </div>
      <div id="errorContainer" style="display: none;"></div>
      <div id="historyContainer" style="display: none;">
        <ul id="historyList"></ul>
      </div>
      <div id="emptyHistoryMessage" style="display: block;">No calculations yet</div>
      <button id="clearHistoryBtn" style="display: none;">Clear History</button>
    `;

    display = new DisplayManager();
  });

  describe('showResult', () => {
    test('displays calculation result', () => {
      const result = {
        id: 'test-1',
        range: 100,
        primeCount: 25,
        timestamp: 1704067200000,
        computeTimeMs: 5
      };

      display.showResult(result);

      expect(document.getElementById('resultsContainer').style.display).toBe('block');
      expect(document.getElementById('resultRange').textContent).toBe('100');
      expect(document.getElementById('primeCount').textContent).toBe('25');
      expect(document.getElementById('computeTime').textContent).toBe('5');
    });

    test('formats large numbers with commas', () => {
      const result = {
        id: 'test-1',
        range: 1000000,
        primeCount: 78498,
        timestamp: Date.now(),
        computeTimeMs: 100
      };

      display.showResult(result);

      expect(document.getElementById('resultRange').textContent).toBe('1,000,000');
      expect(document.getElementById('primeCount').textContent).toBe('78,498');
    });

    test('formats timestamp as readable date', () => {
      const testDate = new Date('2024-01-01T12:00:00Z');
      const result = {
        id: 'test-1',
        range: 100,
        primeCount: 25,
        timestamp: testDate.getTime(),
        computeTimeMs: 5
      };

      display.showResult(result);

      const timestampText = document.getElementById('resultTimestamp').textContent;
      expect(timestampText).toContain('2024');
      expect(timestampText).toContain('1');
    });

    test('hides prime list when showing new result', () => {
      const result = {
        id: 'test-1',
        range: 100,
        primeCount: 25,
        timestamp: Date.now(),
        computeTimeMs: 5
      };

      display.showResult(result);

      expect(document.getElementById('primeListContainer').style.display).toBe('none');
      expect(document.getElementById('togglePrimesBtn').textContent).toBe('Show Prime List');
    });

    test('clears previous error when showing result', () => {
      display.showError('Previous error');
      expect(document.getElementById('errorContainer').style.display).toBe('block');

      const result = {
        id: 'test-1',
        range: 100,
        primeCount: 25,
        timestamp: Date.now(),
        computeTimeMs: 5
      };

      display.showResult(result);

      expect(document.getElementById('errorContainer').style.display).toBe('none');
    });
  });

  describe('showPrimeList', () => {
    test('displays list of primes', () => {
      const primes = [2, 3, 5, 7, 11];
      display.showPrimeList(primes);

      const primeElements = document.querySelectorAll('#primeList span');
      expect(primeElements).toHaveLength(5);
      expect(primeElements[0].textContent).toBe('2');
      expect(primeElements[4].textContent).toBe('11');
    });

    test('shows prime list container', () => {
      display.showPrimeList([2, 3, 5]);

      expect(document.getElementById('primeListContainer').style.display).toBe('block');
    });

    test('clears previous primes before adding new ones', () => {
      display.showPrimeList([2, 3]);
      expect(document.querySelectorAll('#primeList span')).toHaveLength(2);

      display.showPrimeList([5, 7, 11]);
      expect(document.querySelectorAll('#primeList span')).toHaveLength(3);
    });

    test('handles large prime lists', () => {
      const primes = Array.from({ length: 100 }, (_, i) => i + 2);
      display.showPrimeList(primes);

      expect(document.querySelectorAll('#primeList span')).toHaveLength(100);
    });
  });

  describe('showHistory', () => {
    test('displays history list', () => {
      const results = [
        { id: 'test-1', range: 100, primeCount: 25, timestamp: 1704067200000 },
        { id: 'test-2', range: 200, primeCount: 46, timestamp: 1704067260000 }
      ];

      display.showHistory(results);

      const items = document.querySelectorAll('#historyList li');
      expect(items).toHaveLength(2);
      expect(document.getElementById('historyContainer').style.display).toBe('block');
      expect(document.getElementById('emptyHistoryMessage').style.display).toBe('none');
    });

    test('shows empty message when no history', () => {
      display.showHistory([]);

      expect(document.getElementById('historyContainer').style.display).toBe('none');
      expect(document.getElementById('emptyHistoryMessage').style.display).toBe('block');
      expect(document.getElementById('clearHistoryBtn').style.display).toBe('none');
    });

    test('shows clear button when history exists', () => {
      const results = [{ id: 'test-1', range: 100, primeCount: 25, timestamp: Date.now() }];
      display.showHistory(results);

      expect(document.getElementById('clearHistoryBtn').style.display).toBe('block');
    });

    test('displays result info and delete button for each item', () => {
      const results = [{ id: 'test-1', range: 100, primeCount: 25, timestamp: Date.now() }];
      display.showHistory(results);

      const item = document.querySelector('#historyList li');
      const detail = item.querySelector('.history-detail');
      const deleteBtn = item.querySelector('.delete-btn');

      expect(detail.textContent).toContain('100');
      expect(detail.textContent).toContain('25');
      expect(deleteBtn.textContent).toBe('Delete');
    });

    test('formats numbers in history with commas', () => {
      const results = [
        { id: 'test-1', range: 1000000, primeCount: 78498, timestamp: Date.now() }
      ];

      display.showHistory(results);

      const detail = document.querySelector('.history-detail');
      expect(detail.textContent).toContain('1,000,000');
      expect(detail.textContent).toContain('78,498');
    });

    test('handles null or undefined results gracefully', () => {
      expect(() => display.showHistory(null)).not.toThrow();
      expect(() => display.showHistory(undefined)).not.toThrow();

      const message = document.getElementById('emptyHistoryMessage');
      expect(message.style.display).toBe('block');
    });
  });

  describe('showLoading', () => {
    test('shows loading spinner', () => {
      display.showLoading(true);

      expect(document.getElementById('loadingSpinner').style.display).toBe('block');
    });

    test('hides loading spinner', () => {
      display.showLoading(false);

      expect(document.getElementById('loadingSpinner').style.display).toBe('none');
    });

    test('updates loading message', () => {
      display.showLoading(true, 'Processing...');

      expect(document.getElementById('loadingMessage').textContent).toBe('Processing...');
    });

    test('uses default message when not provided', () => {
      display.showLoading(true);

      expect(document.getElementById('loadingMessage').textContent).toBe('Calculating...');
    });
  });

  describe('showError', () => {
    test('displays error message', () => {
      display.showError('This is an error');

      expect(document.getElementById('errorContainer').style.display).toBe('block');
      expect(document.getElementById('errorContainer').textContent).toBe('This is an error');
    });

    test('clears error when empty string passed', () => {
      display.showError('Error message');
      display.showError('');

      expect(document.getElementById('errorContainer').style.display).toBe('none');
      expect(document.getElementById('errorContainer').textContent).toBe('');
    });

    test('clears error when called with clearError', () => {
      display.showError('Error');
      display.clearError();

      expect(document.getElementById('errorContainer').style.display).toBe('none');
    });
  });

  describe('clearResults', () => {
    test('hides results container and prime list', () => {
      // Show results first
      const result = { id: 'test-1', range: 100, primeCount: 25, timestamp: Date.now(), computeTimeMs: 5 };
      display.showResult(result);

      // Clear results
      display.clearResults();

      expect(document.getElementById('resultsContainer').style.display).toBe('none');
      expect(document.getElementById('primeListContainer').style.display).toBe('none');
    });

    test('clears prime list content', () => {
      display.showPrimeList([2, 3, 5]);
      display.clearResults();

      expect(document.getElementById('primeList').innerHTML).toBe('');
    });
  });
});
