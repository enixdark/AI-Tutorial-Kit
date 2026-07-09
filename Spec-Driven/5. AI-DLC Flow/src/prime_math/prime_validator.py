"""Prime number validation using trial division algorithm."""


def is_prime(n):
    """
    Determine if an integer is prime.

    Uses trial division algorithm: test divisibility from 2 to √n.

    Args:
        n (int): Integer to test for primality

    Returns:
        bool: True if n is prime, False otherwise

    Examples:
        >>> is_prime(2)
        True
        >>> is_prime(3)
        True
        >>> is_prime(4)
        False
        >>> is_prime(17)
        True
        >>> is_prime(1)
        False
        >>> is_prime(0)
        False
        >>> is_prime(-5)
        False
    """
    return _is_prime_trial_division(n)


def _is_prime_trial_division(n):
    """
    Trial division primality test.

    Tests if n has any divisors between 2 and √n.
    By definition, prime numbers have exactly 2 divisors: 1 and itself.

    Complexity: O(√n)
    Space: O(1)

    Args:
        n (int): Integer to test

    Returns:
        bool: True if prime, False otherwise

    Edge cases:
        - n ≤ 1: Always False (primes > 1 by definition)
        - n = 2: True (smallest prime)
        - Negative n: False (primes are positive)
    """
    # Primes are natural numbers > 1
    if n <= 1:
        return False

    # 2 is the only even prime
    if n == 2:
        return True

    # All other even numbers are composite
    if n % 2 == 0:
        return False

    # Test odd divisors from 3 to √n
    # Only need to check up to √n because if n = a*b and a > √n, then b < √n
    i = 3
    while i * i <= n:
        if n % i == 0:
            return False
        i += 2  # Skip even numbers

    return True
