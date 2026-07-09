"""Prime number summation for ranges using Sieve of Eratosthenes."""

from .prime_validator import is_prime


def sum_primes_in_range(start, end):
    """
    Calculate sum of all prime numbers in range [start, end] (inclusive).

    Algorithm selection:
    - Sieve of Eratosthenes for ranges with > 1000 elements
    - Trial division for smaller ranges

    Args:
        start (int): Range start (inclusive)
        end (int): Range end (inclusive)

    Returns:
        int: Sum of all primes in the range

    Examples:
        >>> sum_primes_in_range(1, 10)
        17
        >>> sum_primes_in_range(1, 20)
        77
        >>> sum_primes_in_range(1, 1)
        0
        >>> sum_primes_in_range(8, 8)
        0
        >>> sum_primes_in_range(100, 50)
        0
        >>> sum_primes_in_range(-10, 20)
        35
    """
    # Validate range: start ≤ end
    if start > end:
        return 0

    # Clamp negative start to 0 (primes are positive)
    if start < 0:
        start = 0

    # Clamp end to valid range
    if end < 0:
        return 0

    # Determine algorithm based on range size
    algorithm = _choose_algorithm(start, end)

    if algorithm == "sieve":
        return _sum_primes_sieve(start, end)
    else:
        return _sum_primes_trial(start, end)


def _choose_algorithm(start, end):
    """
    Determine which algorithm to use based on range size.

    Args:
        start (int): Range start
        end (int): Range end

    Returns:
        str: Algorithm name ("sieve" or "trial")
    """
    range_size = end - start + 1
    if range_size > 1000:
        return "sieve"
    else:
        return "trial"


def _sum_primes_trial(start, end):
    """
    Sum primes in range using trial division.

    Simple approach: test each number in range individually.

    Complexity: O((end-start) * √end)
    Space: O(1)

    Args:
        start (int): Range start (inclusive)
        end (int): Range end (inclusive)

    Returns:
        int: Sum of primes in range
    """
    total = 0
    for num in range(start, end + 1):
        if is_prime(num):
            total += num
    return total


def _sum_primes_sieve(start, end):
    """
    Sum primes in range using Sieve of Eratosthenes.

    Efficient algorithm for finding all primes up to n:
    1. Create boolean array, mark all as potentially prime
    2. Iterate from 2 to √n, mark multiples as composite
    3. Remaining True values are primes
    4. Sum those within [start, end]

    Complexity: O(n log log n) where n = end
    Space: O(n)

    Args:
        start (int): Range start (inclusive)
        end (int): Range end (inclusive)

    Returns:
        int: Sum of primes in range
    """
    if end < 2:
        return 0

    # Create sieve up to end
    is_prime_arr = [True] * (end + 1)
    is_prime_arr[0] = is_prime_arr[1] = False  # 0 and 1 are not prime

    # Mark multiples of each prime as composite
    p = 2
    while p * p <= end:
        if is_prime_arr[p]:
            # Mark all multiples of p as composite
            for multiple in range(p * p, end + 1, p):
                is_prime_arr[multiple] = False
        p += 1

    # Sum primes in [start, end]
    total = 0
    for num in range(start, end + 1):
        if is_prime_arr[num]:
            total += num

    return total
