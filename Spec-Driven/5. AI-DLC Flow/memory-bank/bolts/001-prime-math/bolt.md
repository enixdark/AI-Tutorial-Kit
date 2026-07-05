---
id: 001-prime-math
unit: 001-prime-math
intent: 001-prime-calculation
type: simple-construction-bolt
status: planned
stories:
  - 001-prime-detection
  - 002-sum-in-range
  - 003-edge-cases
created: 2026-07-06T00:00:00Z
started: null
completed: null
current_stage: null
stages_completed: []

requires_bolts: []
enables_bolts: [002-cli-handler]
requires_units: []
blocks: false

complexity:
  avg_complexity: 2
  avg_uncertainty: 1
  max_dependencies: 1
  testing_scope: 2
---

# Bolt: 001-prime-math

## Overview

Core mathematical engine for prime number detection and summation. This bolt implements the foundational algorithms that will be called by the CLI interface.

## Objective

Implement fast, correct algorithms for detecting prime numbers and calculating their sum within ranges, with comprehensive handling of edge cases.

## Stories Included

- **001-prime-detection**: Implement prime detection for single number (Must)
- **002-sum-in-range**: Implement sum calculation for range (Must)
- **003-edge-cases**: Handle edge cases and boundary conditions (Must)

## Bolt Type

**Type**: simple-construction-bolt

**Stages**:
1. Implementation - Write functions and logic
2. Testing - Unit tests, acceptance criteria verification
3. Completion - Code review, finalization

## Dependencies

### Requires
- None (foundational bolt)

### Enables
- Bolt 002-cli-handler (CLI needs math engine to call)

## Success Criteria

- [ ] All 3 stories implemented and working
- [ ] All acceptance criteria from stories met
- [ ] Unit tests written and passing (coverage > 80%)
- [ ] Edge cases handled correctly
- [ ] Range 1-10000 sum calculated in < 100ms
- [ ] Code reviewed and approved

## Expected Outputs

- `prime_math.py` - Module containing:
  - `is_prime(n)` function
  - `sum_primes_in_range(start, end)` function
- `test_prime_math.py` - Comprehensive test suite
- Documentation of algorithms and assumptions

## Implementation Notes

- **Prime Detection**: Trial division (simple, O(√n))
- **Range Summation**: Sieve of Eratosthenes (faster for large ranges, O(n log log n))
- **Edge Cases**: Handle 0, 1, 2, negatives, large numbers
- **No External Libraries**: Pure Python only
- **Performance Target**: 1-10000 in < 100ms

## Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Algorithm complexity | Low | Performance miss | Use Sieve for large ranges |
| Edge case oversights | Medium | Correctness issues | Exhaustive test cases |
| Integer overflow (very large n) | Low | Calculation errors | Test with sys.maxsize |

## Notes

- This is the foundation for all calculation logic
- Quality and correctness are more important than v1 performance
- v2 can add caching/memoization if needed
- Thoroughly test before moving to CLI handler
