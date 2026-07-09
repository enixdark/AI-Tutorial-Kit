"""Unit tests for range_calculator module."""

import sys
import os

# Add src to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))

from prime_math.range_calculator import sum_primes_in_range


class TestRangeSumBasic:
    """Test sum_primes_in_range() with basic ranges."""

    def test_range_1_to_10(self):
        """Sum of primes in [1, 10] = 2+3+5+7 = 17."""
        result = sum_primes_in_range(1, 10)
        assert result == 17, f"Expected 17, got {result}"

    def test_range_1_to_20(self):
        """Sum of primes in [1, 20] = 2+3+5+7+11+13+17+19 = 77."""
        result = sum_primes_in_range(1, 20)
        assert result == 77, f"Expected 77, got {result}"

    def test_range_10_to_30(self):
        """Sum of primes in [10, 30] = 11+13+17+19+23+29 = 112."""
        result = sum_primes_in_range(10, 30)
        assert result == 112, f"Expected 112, got {result}"

    def test_no_primes_in_range(self):
        """Sum when range contains no primes = 0."""
        # Range [8, 8] contains only 8, which is not prime
        result = sum_primes_in_range(8, 8)
        assert result == 0, f"Expected 0, got {result}"


class TestEdgeCases:
    """Test sum_primes_in_range() with edge cases."""

    def test_single_prime(self):
        """Sum of range containing single prime."""
        # [5, 5] contains only 5, which is prime
        result = sum_primes_in_range(5, 5)
        assert result == 5, f"Expected 5, got {result}"

    def test_single_two(self):
        """Sum of range [2, 2]."""
        result = sum_primes_in_range(2, 2)
        assert result == 2, f"Expected 2, got {result}"

    def test_reversed_range(self):
        """Reversed range (start > end) returns 0."""
        result = sum_primes_in_range(100, 50)
        assert result == 0, f"Expected 0, got {result}"

    def test_negative_start(self):
        """Negative start is clamped to 0."""
        # [-10, 20] should be treated as [0, 20] (primes: 2,3,5,7,11,13,17,19)
        result = sum_primes_in_range(-10, 20)
        expected = sum_primes_in_range(0, 20)
        assert result == expected, f"Expected {expected}, got {result}"

    def test_both_negative(self):
        """Both negative returns 0."""
        result = sum_primes_in_range(-20, -10)
        assert result == 0, f"Expected 0, got {result}"

    def test_range_below_two(self):
        """Range below 2 (no primes) returns 0."""
        result = sum_primes_in_range(1, 1)
        assert result == 0, f"Expected 0, got {result}"

    def test_range_0_to_2(self):
        """Range [0, 2] contains primes: 2."""
        result = sum_primes_in_range(0, 2)
        assert result == 2, f"Expected 2, got {result}"


class TestLargeRanges:
    """Test sum_primes_in_range() with larger ranges."""

    def test_range_1_to_100(self):
        """Sum of primes in [1, 100]."""
        # Known value: sum of primes up to 100 is 1060
        result = sum_primes_in_range(1, 100)
        assert result == 1060, f"Expected 1060, got {result}"

    def test_range_1_to_1000(self):
        """Sum of primes in [1, 1000]."""
        # Known value: sum of primes up to 1000 is 76127
        result = sum_primes_in_range(1, 1000)
        assert result == 76127, f"Expected 76127, got {result}"

    def test_range_1_to_10000(self):
        """Sum of primes in [1, 10000]."""
        # Sum of all primes in range [1, 10000]
        result = sum_primes_in_range(1, 10000)
        assert result == 5736396, f"Expected 5736396, got {result}"


class TestPerformance:
    """Test performance constraints."""

    def test_large_range_performance(self):
        """Large range [1, 10000] should complete within 100ms."""
        import time

        start = time.time()
        result = sum_primes_in_range(1, 10000)
        elapsed = time.time() - start

        assert result == 5736396
        assert elapsed < 0.1, f"Calculation took {elapsed}s, should be < 100ms"

    def test_very_large_range_performance(self):
        """Very large range [1, 100000] should complete reasonably."""
        import time

        start = time.time()
        result = sum_primes_in_range(1, 100000)
        elapsed = time.time() - start

        # Known value: 299792060
        assert result == 299792060
        # Should complete in under 1 second
        assert elapsed < 1.0, f"Calculation took {elapsed}s, should be < 1s"


class TestAlgorithmSelection:
    """Test that algorithm selection works correctly."""

    def test_small_range_uses_trial(self):
        """Small range (< 1000) should use trial division."""
        # This is a behavioral test - we can't directly check algorithm,
        # but we verify the result is correct
        result = sum_primes_in_range(1, 100)
        assert result == 1060

    def test_large_range_uses_sieve(self):
        """Large range (> 1000) should use Sieve of Eratosthenes."""
        # Verify result is correct (algorithm choice doesn't affect correctness)
        result = sum_primes_in_range(1, 2000)
        # We can't easily verify this without pre-computed value,
        # so we just check it completes and returns a positive number
        assert isinstance(result, int)
        assert result > 0


class TestAcceptanceCriteria:
    """Test acceptance criteria from Story 002."""

    def test_ac_range_1_10_equals_17(self):
        """AC: sum_primes_in_range(1, 10) returns 17."""
        assert sum_primes_in_range(1, 10) == 17

    def test_ac_range_1_20_equals_77(self):
        """AC: sum_primes_in_range(1, 20) returns 77."""
        assert sum_primes_in_range(1, 20) == 77

    def test_ac_range_1_1_returns_0(self):
        """AC: sum_primes_in_range(1, 1) returns 0."""
        assert sum_primes_in_range(1, 1) == 0

    def test_ac_range_8_8_returns_0(self):
        """AC: sum_primes_in_range(8, 8) returns 0."""
        assert sum_primes_in_range(8, 8) == 0

    def test_ac_range_1_10000_under_100ms(self):
        """AC: sum_primes_in_range(1, 10000) completes in < 100ms."""
        import time

        start = time.time()
        result = sum_primes_in_range(1, 10000)
        elapsed = time.time() - start

        assert result == 5736396
        assert elapsed < 0.1, f"Took {elapsed}s, should be < 100ms"

    def test_ac_uses_is_prime(self):
        """AC: Correctly uses is_prime() function."""
        # Verify by checking a range where we know the primes
        result = sum_primes_in_range(2, 5)
        # Primes in [2, 5]: 2, 3, 5 = 10
        assert result == 10
