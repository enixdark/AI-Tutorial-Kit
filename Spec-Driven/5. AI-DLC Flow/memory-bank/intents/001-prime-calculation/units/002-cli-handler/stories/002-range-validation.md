# Story: Validate Range Input

**Unit**: 002-cli-handler

**Priority**: Must

**Status**: Planned

## Description

As the system, I need to validate the parsed range before passing to the math engine, so invalid input doesn't cause crashes or incorrect results.

## Acceptance Criteria

- [ ] Rejects negative start values: show "Error: Start must be >= 0"
- [ ] Rejects negative end values: show "Error: End must be >= 0"
- [ ] Rejects range where start > end: show "Error: Start must be <= End"
- [ ] Accepts equal start and end (e.g., 5, 5)
- [ ] Accepts zero: (e.g., 0, 100)
- [ ] All validation errors exit with code 1
- [ ] Messages print to stderr

## Technical Notes

- Implement validation function before calling math engine
- Clear, actionable error messages
- No exceptions should escape (catch and report)

## Dependencies

- Story 001: Argument Parsing (needs parsed integers)

## Estimated Effort

- 1 hour
