---
id: 001-prime-math
unit: 001-prime-math
intent: 001-prime-calculation
type: ddd-construction-bolt
status: planned
stories:
  - 001-prime-detection
  - 002-sum-in-range
created: 2026-07-08T00:00:00Z
started: null
completed: null
current_stage: null
stages_completed: []

requires_bolts: []
enables_bolts:
  - 002-prime-math
  - 003-cli-handler
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

Core prime number mathematics engine. Implements efficient prime detection and range summation with trial division and Sieve of Eratosthenes algorithms.

## Objective

Establish foundational prime number detection and range summation logic that the CLI handler will depend on. Cover core functionality and basic edge case handling.

## Stories Included

- **001-prime-detection**: Implement is_prime(n) function with trial division (Must)
- **002-sum-in-range**: Implement sum_primes_in_range(start, end) using Sieve algorithm (Must)

## Bolt Type

**Type**: ddd-construction-bolt  
**Definition**: `.specsmd/aidlc/templates/construction/bolt-types/ddd-construction-bolt.md`

## Stages

- [ ] **1. Domain Model**: Define Prime and Range entities, operations, invariants → `ddd-01-domain-model.md`
- [ ] **2. Technical Design**: Algorithm selection, performance constraints, implementation strategy → `ddd-02-technical-design.md`
- [ ] **3. Implement**: Write is_prime() and sum_primes_in_range() functions with full docstrings
- [ ] **4. Test**: Unit tests for both functions, verify test report → `ddd-03-test-report.md`

## Dependencies

### Requires

- None (foundational bolt)

### Enables

- **002-prime-math**: Edge case handling depends on working prime logic
- **003-cli-handler**: CLI handler needs these functions to operate

## Success Criteria

- [ ] `is_prime(n)` correctly identifies primes: 2,3,5,7,11... return True; 0,1,4,6... return False
- [ ] `sum_primes_in_range(1, 10)` returns 17
- [ ] `sum_primes_in_range(1, 20)` returns 77
- [ ] Large range [1, 10000] completes in < 100ms
- [ ] Edge cases handled: negative numbers, single values
- [ ] Code coverage > 80%
- [ ] All acceptance criteria from stories met
- [ ] Code reviewed and approved

## Notes

- Performance critical: Sieve of Eratosthenes needed for large ranges
- Trial division simpler for single checks, but Sieve faster for ranges
- Document algorithm selection rationale in technical design
- No external dependencies (standard library only)
- Negative numbers and 0,1 must return False for is_prime()
