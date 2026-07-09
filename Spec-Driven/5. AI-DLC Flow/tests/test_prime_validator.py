"""Unit tests for prime_validator module."""

import sys
import os

# Add src to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))

from prime_math.prime_validator import is_prime


class TestPrimeDetection:
    """Test is_prime() function with valid primes."""

    def test_small_primes(self):
        """Small primes should return True."""
        small_primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
        for p in small_primes:
            assert is_prime(p) is True, f"is_prime({p}) should be True"

    def test_non_primes(self):
        """Composite numbers should return False."""
        non_primes = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20]
        for n in non_primes:
            assert is_prime(n) is False, f"is_prime({n}) should be False"

    def test_larger_primes(self):
        """Larger primes should be detected correctly."""
        larger_primes = [97, 101, 103, 107, 109, 113]
        for p in larger_primes:
            assert is_prime(p) is True, f"is_prime({p}) should be True"

    def test_larger_non_primes(self):
        """Larger composites should return False."""
        larger_non_primes = [100, 102, 104, 105, 106, 108, 110]
        for n in larger_non_primes:
            assert is_prime(n) is False, f"is_prime({n}) should be False"


class TestEdgeCases:
    """Test is_prime() with edge cases."""

    def test_zero_not_prime(self):
        """Zero is not prime."""
        assert is_prime(0) is False

    def test_one_not_prime(self):
        """One is not prime (by definition, primes > 1)."""
        assert is_prime(1) is False

    def test_two_is_prime(self):
        """Two is the smallest prime."""
        assert is_prime(2) is True

    def test_negative_numbers_not_prime(self):
        """Negative numbers are not prime."""
        for n in [-1, -2, -5, -10, -17]:
            assert is_prime(n) is False, f"is_prime({n}) should be False"

    def test_very_large_prime(self):
        """Very large prime should be detected."""
        # 1000003 is prime
        assert is_prime(1000003) is True

    def test_very_large_non_prime(self):
        """Very large composite should return False."""
        # 1000000 = 10^6, definitely composite
        assert is_prime(1000000) is False


class TestPerformance:
    """Test performance constraints."""

    def test_large_prime_check_performance(self):
        """Primality check for large number should complete quickly."""
        import time

        # Test with a large prime (1000003)
        start = time.time()
        result = is_prime(1000003)
        elapsed = time.time() - start

        assert result is True
        assert elapsed < 0.01, f"Check took {elapsed}s, should be < 10ms"

    def test_large_composite_check_performance(self):
        """Composite check for large number should complete quickly."""
        import time

        # Test with a large composite
        start = time.time()
        result = is_prime(1000000)
        elapsed = time.time() - start

        assert result is False
        assert elapsed < 0.01, f"Check took {elapsed}s, should be < 10ms"


class TestAcceptanceCriteria:
    """Test acceptance criteria from Story 001."""

    def test_ac_prime_two(self):
        """AC: is_prime(2) returns True."""
        assert is_prime(2) is True

    def test_ac_non_prime_four(self):
        """AC: is_prime(4) returns False."""
        assert is_prime(4) is False

    def test_ac_prime_list(self):
        """AC: Returns True for primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29."""
        primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
        for p in primes:
            assert is_prime(p) is True

    def test_ac_non_prime_list(self):
        """AC: Returns False for non-primes: 0, 1, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20."""
        non_primes = [0, 1, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20]
        for n in non_primes:
            assert is_prime(n) is False

    def test_ac_edge_cases(self):
        """AC: Handles edge cases: negative numbers return False."""
        assert is_prime(-5) is False
        assert is_prime(-1) is False
