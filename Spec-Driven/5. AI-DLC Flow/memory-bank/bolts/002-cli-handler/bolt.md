---
id: 002-cli-handler
unit: 002-cli-handler
intent: 001-prime-calculation
type: simple-construction-bolt
status: planned
stories:
  - 001-argument-parsing
  - 002-range-validation
  - 003-result-display
created: 2026-07-06T00:00:00Z
started: null
completed: null
current_stage: null
stages_completed: []

requires_bolts: [001-prime-math]
enables_bolts: []
requires_units: []
blocks: false

complexity:
  avg_complexity: 1
  avg_uncertainty: 1
  max_dependencies: 2
  testing_scope: 2
---

# Bolt: 002-cli-handler

## Overview

Command-line interface that parses user input, validates ranges, and integrates with the prime math engine to display results.

## Objective

Provide a simple, user-friendly CLI that accepts start/end range arguments, validates them, calls the math engine, and displays results clearly.

## Stories Included

- **001-argument-parsing**: Parse command-line arguments for range (Must)
- **002-range-validation**: Validate range input and reject invalid input (Must)
- **003-result-display**: Display calculation result clearly to user (Must)

## Bolt Type

**Type**: simple-construction-bolt

**Stages**:
1. Implementation - Argument parsing, validation, integration
2. Testing - CLI tests, error handling verification
3. Completion - Code review, end-to-end testing

## Dependencies

### Requires
- Bolt 001-prime-math (Needs is_prime and sum_primes_in_range functions)

### Enables
- (None - CLI is the end product for users)

## Success Criteria

- [ ] All 3 stories implemented and working
- [ ] Accepts `python main.py <start> <end>` format
- [ ] Validates ranges correctly (no negatives, start ≤ end)
- [ ] Calls prime math engine correctly
- [ ] Displays results in format: "Sum of primes in range [X, Y]: Z"
- [ ] Clear error messages on invalid input
- [ ] Exit code 0 for success, 1 for error
- [ ] Unit and integration tests passing (coverage > 80%)
- [ ] Code reviewed and approved

## Expected Outputs

- `main.py` - CLI entry point containing:
  - `parse_arguments()` function
  - `validate_range()` function
  - Main execution logic
- `test_cli_handler.py` - Test suite covering all scenarios
- Executable Python script ready for users

## Implementation Notes

- **Argument Parsing**: Use sys.argv (no argparse framework for v1)
- **Error Output**: All errors to stderr via print(..., file=sys.stderr)
- **Validation**: Check argument count, convert to int, validate range
- **Output Format**: Single line: "Sum of primes in range [X, Y]: Z"
- **Integration**: Import and call functions from prime_math module

## Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Math engine import fails | Low | CLI won't run | Test import before using |
| User passes non-integers | Medium | Crashes without error | Try/except around int() conversion |
| Dependency on 001-prime-math | High | Blocked until complete | Start after 001-prime-math finishes |

## Notes

- This bolt depends on completion of 001-prime-math
- v2 candidate features: argparse for --help, --version, multiple operations
- Keep error messages clear and actionable for users
- Test both happy path and error scenarios
