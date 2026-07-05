# Story: Display Calculation Result

**Unit**: 002-cli-handler

**Priority**: Must

**Status**: Planned

## Description

As a user, I need the result formatted clearly so I can easily understand what calculation was performed and what the answer is.

## Acceptance Criteria

- [ ] Output format: "Sum of primes in range [START, END]: RESULT"
- [ ] Example: "Sum of primes in range [1, 20]: 77"
- [ ] Result printed to stdout
- [ ] No extra whitespace or formatting
- [ ] Exit code 0 on success
- [ ] Works with all valid ranges

## Technical Notes

- Use standard print() function
- Single line output for simplicity
- Machine-parseable format for future scripts
- No fancy formatting (v2 candidate for tables, etc.)

## Dependencies

- Story 001: Argument Parsing (needs arguments)
- Story 002: Range Validation (needs valid range)
- Math Engine: sum_primes_in_range() (from 001-prime-math)

## Estimated Effort

- 30 minutes
