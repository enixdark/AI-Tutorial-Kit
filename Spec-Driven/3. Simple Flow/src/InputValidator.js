/**
 * InputValidator - Validates user input before calculation.
 * Handles numeric parsing and range validation.
 * Requirements: 1.2, 1.3, 1.4
 */

class InputValidator {
  /**
   * Validate numeric input string.
   * Checks if input is non-empty and a valid number.
   *
   * @param {string} input - User input string
   * @returns {Object} {valid: boolean, value?: number, error?: string}
   */
  validateNumber(input) {
    // Check empty input
    if (!input || input.trim() === '') {
      return {
        valid: false,
        error: 'Please enter a number'
      };
    }

    // Parse to number
    const parsed = Number(input.trim());

    // Check if NaN
    if (isNaN(parsed)) {
      return {
        valid: false,
        error: 'Please enter a valid number'
      };
    }

    // Check if integer
    if (!Number.isInteger(parsed)) {
      return {
        valid: false,
        error: 'Please enter a whole number (no decimals)'
      };
    }

    return {
      valid: true,
      value: parsed
    };
  }

  /**
   * Validate range is within acceptable bounds.
   * Prime numbers start at 2, max is 1,000,000.
   *
   * @param {number} num - Number to validate
   * @returns {Object} {valid: boolean, error?: string}
   */
  validateRange(num) {
    // Check minimum (primes start at 2)
    if (num < 2) {
      return {
        valid: false,
        error: 'Minimum value is 2 (the first prime number)'
      };
    }

    // Check maximum
    if (num > 1000000) {
      return {
        valid: false,
        error: 'Maximum value is 1,000,000'
      };
    }

    return {
      valid: true
    };
  }
}

// Export for Node.js/Jest
if (typeof module !== 'undefined' && module.exports) {
  module.exports = InputValidator;
}
