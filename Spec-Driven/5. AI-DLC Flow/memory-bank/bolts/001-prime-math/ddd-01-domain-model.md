---
unit: 001-prime-math
bolt: 001-prime-math
stage: model
status: complete
created: 2026-07-08T22:16:00Z
---

# Static Model - Prime Math Engine

## Bounded Context

Prime number computation service. Provides mathematical operations for identifying primes and summing primes within ranges. Pure computation domain with no external dependencies.

## Domain Entities

| Entity | Properties | Business Rules |
|--------|------------|----------------|
| Prime | value (int) | value > 1, exactly 2 divisors (1 and itself), immutable |
| Range | start (int), end (int) | start ≤ end, inclusive bounds, immutable |

## Value Objects

| Value Object | Properties | Constraints |
|--------------|------------|-------------|
| PrimeCheckResult | is_prime (bool) | Immutable, determined by trial division |
| RangeSumResult | sum (int), count (int) | Immutable, guaranteed accurate |

## Aggregates

| Aggregate Root | Members | Invariants |
|----------------|---------|------------|
| Prime | value | value > 1, must be mathematically prime |
| PrimeRange | start, end, computed_primes | start ≤ end, all computed_primes within [start, end] |

## Domain Events

| Event | Trigger | Payload |
|-------|---------|---------|
| PrimeDetected | is_prime() called with prime number | { value, algorithm_used } |
| RangeSumCalculated | sum_primes_in_range() completes | { start, end, sum, primes_found, algorithm_used } |
| EdgeCaseHandled | is_prime() called with 0, 1, or negative | { value, result } |

## Domain Services

| Service | Operations | Dependencies |
|---------|------------|--------------|
| PrimeValidator | is_prime(n: int) → bool | None (pure logic) |
| RangeSumCalculator | sum_primes_in_range(start: int, end: int) → int | PrimeValidator (uses is_prime) |
| AlgorithmSelector | choose_algorithm(range_size: int) → Algorithm | None (pure logic) |

## Repository Interfaces

| Repository | Entity | Methods |
|------------|--------|---------|
| PrimeRepository | Prime | find_by_value(value), save(prime), find_all_in_range(start, end) |
| RangeRepository | PrimeRange | find_by_range(start, end), save(range) |

## Ubiquitous Language

| Term | Definition |
|------|------------|
| Prime | Natural number > 1 with exactly two positive divisors (1 and itself) |
| Trial Division | Algorithm: Test divisibility from 2 to √n to determine primality |
| Sieve of Eratosthenes | Algorithm: Mark multiples iteratively to find all primes up to n |
| Range | Inclusive interval [start, end] where start ≤ end |
| Primality Test | Operation determining if an integer is prime |
| Range Sum | Total of all prime numbers within an inclusive interval |
| Edge Cases | Special inputs: 0, 1, 2 (smallest prime), negative numbers, reversed ranges |

---

## Mapping to Stories

### Story 001: Prime Detection
- Entity: Prime
- Service: PrimeValidator.is_prime()
- Algorithm: Trial Division
- Edge Cases: Negatives, 0, 1

### Story 002: Sum in Range
- Entity: PrimeRange
- Service: RangeSumCalculator.sum_primes_in_range()
- Algorithm: Sieve of Eratosthenes (for performance)
- Uses: PrimeValidator (single checks)
