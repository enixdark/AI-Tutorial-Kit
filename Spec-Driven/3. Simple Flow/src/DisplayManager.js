/**
 * DisplayManager - Updates DOM with results and UI state.
 * Handles result display, history rendering, and error messages.
 * Requirements: 3.1, 3.2, 3.3, 3.4, 5.1, 5.2, 5.3
 */

class DisplayManager {
  constructor() {
    // DOM element references
    this.elements = {
      resultsContainer: document.getElementById('resultsContainer'),
      resultRange: document.getElementById('resultRange'),
      primeCount: document.getElementById('primeCount'),
      computeTime: document.getElementById('computeTime'),
      resultTimestamp: document.getElementById('resultTimestamp'),
      primeListContainer: document.getElementById('primeListContainer'),
      primeList: document.getElementById('primeList'),
      togglePrimesBtn: document.getElementById('togglePrimesBtn'),
      loadingSpinner: document.getElementById('loadingSpinner'),
      loadingMessage: document.getElementById('loadingMessage'),
      errorContainer: document.getElementById('errorContainer'),
      historyContainer: document.getElementById('historyContainer'),
      historyList: document.getElementById('historyList'),
      emptyHistoryMessage: document.getElementById('emptyHistoryMessage'),
      clearHistoryBtn: document.getElementById('clearHistoryBtn')
    };
  }

  /**
   * Display calculation result.
   * Shows range, prime count, computation time, and timestamp.
   *
   * @param {Object} result - CalculationResult to display
   */
  showResult(result) {
    // Update result fields
    this.elements.resultRange.textContent = result.range.toLocaleString();
    this.elements.primeCount.textContent = result.primeCount.toLocaleString();
    this.elements.computeTime.textContent = result.computeTimeMs;

    // Format timestamp as readable date
    const date = new Date(result.timestamp);
    this.elements.resultTimestamp.textContent = date.toLocaleString();

    // Show results container
    this.elements.resultsContainer.style.display = 'block';

    // Reset prime list visibility
    this.elements.primeListContainer.style.display = 'none';
    if (this.elements.togglePrimesBtn) {
      this.elements.togglePrimesBtn.textContent = 'Show Prime List';
    }

    // Hide error
    this.clearError();
  }

  /**
   * Display full list of prime numbers.
   * Renders primes in a grid layout.
   *
   * @param {number[]} primes - Array of prime numbers to display
   */
  showPrimeList(primes) {
    // Clear existing list
    this.elements.primeList.innerHTML = '';

    // Add each prime as a span
    for (const prime of primes) {
      const span = document.createElement('span');
      span.textContent = prime;
      this.elements.primeList.appendChild(span);
    }

    // Show container
    this.elements.primeListContainer.style.display = 'block';
  }

  /**
   * Display calculation history.
   * Shows list of previous results with delete buttons.
   *
   * @param {Object[]} results - Array of CalculationResult objects
   */
  showHistory(results) {
    // Clear existing list
    this.elements.historyList.innerHTML = '';

    if (!results || results.length === 0) {
      // Show empty state
      this.elements.historyContainer.style.display = 'none';
      this.elements.emptyHistoryMessage.style.display = 'block';
      this.elements.clearHistoryBtn.style.display = 'none';
      return;
    }

    // Show history and clear button
    this.elements.emptyHistoryMessage.style.display = 'none';
    this.elements.historyContainer.style.display = 'block';
    this.elements.clearHistoryBtn.style.display = 'block';

    // Add each result to list
    for (const result of results) {
      const li = document.createElement('li');

      // History info (clickable)
      const infoDiv = document.createElement('div');
      infoDiv.className = 'history-info';

      const detailDiv = document.createElement('div');
      detailDiv.className = 'history-detail';
      detailDiv.textContent = `Range: ${result.range.toLocaleString()} | Primes: ${result.primeCount.toLocaleString()}`;

      const timeDiv = document.createElement('div');
      timeDiv.className = 'history-time';
      const date = new Date(result.timestamp);
      timeDiv.textContent = date.toLocaleString();

      infoDiv.appendChild(detailDiv);
      infoDiv.appendChild(timeDiv);

      // Make clickable to select result
      infoDiv.style.cursor = 'pointer';
      infoDiv.addEventListener('click', () => {
        if (window.handleHistorySelect) {
          window.handleHistorySelect(result.id);
        }
      });

      // Delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.handleHistoryDelete) {
          window.handleHistoryDelete(result.id, e);
        }
      });

      li.appendChild(infoDiv);
      li.appendChild(deleteBtn);
      this.elements.historyList.appendChild(li);
    }
  }

  /**
   * Show or hide loading indicator.
   * Updates loading message and spinner visibility.
   *
   * @param {boolean} show - True to show, false to hide
   * @param {string} [message] - Optional loading message
   */
  showLoading(show, message = 'Calculating...') {
    if (show) {
      this.elements.loadingMessage.textContent = message;
      this.elements.loadingSpinner.style.display = 'block';
    } else {
      this.elements.loadingSpinner.style.display = 'none';
    }
  }

  /**
   * Display error message.
   * Shows red error banner with message.
   *
   * @param {string} message - Error message to display
   */
  showError(message) {
    if (!message || message === '') {
      this.clearError();
      return;
    }

    this.elements.errorContainer.textContent = message;
    this.elements.errorContainer.style.display = 'block';
  }

  /**
   * Clear error message display.
   */
  clearError() {
    this.elements.errorContainer.style.display = 'none';
    this.elements.errorContainer.textContent = '';
  }

  /**
   * Clear all result displays.
   * Hides results container and prime list.
   */
  clearResults() {
    this.elements.resultsContainer.style.display = 'none';
    this.elements.primeListContainer.style.display = 'none';
    this.elements.primeList.innerHTML = '';
  }
}

// Export for Node.js/Jest
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DisplayManager;
}
