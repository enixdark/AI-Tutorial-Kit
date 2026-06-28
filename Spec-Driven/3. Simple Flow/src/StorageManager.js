/**
 * StorageManager - Handles localStorage operations for history persistence.
 * Manages JSON serialization, quota handling, and error recovery.
 * Requirements: 4.1, 4.2, 5.4, 5.1
 */

class StorageManager {
  // Storage key for history
  static STORAGE_KEY = 'prime-calculator-history';

  /**
   * Save a calculation result to localStorage.
   * Handles quota exceeded errors by auto-deleting oldest items.
   *
   * @param {Object} result - CalculationResult to save
   * @throws {Error} If localStorage is unavailable (after retry)
   */
  saveResult(result) {
    if (!this.isAvailable()) {
      throw new Error('localStorage is not available');
    }

    try {
      const history = this.getHistory();
      history.unshift(result); // Add to front (newest first)

      // Keep max 10 items
      if (history.length > 10) {
        history.pop();
      }

      const json = JSON.stringify(history);
      localStorage.setItem(StorageManager.STORAGE_KEY, json);
    } catch (error) {
      // Handle quota exceeded
      if (error.name === 'QuotaExceededError') {
        try {
          // Delete oldest 2 items and retry
          const history = this.getHistory();
          if (history.length >= 2) {
            history.pop();
            history.pop();
          } else if (history.length > 0) {
            history.pop();
          }

          const json = JSON.stringify(history);
          localStorage.setItem(StorageManager.STORAGE_KEY, json);

          // Now try to save the new result
          this.saveResult(result);
        } catch (retryError) {
          throw new Error('localStorage quota exceeded and cleanup failed');
        }
      } else {
        throw error;
      }
    }
  }

  /**
   * Retrieve all calculation results from localStorage.
   * Returns empty array if no history exists.
   *
   * @returns {Object[]} Array of CalculationResult objects
   */
  getHistory() {
    if (!this.isAvailable()) {
      return [];
    }

    try {
      const json = localStorage.getItem(StorageManager.STORAGE_KEY);
      if (!json) {
        return [];
      }

      const history = JSON.parse(json);
      return Array.isArray(history) ? history : [];
    } catch (error) {
      // Corrupted data in localStorage
      console.error('Error parsing localStorage history:', error);
      return [];
    }
  }

  /**
   * Delete a specific result by id from localStorage.
   *
   * @param {string} id - Result id to delete
   */
  deleteResult(id) {
    if (!this.isAvailable()) {
      return;
    }

    try {
      const history = this.getHistory();
      const filtered = history.filter(result => result.id !== id);
      const json = JSON.stringify(filtered);
      localStorage.setItem(StorageManager.STORAGE_KEY, json);
    } catch (error) {
      console.error('Error deleting result from localStorage:', error);
    }
  }

  /**
   * Clear all results from localStorage.
   */
  clearHistory() {
    if (!this.isAvailable()) {
      return;
    }

    try {
      localStorage.removeItem(StorageManager.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  }

  /**
   * Check if localStorage is available and writable.
   * Performs a write test to verify functionality.
   *
   * @returns {boolean} True if localStorage is accessible and writable
   */
  isAvailable() {
    try {
      const testKey = '__localStorage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      // localStorage not available (private browsing, quota exceeded, etc.)
      return false;
    }
  }
}

// Export for Node.js/Jest
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StorageManager;
}
