/**
 * TypeScript-style interfaces for Prime Calculator.
 * Defines contracts for all major classes and data structures.
 */

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} valid - Whether validation passed
 * @property {number} [value] - Parsed numeric value (if valid)
 * @property {string} [error] - Error message (if invalid)
 */

/**
 * @typedef {Object} PrimeResult
 * @property {number} count - Total count of primes
 * @property {number[]} primes - Array of prime numbers found
 */

/**
 * @typedef {Object} CalculationResult
 * @property {string} id - Unique identifier (UUID v4)
 * @property {number} range - Maximum number input (2 to 1,000,000)
 * @property {number} primeCount - Total count of primes found
 * @property {number[]} [primes] - Full prime list (optional)
 * @property {number} timestamp - Unix timestamp in milliseconds
 * @property {number} computeTimeMs - Calculation duration in milliseconds
 */

/**
 * InputValidator interface
 * Validates user input before calculation.
 *
 * @interface
 */
class IInputValidator {
  /**
   * Validate numeric input string.
   * @param {string} input - User input
   * @returns {ValidationResult} Validation result with value or error
   */
  validateNumber(input) {}

  /**
   * Validate range is within acceptable bounds.
   * @param {number} num - Number to validate
   * @returns {ValidationResult} Validation result
   */
  validateRange(num) {}
}

/**
 * PrimeCalculator interface
 * Computes prime numbers using Sieve of Eratosthenes.
 *
 * @interface
 */
class IPrimeCalculator {
  /**
   * Calculate all primes up to max.
   * @param {number} max - Maximum value (inclusive)
   * @returns {PrimeResult} Count and array of primes
   */
  calculatePrimes(max) {}

  /**
   * Calculate count of primes up to max (optimized).
   * @param {number} max - Maximum value (inclusive)
   * @returns {number} Count of primes
   */
  calculateCount(max) {}
}

/**
 * StorageManager interface
 * Handles localStorage operations for history persistence.
 *
 * @interface
 */
class IStorageManager {
  /**
   * Save calculation result to localStorage.
   * @param {CalculationResult} result - Result to save
   * @throws {Error} If localStorage unavailable or quota exceeded
   */
  saveResult(result) {}

  /**
   * Retrieve all saved results from localStorage.
   * @returns {CalculationResult[]} Array of results
   */
  getHistory() {}

  /**
   * Delete result by id from localStorage.
   * @param {string} id - Result id to delete
   */
  deleteResult(id) {}

  /**
   * Clear all results from localStorage.
   */
  clearHistory() {}

  /**
   * Check if localStorage is available and writable.
   * @returns {boolean} True if localStorage accessible
   */
  isAvailable() {}
}

/**
 * HistoryManager interface
 * Manages in-memory history state and localStorage sync.
 *
 * @interface
 */
class IHistoryManager {
  /**
   * Add result to history (maintains max 10 items).
   * @param {CalculationResult} result - Result to add
   */
  add(result) {}

  /**
   * Get all history items in order (newest first).
   * @returns {CalculationResult[]} All history items
   */
  getAll() {}

  /**
   * Delete result by id.
   * @param {string} id - Result id to delete
   */
  delete(id) {}

  /**
   * Get result by id.
   * @param {string} id - Result id to retrieve
   * @returns {CalculationResult|null} Result or null if not found
   */
  getById(id) {}

  /**
   * Load history from StorageManager.
   */
  loadFromStorage() {}
}

/**
 * DisplayManager interface
 * Updates DOM with results and UI state.
 *
 * @interface
 */
class IDisplayManager {
  /**
   * Display calculation result.
   * @param {CalculationResult} result - Result to display
   */
  showResult(result) {}

  /**
   * Display full list of primes.
   * @param {number[]} primes - Array of primes to display
   */
  showPrimeList(primes) {}

  /**
   * Display history list.
   * @param {CalculationResult[]} results - History items to display
   */
  showHistory(results) {}

  /**
   * Show or hide loading indicator.
   * @param {boolean} show - True to show, false to hide
   */
  showLoading(show) {}

  /**
   * Display error message.
   * @param {string} message - Error message to display
   */
  showError(message) {}

  /**
   * Clear all result displays.
   */
  clearResults() {}
}

// Export interfaces for documentation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    IInputValidator,
    IPrimeCalculator,
    IStorageManager,
    IHistoryManager,
    IDisplayManager
  };
}
