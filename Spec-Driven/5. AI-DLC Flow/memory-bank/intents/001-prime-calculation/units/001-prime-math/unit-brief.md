---
unit: 001-prime-math
intent: 001-prime-calculation
phase: inception
status: draft
created: 2026-07-06T00:00:00Z
updated: 2026-07-06T00:00:00Z
---

# Unit Brief: Prime Math Engine

## Purpose

Provide fast, correct mathematical operations for prime number detection and summation. This is the core computational engine serving the CLI interface.

## Scope

### In Scope
- Detect whether a given integer is prime
- Calculate sum of all primes within a range [start, end]
- Handle edge cases (0, 1, 2, negative numbers)
- Optimize for performance (< 100ms for range 1-10000)

### Out of Scope
- Command-line argument parsing (CLI Handler responsibility)
- User output formatting (CLI Handler responsibility)
- File I/O or logging
- Caching/memoization (v2 candidate)

---

## Assigned Requirements

| FR | Requirement | Priority |
|----|----|----------|
| FR-1 | Prime Number Detection | Must |
| FR-2 | Sum Primes in Range | Must |

---

## Domain Concepts

### Key Entities
| Entity | Description | Attributes |
|--------|-------------|------------|
| Prime | A natural number > 1 with exactly 2 divisors | value, is_prime |
| Range | Inclusive interval [start, end] | start, end, sum_of_primes |

### Key Operations
| Operation | Description | Inputs | Outputs |
|-----------|-------------|--------|---------|
| is_prime(n) | Check if n is prime | Integer n | Boolean |
| sum_primes_in_range(start, end) | Sum all primes in range | start, end | Integer sum |

---

## Story Summary

| Metric | Count |
|--------|-------|
| Total Stories | 3 |
| Must Have | 3 |
| Should Have | 0 |
| Could Have | 0 |

### Stories

| Story ID | Title | Priority | Status |
|----------|-------|----------|--------|
| 001 | Implement prime detection for single number | Must | Planned |
| 002 | Implement sum calculation for range | Must | Planned |
| 003 | Handle edge cases and boundary conditions | Must | Planned |

---

## Dependencies

### Depends On
(None - this is the foundation unit)

### Depended By
| Unit | Reason |
|------|--------|
| 002-cli-handler | Calls is_prime() and sum_primes_in_range() functions |

### External Dependencies
| System | Purpose | Risk |
|--------|---------|------|
| None | N/A | N/A |

---

## Technical Context

### Suggested Technology
- **Language**: Python 3.9+
- **Approach**: Pure Python functions, no external libraries
- **Algorithm**: Trial division for primality testing (simple, correct)
- **Optimization**: Sieve of Eratosthenes for range sums (faster for large ranges)

### Integration Points
| Integration | Type | Protocol |
|-------------|------|----------|
| CLI Handler | Function call | Direct Python function |

### Data Storage
| Data | Type | Volume | Retention |
|------|------|--------|-----------|
| Computed primes | In-memory | Temporary during calculation | Session only |

---

## Constraints

- **No external libraries**: Build prime logic from scratch
- **Performance**: Must complete range 1-10000 in < 100ms
- **Correctness**: 100% accuracy required (verified against reference)
- **Python 3.9+**: Must use only standard library

---

## Success Criteria

### Functional
- [ ] is_prime(2) returns True
- [ ] is_prime(4) returns False
- [ ] sum_primes_in_range(1, 10) returns 17
- [ ] sum_primes_in_range(1, 20) returns 77
- [ ] Handles edge cases: 0, 1, negative numbers

### Non-Functional
- [ ] Range 1-10000 calculated in < 100ms
- [ ] Code coverage > 80%
- [ ] No external dependencies

### Quality
- [ ] Code reviewed and approved
- [ ] All acceptance criteria met
- [ ] Passes all test cases

---

## Bolt Suggestions

Based on complexity and stories:

| Bolt | Type | Stories | Objective |
|------|------|---------|-----------|
| bolt-001-prime-math-1 | Simple | S1, S2, S3 | Complete math engine with all logic and edge cases |

---

## Notes

- Correctness > performance for v1 (but must meet < 100ms target)
- Consider both trial division (simple) and Sieve (faster for ranges)
- Thoroughly test edge cases before construction
- No caching/memoization in v1; revisit in v2 if performance becomes issue
