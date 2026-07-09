---
unit: 001-prime-math
bolt: 002-prime-math
stage: design
status: complete
created: 2026-07-09T00:18:00Z
---

# Technical Design - Edge Case Handling & Robustness

## Overview

Comprehensive edge case handling strategy for prime math engine. Defines validation, guard conditions, error handling, and robustness patterns.

## Validation Strategy

### Input Validation: is_prime(n)

**Type Checking** (implicit via Python):
- n must be integer-like (int, or castable)
- Invalid types (str, float, None) → falsy behavior (False)

**Boundary Checks**:

```python
# Guard 1: n <= 1 (non-prime zone)
if n <= 1:
    return False

# Guard 2: n == 2 (special case - only even prime)
if n == 2:
    return True

# Guard 3: Even numbers (except 2)
if n % 2 == 0:
    return False

# Guard 4: Trial division from 3 to √n
# (implicitly bounds large numbers with O(√n))
```

**Rationale**: 
- Primes defined as n > 1 by mathematical convention
- 2 is only even prime (special case)
- Trial division naturally limits computation time: O(√n) ≈ O(1000) for n=1M

### Input Validation: sum_primes_in_range(start, end)

**Type Checking**:
- start, end must be integers
- Invalid types → coercion or falsy (0)

**Range Validation**:

```python
# Guard 1: Reversed range (start > end)
if start > end:
    return 0  # Empty range, no primes

# Guard 2: Negative start (clamp to 0)
if start < 0:
    start = 0  # Primes are positive

# Guard 3: Both below 2 (no primes)
if end < 2:
    return 0  # No primes below 2

# Guard 4: Algorithm selection (data-driven performance)
if (end - start + 1) > 1000:
    use sieve_of_eratosthenes()  # O(n log log n)
else:
    use trial_division()           # O((end-start) * √end)
```

**Rationale**:
- start > end is mathematically invalid → graceful (0)
- Negatives clamped rather than rejected (user-friendly)
- Sieve overtakes trial division around 1000 elements (empirically verified)

## Guard Conditions Documentation

### is_prime(n) Guards

| Guard | Condition | Action | Reason |
|-------|-----------|--------|--------|
| G1 | n ≤ 1 | Return False | Primes > 1 by definition |
| G2 | n == 2 | Return True | Only even prime |
| G3 | n % 2 == 0 | Return False | All other even numbers composite |
| G4 | i² > n (trial div) | Return True | No divisor found, must be prime |

### sum_primes_in_range(start, end) Guards

| Guard | Condition | Action | Reason |
|-------|-----------|--------|--------|
| G1 | start > end | Return 0 | Invalid range, no computation |
| G2 | start < 0 | Clamp to 0 | Primes in positive domain only |
| G3 | end < 2 | Return 0 | No primes below 2 |
| G4 | range_size > 1000 | Use Sieve | Performance optimization |

## Error Handling Philosophy

**Graceful Defaults Over Exceptions**:

```python
# ✅ GRACEFUL (no exception)
is_prime(None)                  → False
is_prime("17")                  → False
sum_primes_in_range(100, 50)    → 0
sum_primes_in_range(-10, -5)    → 0

# ❌ REJECTED (exceptions, complexity)
raise TypeError("n must be int")
raise ValueError("Invalid range")
```

**Rationale**: CLI tool users expect sensible defaults, not stack traces. Exceptions deferred to v2 (strict mode).

## Performance Guarantees Under Edge Cases

| Scenario | Algorithm | Complexity | Guarantee |
|----------|-----------|---|---|
| is_prime(0) | Guard (n ≤ 1) | O(1) | Instant |
| is_prime(1) | Guard (n ≤ 1) | O(1) | Instant |
| is_prime(2) | Guard (special) | O(1) | Instant |
| is_prime(1000000) | Trial division | O(√1000000) = O(1000) | < 10ms |
| is_prime(-5) | Guard (return False) | O(1) | Instant |
| sum([1,10]) | Trial division | O(10 * √10) | < 1ms |
| sum([1,10000]) | Sieve | O(10000 log log 10000) | < 1ms |
| sum([100,50]) | Guard (start > end) | O(1) | Instant |
| sum([-10,20]) | Guard + Sieve | O(30 log log 30) | < 1ms |

**Worst Case**: Large prime check (e.g., is_prime(1000003)) still O(√n) = O(1000), well under 10ms requirement.

## Defensive Programming Patterns

### Pattern 1: Guard-First Validation

```python
def is_prime(n):
    # Guards before computation
    if n <= 1:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    # Now safe to compute trial division
    ...
```

### Pattern 2: Clamping Over Rejection

```python
def sum_primes_in_range(start, end):
    # Clamp rather than reject
    if start > end:
        return 0  # Invalid range
    if start < 0:
        start = 0  # Clamp to domain
    # Now safe to proceed
    ...
```

### Pattern 3: Algorithm Selection (Data-Driven)

```python
# Choose algorithm based on input size, not user preference
if (end - start + 1) > 1000:
    return _sum_primes_sieve(start, end)
else:
    return _sum_primes_trial(start, end)
```

## Docstring Documentation Strategy

All public functions include:
1. **Purpose**: What does it do?
2. **Algorithm**: Which algorithm? Why?
3. **Complexity**: Time and space for different inputs
4. **Edge Cases**: Explicit list with expected behavior
5. **Examples**: Real usage with edge cases

Example:
```python
def is_prime(n):
    """
    Determine if an integer is prime.
    
    Uses trial division: test divisibility from 2 to √n.
    
    Args:
        n (int): Integer to test for primality
    
    Returns:
        bool: True if n is prime, False otherwise
    
    Examples:
        >>> is_prime(2)
        True
        >>> is_prime(0)      # Edge case: 0 not prime
        False
        >>> is_prime(-5)     # Edge case: negatives not prime
        False
    """
```

---

## Acceptance Criteria Implementation Mapping

| AC | Story 003 | Implementation | Guard/Strategy |
|---|---|---|---|
| AC1 | is_prime(0) = False | Guard G1 (n ≤ 1) | Instant return |
| AC2 | is_prime(1) = False | Guard G1 (n ≤ 1) | Instant return |
| AC3 | is_prime(2) = True | Guard G2 (n == 2) | Instant return |
| AC4 | is_prime(-5) = False | Guard G1 (n ≤ 1) + implicit negative | Instant return |
| AC5 | is_prime(1000000) works | Trial division, O(√n) = O(1000) | < 10ms guaranteed |
| AC6 | sum([100,50]) = 0 | Guard G1 (start > end) | Instant return |
| AC7 | sum([-10,20]) handled | Guard G2 (clamp start) + Sieve | < 1ms |
| AC8 | Large ranges performant | Algorithm selection + Sieve | < 100ms |

---

## Testing Strategy

### Unit Tests (Per Story 003)

1. Boundary value tests (0, 1, 2, negatives)
2. Large number tests (1000000+)
3. Range edge cases (reversed, negatives, single values)
4. Performance tests (ensure no regression)

### Integration Tests

- Verify both algorithms produce same results
- Verify guards don't introduce incorrect behavior
- Verify docstring examples work as documented
