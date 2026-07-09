---
id: 002-prime-math
unit: 001-prime-math
intent: 001-prime-calculation
type: ddd-construction-bolt
status: planned
stories:
  - 003-edge-cases
created: 2026-07-08T00:00:00Z
started: null
completed: null
current_stage: null
stages_completed: []

requires_bolts:
  - 001-prime-math
enables_bolts:
  - 003-cli-handler
requires_units: []
blocks: false

complexity:
  avg_complexity: 2
  avg_uncertainty: 1
  max_dependencies: 2
  testing_scope: 2
---

# Bolt: 002-prime-math

## Overview

Edge case handling and robustness validation for prime math engine. Ensures is_prime() and sum_primes_in_range() handle all boundary conditions correctly without performance degradation.

## Objective

Complete the prime math engine by thoroughly validating edge cases: 0, 1, 2, negative numbers, large numbers, reversed ranges, and performance thresholds. Ensure production-ready robustness.

## Stories Included

- **003-edge-cases**: Handle boundary conditions (0, 1, 2, negatives, large numbers, reversed ranges) (Must)

## Bolt Type

**Type**: ddd-construction-bolt  
**Definition**: `.specsmd/aidlc/templates/construction/bolt-types/ddd-construction-bolt.md`

## Stages

- [ ] **1. Domain Model**: Document edge case assumptions, invariants, and boundary handling strategy → `ddd-01-domain-model.md`
- [ ] **2. Technical Design**: How edge cases are handled in each function, guard conditions → `ddd-02-technical-design.md`
- [ ] **3. Implement**: Add guards, documentation, assertions where appropriate
- [ ] **4. Test**: Comprehensive edge case test suite, verify all scenarios → `ddd-03-test-report.md`

## Dependencies

### Requires

- **001-prime-math**: Must have working is_prime() and sum_primes_in_range() functions

### Enables

- **003-cli-handler**: CLI handler can now rely on robust math engine

## Success Criteria

- [ ] `is_prime(0)` returns False
- [ ] `is_prime(1)` returns False
- [ ] `is_prime(2)` returns True (smallest prime)
- [ ] `is_prime(-5)` returns False (negatives)
- [ ] `is_prime(1000000)` works correctly without timeout
- [ ] `sum_primes_in_range(100, 50)` returns 0 (start > end)
- [ ] `sum_primes_in_range(-10, 20)` handles negative start
- [ ] Large ranges still meet < 100ms performance target
- [ ] All edge case acceptance criteria from story met
- [ ] Edge case tests added to test suite
- [ ] Code coverage remains > 80%

## Notes

- This bolt depends entirely on 001-prime-math being complete and working
- Focus: defensive programming and comprehensive test coverage
- Performance must not regress despite added guards
- Consider documenting assumptions about input ranges in function docstrings
- Verify against reference data (e.g., known prime lists up to 1000)
