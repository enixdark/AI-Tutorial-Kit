# Story: Implement Prime Detection

**Unit**: 001-prime-math

**Priority**: Must

**Status**: Planned

## Description

As a developer, I need a function that detects whether a given integer is prime, so that I can use it to identify prime numbers for summation.

## Acceptance Criteria

- [ ] Function `is_prime(n)` exists and is importable
- [ ] Returns `True` for prime numbers: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29
- [ ] Returns `False` for non-primes: 0, 1, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20
- [ ] Handles edge cases: negative numbers return False
- [ ] Performance: Single prime check completes in < 10ms

## Technical Notes

- Use trial division algorithm (simplest, correct approach)
- No external libraries
- Include comprehensive docstring
- Examples in docstring

## Dependencies

- None (foundational story)

## Estimated Effort

- 2-3 hours
