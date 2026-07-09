---
unit: 001-prime-math
bolt: 001-prime-math
stage: design
status: complete
created: 2026-07-08T22:18:00Z
---

# Technical Design - Prime Math Engine

## Architecture Pattern

**Modular Pure Library** - Self-contained Python module with pure functions (no side effects, no external dependencies). Suitable for v1 as a library. No persistence layer (in-memory computation only).

Rationale: Simple domain with no I/O, no state management, no concurrency concerns. Pure functions are easier to test and reason about.

## Layer Structure

```text
┌──────────────────────────────────────────┐
│      Public API Layer                    │
│  is_prime(n) → bool                      │
│  sum_primes_in_range(start, end) → int   │
├──────────────────────────────────────────┤
│      Algorithm Layer                     │
│  _is_prime_trial_division(n)             │
│  _sieve_of_eratosthenes(limit)           │
└──────────────────────────────────────────┘
```

**Rationale**: Separate algorithm implementation from public API. Allows algorithm swapping without changing caller interface.

## API Design

| Function | Signature | Input | Output | Errors |
|----------|-----------|-------|--------|--------|
| is_prime | `is_prime(n: int) -> bool` | Integer | Boolean | None (falsy for invalid) |
| sum_primes_in_range | `sum_primes_in_range(start: int, end: int) -> int` | Two integers | Integer sum | ValueError if invalid range |

### API Details

#### is_prime(n: int) → bool
- **Purpose**: Determine if n is prime
- **Algorithm**: Trial Division (O(√n))
- **Input**: Integer n
- **Output**: True if prime, False otherwise
- **Edge Cases**: n ≤ 1 → False, negatives → False
- **Performance**: < 10ms per call
- **Docstring**: Include examples (is_prime(2), is_prime(4), is_prime(-5))

#### sum_primes_in_range(start: int, end: int) → int
- **Purpose**: Sum all primes in [start, end] inclusive
- **Algorithm**: Sieve of Eratosthenes if range > 1000, else trial division
- **Input**: start, end (integers)
- **Output**: Sum of all primes in range
- **Preconditions**: start ≤ end (enforced with guard)
- **Edge Cases**: start > end → 0, reversed → 0, negatives → handled correctly
- **Performance**: < 100ms for range [1, 10000]
- **Docstring**: Include examples (sum_primes_in_range(1, 10) → 17)

## Data Persistence

**None for v1.** Computation is stateless and in-memory. Results not cached.

Future v2 candidate: Memoization cache for frequently-requested ranges.

## Algorithm Selection Strategy

**Decision Point**: Range size determines which algorithm to use

```python
def _choose_algorithm(start, end):
    range_size = end - start + 1
    if range_size > 1000:
        return "sieve_of_eratosthenes"
    else:
        return "trial_division"
```

### Trial Division Algorithm
- **Use Case**: Single number primality check OR small ranges
- **Complexity**: O(√n) per number
- **Space**: O(1)
- **Implementation**: Loop from 2 to √n, check divisibility

### Sieve of Eratosthenes Algorithm
- **Use Case**: Large ranges [1, 10000+]
- **Complexity**: O(n log log n)
- **Space**: O(n) - allocate boolean array for range
- **Implementation**: Mark multiples iteratively, collect unmarked (primes)
- **Optimization**: Start at 2, skip even numbers after 2

## Error Handling

| Error | Trigger | Response |
|-------|---------|----------|
| Invalid input type | is_prime("abc") | Return False (falsy behavior) |
| Invalid range | sum_primes_in_range(100, 50) | Return 0 (empty range) |
| Negative input | is_prime(-5) | Return False |
| Out of range | is_prime(1000000) | Work correctly (O(√n) still acceptable) |

**Philosophy**: Fail gracefully with sensible defaults. No exceptions for invalid input (v2 candidate: stricter validation).

## NFR Implementation

| Requirement | Design Approach |
|-------------|-----------------|
| Performance | Sieve algorithm for range sums, guards against excessive computation |
| Correctness | Trial division verifies prime definition, comprehensive test cases |
| Maintainability | Pure functions, clear separation of concerns, docstrings with examples |
| Code Coverage | Aim for > 80% via unit tests of both algorithms and edge cases |
| No Dependencies | Standard library only (no numpy, sympy, etc.) |

**Performance Targets**:
- Single is_prime() check: < 10ms
- Range [1, 10000] sum: < 100ms
- Range [1, 100000] sum: < 1000ms

## External Dependencies

**None.** Pure Python 3.9+ standard library only.

## Module Structure

```text
src/
└── prime_math/
    ├── __init__.py
    │   └── Exports: is_prime, sum_primes_in_range
    ├── prime_validator.py
    │   ├── is_prime(n)
    │   └── _is_prime_trial_division(n)
    └── range_calculator.py
        ├── sum_primes_in_range(start, end)
        ├── _sieve_of_eratosthenes(limit)
        └── _choose_algorithm(start, end)

tests/
├── test_prime_validator.py
├── test_range_calculator.py
└── test_edge_cases.py
```

## Implementation Sequence

1. Implement `_is_prime_trial_division()` (core algorithm)
2. Implement `is_prime()` wrapper with edge case handling
3. Implement `_sieve_of_eratosthenes()` (range algorithm)
4. Implement `sum_primes_in_range()` wrapper with algorithm selection
5. Add comprehensive docstrings with examples
6. Create unit tests for all functions
7. Measure performance, verify targets met

---

## Mapping to Stories

### Story 001: Prime Detection
- Implements: `is_prime(n)` function
- Algorithm: Trial Division
- Covers: Detect if number is prime, handle edge cases (negatives, 0, 1, 2)

### Story 002: Sum in Range
- Implements: `sum_primes_in_range(start, end)` function
- Algorithms: Sieve (large ranges) + Trial Division (single checks)
- Covers: Sum all primes in range, handle edge cases (reversed ranges, negatives)
