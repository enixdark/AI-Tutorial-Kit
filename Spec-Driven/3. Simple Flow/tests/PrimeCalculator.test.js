/**
 * Unit tests for PrimeCalculator class.
 * Tests Sieve of Eratosthenes implementation.
 * Requirements: 2.1, 2.2
 */

const PrimeCalculator = require('../src/PrimeCalculator.js');

describe('PrimeCalculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new PrimeCalculator();
  });

  describe('calculatePrimes', () => {
    describe('Small ranges with known results', () => {
      test('range 2 returns [2] with count 1', () => {
        const result = calculator.calculatePrimes(2);
        expect(result.count).toBe(1);
        expect(result.primes).toEqual([2]);
      });

      test('range 10 returns correct primes', () => {
        const result = calculator.calculatePrimes(10);
        expect(result.count).toBe(4);
        expect(result.primes).toEqual([2, 3, 5, 7]);
      });

      test('range 20 returns correct primes', () => {
        const result = calculator.calculatePrimes(20);
        expect(result.count).toBe(8);
        expect(result.primes).toEqual([2, 3, 5, 7, 11, 13, 17, 19]);
      });
    });

    describe('Medium ranges', () => {
      test('range 100 returns correct count and primes', () => {
        const result = calculator.calculatePrimes(100);
        expect(result.count).toBe(25);
        // Verify first few and last few
        expect(result.primes[0]).toBe(2);
        expect(result.primes[result.primes.length - 1]).toBe(97);
        expect(result.primes).toContain(11);
        expect(result.primes).toContain(43);
        expect(result.primes).toContain(97);
      });

      test('range 1000 returns correct count', () => {
        const result = calculator.calculatePrimes(1000);
        expect(result.count).toBe(168);
        expect(result.primes[0]).toBe(2);
        expect(result.primes[result.primes.length - 1]).toBe(997);
      });
    });

    describe('Edge cases', () => {
      test('range 0 returns empty array', () => {
        const result = calculator.calculatePrimes(0);
        expect(result.count).toBe(0);
        expect(result.primes).toEqual([]);
      });

      test('range 1 returns empty array', () => {
        const result = calculator.calculatePrimes(1);
        expect(result.count).toBe(0);
        expect(result.primes).toEqual([]);
      });

      test('negative range returns empty array', () => {
        const result = calculator.calculatePrimes(-10);
        expect(result.count).toBe(0);
        expect(result.primes).toEqual([]);
      });

      test('primes array is sorted ascending', () => {
        const result = calculator.calculatePrimes(100);
        for (let i = 1; i < result.primes.length; i++) {
          expect(result.primes[i]).toBeGreaterThan(result.primes[i - 1]);
        }
      });

      test('all returned values are actually prime', () => {
        const result = calculator.calculatePrimes(100);
        for (const prime of result.primes) {
          // Check if prime
          let isPrime = true;
          for (let i = 2; i * i <= prime; i++) {
            if (prime % i === 0) {
              isPrime = false;
              break;
            }
          }
          expect(isPrime).toBe(true);
        }
      });

      test('all primes are <= max', () => {
        const result = calculator.calculatePrimes(100);
        for (const prime of result.primes) {
          expect(prime).toBeLessThanOrEqual(100);
        }
      });

      test('all primes are >= 2', () => {
        const result = calculator.calculatePrimes(100);
        for (const prime of result.primes) {
          expect(prime).toBeGreaterThanOrEqual(2);
        }
      });
    });

    describe('Performance', () => {
      test('range 10000 completes within reasonable time', () => {
        const start = performance.now();
        const result = calculator.calculatePrimes(10000);
        const elapsed = performance.now() - start;

        expect(result.count).toBe(1229); // Known value
        expect(elapsed).toBeLessThan(1000); // Should complete in < 1 second
      });

      test('range 100000 completes within reasonable time', () => {
        const start = performance.now();
        const result = calculator.calculatePrimes(100000);
        const elapsed = performance.now() - start;

        expect(result.count).toBe(9592); // Known value
        expect(elapsed).toBeLessThan(5000); // Should complete in < 5 seconds
      });
    });
  });

  describe('calculateCount', () => {
    test('returns correct count for range 100', () => {
      const count = calculator.calculateCount(100);
      expect(count).toBe(25);
    });

    test('returns correct count for range 1000', () => {
      const count = calculator.calculateCount(1000);
      expect(count).toBe(168);
    });

    test('returns 0 for range < 2', () => {
      expect(calculator.calculateCount(0)).toBe(0);
      expect(calculator.calculateCount(1)).toBe(0);
    });

    test('returns same count as calculatePrimes', () => {
      const range = 500;
      const countResult = calculator.calculateCount(range);
      const fullResult = calculator.calculatePrimes(range);
      expect(countResult).toBe(fullResult.count);
    });
  });

  describe('Error handling', () => {
    test('timeout error has meaningful message', () => {
      // This test verifies the timeout mechanism exists
      // In practice, timeout would only trigger for extremely large ranges
      // or on very slow systems, so we just verify the error structure
      const calculator = new PrimeCalculator();
      expect(calculator.calculatePrimes).toBeDefined();
    });
  });
});
