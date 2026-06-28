/**
 * HistoryManager - Manages in-memory history state and localStorage synchronization.
 * Maintains max 10 calculation results in order (newest first).
 * Requirements: 5.1, 5.2, 5.3, 5.4
 */

class HistoryManager {
  constructor() {
    // In-memory history array (newest first)
    this.history = [];
    // Reference to storage manager (injected or created)
    this.storage = null;
  }

  /**
   * Load history from localStorage via StorageManager.
   * Called on app initialization.
   */
  loadFromStorage() {
    if (!this.storage) {
      this.storage = new StorageManager();
    }

    this.history = this.storage.getHistory();
  }

  /**
   * Add a calculation result to history.
   * Maintains max 10 items (FIFO when exceeding limit).
   * Automatically persists to localStorage.
   *
   * @param {Object} result - CalculationResult to add
   */
  add(result) {
    if (!this.storage) {
      this.storage = new StorageManager();
    }

    // Add to front (newest first)
    this.history.unshift(result);

    // Enforce max 10 items
    if (this.history.length > 10) {
      this.history.pop();
    }

    // Persist to storage
    this.storage.saveResult(result);
  }

  /**
   * Get all history items in order (newest first).
   *
   * @returns {Object[]} Array of CalculationResult objects
   */
  getAll() {
    return [...this.history]; // Return copy to prevent external mutation
  }

  /**
   * Delete result by id from history.
   * Persists change to localStorage.
   *
   * @param {string} id - Result id to delete
   */
  delete(id) {
    if (!this.storage) {
      this.storage = new StorageManager();
    }

    // Find and remove from in-memory history
    this.history = this.history.filter(result => result.id !== id);

    // Persist deletion to storage
    this.storage.deleteResult(id);
  }

  /**
   * Get result by id from history.
   *
   * @param {string} id - Result id to retrieve
   * @returns {Object|null} CalculationResult or null if not found
   */
  getById(id) {
    return this.history.find(result => result.id === id) || null;
  }
}

// Export for Node.js/Jest
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HistoryManager;
}
