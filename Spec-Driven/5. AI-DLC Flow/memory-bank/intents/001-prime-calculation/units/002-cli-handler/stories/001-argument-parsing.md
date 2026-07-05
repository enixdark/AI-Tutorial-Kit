# Story: Parse Command-Line Arguments

**Unit**: 002-cli-handler

**Priority**: Must

**Status**: Planned

## Description

As a user, I need to pass start and end values as command-line arguments, so I can easily invoke the calculator with my desired range.

## Acceptance Criteria

- [ ] Script accepts two positional arguments: `python main.py <start> <end>`
- [ ] Arguments are parsed as integers
- [ ] Example: `python main.py 1 100` extracts start=1, end=100
- [ ] Non-integer arguments show clear error message
- [ ] Missing arguments show usage message: "Usage: python main.py <start> <end>"
- [ ] Exit code 1 for parse errors

## Technical Notes

- Use sys.argv for simplicity (no argparse framework)
- Validate argument count before accessing
- Convert strings to integers with error handling
- Clear error messages to stderr

## Dependencies

- None (independent from math engine)

## Estimated Effort

- 1-2 hours
