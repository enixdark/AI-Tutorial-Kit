# Story: Sum Primes in Range

**Unit**: 001-prime-math

**Priority**: Must

**Status**: Planned

## Description

As a user, I need a function that calculates the sum of all primes within a specified range [start, end], so I can analyze prime number distributions.

## Acceptance Criteria

- [ ] Function `sum_primes_in_range(start, end)` exists and is importable
- [ ] Returns 17 for range [1, 10] (2+3+5+7)
- [ ] Returns 77 for range [1, 20] (2+3+5+7+11+13+17+19)
- [ ] Returns 0 for range [1, 1] (no primes)
- [ ] Returns 0 for range [8, 8] (8 is not prime)
- [ ] Handles large ranges: [1, 10000] in < 100ms
- [ ] Correctly uses is_prime() function

## Technical Notes

- Use Sieve of Eratosthenes for performance with large ranges
- Falls back to trial division for single-range checks
- Reuses is_prime() function from Story 001
- Inclusive bounds [start, end]

## Dependencies

- Story 001: Prime Detection (needs is_prime function)

## Estimated Effort

- 3-4 hours
