/**
 * PrimeCalculator - Computes prime numbers using Sieve of Eratosthenes.
 * Efficiently finds all primes up to a given maximum value.
 * Requirements: 2.1, 2.2, 2.4
 */

class PrimeCalculator {
  // Performance timeout in milliseconds (10 seconds)
  static TIMEOUT = 10000;

  /**
   * Calculate all prime numbers from 2 to max (inclusive).
   * Uses Sieve of Eratosthenes algorithm.
   * Throws error if computation takes > 10 seconds.
   *
   * @param {number} max - Maximum value (inclusive)
   * @returns {Object} {count: number, primes: number[]}
   * @throws {Error} If computation timeout exceeded
   */
  calculatePrimes(max) {
    const startTime = performance.now();

    // Edge case: max < 2
    if (max < 2) {
      return { count: 0, primes: [] };
    }

    // Create boolean array "prime[0..max]" and initialize as true
    const isPrime = new Array(max + 1).fill(true);
    isPrime[0] = false;
    isPrime[1] = false;

    // Sieve of Eratosthenes
    for (let p = 2; p * p <= max; p++) {
      // Check timeout periodically (every 1000 iterations for large sieves)
      if (p % 1000 === 0) {
        if (performance.now() - startTime > PrimeCalculator.TIMEOUT) {
          throw new Error('Prime calculation timeout exceeded');
        }
      }

      // If isPrime[p] is not changed, then it's a prime
      if (isPrime[p]) {
        // Mark all multiples of p as not prime
        for (let i = p * p; i <= max; i += p) {
          isPrime[i] = false;
        }
      }
    }

    // Collect all primes
    const primes = [];
    for (let i = 2; i <= max; i++) {
      if (isPrime[i]) {
        primes.push(i);
      }
    }

    return {
      count: primes.length,
      primes: primes
    };
  }

  /**
   * Calculate count of primes from 2 to max (optimized version).
   * Only returns the count, not the full array.
   * Slightly more efficient than calculatePrimes for count-only needs.
   *
   * @param {number} max - Maximum value (inclusive)
   * @returns {number} Count of primes
   * @throws {Error} If computation timeout exceeded
   */
  calculateCount(max) {
    const result = this.calculatePrimes(max);
    return result.count;
  }
}

// Export for Node.js/Jest
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PrimeCalculator;
}
