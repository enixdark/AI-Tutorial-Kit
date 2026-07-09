---
id: 003-cli-handler
unit: 002-cli-handler
intent: 001-prime-calculation
type: simple-construction-bolt
status: planned
stories:
  - 001-argument-parsing
  - 002-range-validation
  - 003-result-display
created: 2026-07-08T00:00:00Z
started: null
completed: null
current_stage: null
stages_completed: []

requires_bolts:
  - 001-prime-math
  - 002-prime-math
enables_bolts: []
requires_units: []
blocks: false

complexity:
  avg_complexity: 1
  avg_uncertainty: 1
  max_dependencies: 2
  testing_scope: 1
---

# Bolt: 003-cli-handler

## Overview

Command-line interface for prime calculator. Parses user input, validates ranges, invokes prime math engine, and displays results with clear error handling.

## Objective

Complete the user-facing CLI that ties together the prime math engine. Handle argument parsing, input validation, and formatted output in a simple, maintainable way using only sys.argv (no frameworks).

## Stories Included

- **001-argument-parsing**: Parse command-line arguments for start and end range (Must)
- **002-range-validation**: Validate parsed range before passing to math engine (Must)
- **003-result-display**: Format and display calculation result to user (Must)

## Bolt Type

**Type**: simple-construction-bolt  
**Definition**: `.specsmd/aidlc/templates/construction/bolt-types/simple-construction-bolt.md`

## Stages

- [ ] **1. Plan**: Implementation plan covering all 3 stories, CLI structure, error handling → `implementation-plan.md`
- [ ] **2. Implement**: Write main.py with parse_args(), validate_range(), format_result() functions → `implementation-walkthrough.md`
- [ ] **3. Test**: End-to-end CLI tests, verify all acceptance criteria → `test-walkthrough.md`

## Dependencies

### Requires

- **001-prime-math**: Need is_prime() and sum_primes_in_range() functions
- **002-prime-math**: Need edge case handling to be complete

### Enables

- None (final user-facing component)

## Success Criteria

- [ ] Script accepts two positional arguments: `python main.py <start> <end>`
- [ ] Arguments parsed as integers with error handling
- [ ] Validates: no negatives, start ≤ end
- [ ] Rejects invalid input with clear error messages to stderr
- [ ] Missing arguments show usage message
- [ ] Calls prime math engine with valid input
- [ ] Displays: "Sum of primes in range [START, END]: RESULT"
- [ ] Exit codes: 0 for success, 1 for errors
- [ ] Input validation + output formatting < 10ms
- [ ] All acceptance criteria from 3 stories met
- [ ] Code coverage > 80%

## Notes

- Keep implementation simple: sys.argv only, no click/typer (deferred to v2)
- Error messages user-friendly, not technical
- No external dependencies (standard library only)
- Consider --help flag in v2 iteration
- Machine-parseable output format for potential future scripting
