---
unit: 001-prime-math
bolt: 002-prime-math
stage: model
status: complete
created: 2026-07-09T00:15:00Z
---

# Static Model - Prime Math Engine (Edge Cases & Boundaries)

## Bounded Context

Edge case handling for prime computation. Defines boundary assumptions and exceptional conditions for primality testing and range summation.

## Domain Entities

| Entity | Properties | Business Rules |
|--------|------------|----------------|
| Integer | value (any int) | Must be valid Python int type |
| BoundaryValue | value, classification | Special: 0, 1, 2, negative, very large |
| Range | start, end | May be invalid: start > end, negatives |

## Value Objects

| Value Object | Properties | Constraints |
|--------------|------------|-------------|
| PrimeAssumption | definition: "n > 1 with 2 divisors" | Immutable, mathematical truth |
| BoundaryCondition | type, input, expected_output | Immutable, documented behavior |
| PerformanceThreshold | max_milliseconds, input_size | Immutable, non-functional requirement |

## Edge Case Boundaries

| Boundary | Classification | Handling | Output |
|----------|---|---|---|
| n ≤ 1 | Non-Prime Zone | Reject (not prime by definition) | False |
| n = 2 | Smallest Prime | Accept (only even prime) | True |
| n = negative | Outside Domain | Reject (primes are positive) | False |
| start > end | Invalid Range | Reject (no valid interval) | 0 |
| start < 0 | Partial Invalid | Clamp to 0 (positive domain) | Recalculate from 0 |
| Very Large n (> 1,000,000) | Performance Risk | Optimize with trial division | Complete < 10ms |

## Domain Services

| Service | Operations | Edge Cases Handled |
|---------|------------|-------------------|
| PrimeValidator | is_prime(n) | 0, 1, 2, negatives, very large |
| RangeSumCalculator | sum_primes_in_range(s, e) | start > end, negatives, boundaries |
| BoundaryChecker | validate_input(n, type) | Type safety, range checks |

## Guard Conditions

### For is_prime(n)

```
if n <= 1:
  return False          # Primes > 1 by definition

if n == 2:
  return True           # Only even prime

if n % 2 == 0:
  return False          # Even composites

# Trial division from 3 to √n
# Skip even divisors (i += 2)
```

### For sum_primes_in_range(start, end)

```
if start > end:
  return 0              # No valid range

if start < 0:
  start = 0             # Clamp to 0 (positive domain)

if end < 2:
  return 0              # No primes below 2

# Algorithm selection:
if (end - start) > 1000:
  use Sieve            # O(n log log n) for large ranges
else:
  use Trial Division   # O((end-start) * √end) for small ranges
```

## Ubiquitous Language

| Term | Definition | Edge Cases |
|------|---|---|
| Prime | Natural number > 1 with exactly 2 divisors | NOT 0, NOT 1, NOT negative |
| Range | Inclusive interval [start, end] | Must be valid: start ≤ end |
| Boundary Condition | Input at domain limits | 0, 1, 2, negatives, reversal |
| Robustness | Graceful handling of invalid input | No exceptions, sensible defaults |
| Defensive Programming | Guards before computation | Type checks, range validation |

---

## Acceptance Criteria Coverage

### Story 003: Edge Cases & Boundary Conditions

1. **is_prime(0) = False** ✅ → Non-prime zone guard
2. **is_prime(1) = False** ✅ → Non-prime zone guard
3. **is_prime(2) = True** ✅ → Special case for smallest prime
4. **is_prime(-5) = False** ✅ → Negative boundary guard
5. **is_prime(1000000) works** ✅ → Trial division handles large numbers
6. **sum_primes_in_range(100, 50) = 0** ✅ → Invalid range guard
7. **sum_primes_in_range(-10, 20) handled** ✅ → Negative start clamp guard
8. **Large ranges performant** ✅ → Sieve algorithm selection
