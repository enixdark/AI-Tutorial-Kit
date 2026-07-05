---
unit: 002-cli-handler
intent: 001-prime-calculation
phase: inception
status: draft
created: 2026-07-06T00:00:00Z
updated: 2026-07-06T00:00:00Z
---

# Unit Brief: CLI Handler

## Purpose

Provide command-line interface for users to invoke prime calculation with range input, validate arguments, and display results clearly.

## Scope

### In Scope
- Parse command-line arguments (start, end range)
- Validate input ranges (no negatives, start ≤ end)
- Call Prime Math Engine for calculations
- Format and display results to stdout
- Handle errors gracefully with clear messages to stderr

### Out of Scope
- Mathematical prime detection (Prime Math Engine responsibility)
- Caching or memoization
- Advanced CLI features (config files, profiles, history)

---

## Assigned Requirements

| FR | Requirement | Priority |
|----|----|----------|
| FR-3 | Range Validation | Must |

---

## Domain Concepts

### Key Entities
| Entity | Description | Attributes |
|--------|-------------|------------|
| CLI Command | Entry point for user interaction | args, options |
| Input | User-provided range | start (int), end (int) |
| Output | Formatted result | sum (int), execution_time (ms) |

### Key Operations
| Operation | Description | Inputs | Outputs |
|-----------|-------------|--------|---------|
| parse_args() | Extract range from command line | sys.argv | start, end |
| validate_range() | Check range is valid | start, end | Boolean or error message |
| format_result() | Display result to user | sum, range | Formatted string |

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
| 001 | Parse command-line arguments for range | Must | Planned |
| 002 | Validate range input and reject invalid input | Must | Planned |
| 003 | Display calculation result clearly to user | Must | Planned |

---

## Dependencies

### Depends On
| Unit | Reason |
|------|--------|
| 001-prime-math | Calls is_prime() and sum_primes_in_range() to perform calculations |

### Depended By
(None - CLI is the entry point)

### External Dependencies
| System | Purpose | Risk |
|--------|---------|------|
| None | N/A | N/A |

---

## Technical Context

### Suggested Technology
- **Language**: Python 3.9+
- **Approach**: Simple argument parsing via sys.argv
- **Error Handling**: try/catch with stderr output
- **Output**: Plain text to stdout

### Integration Points
| Integration | Type | Protocol |
|-------------|------|----------|
| Prime Math Engine | Function call | Direct Python function import |
| User | Command-line | Stdin/stdout/stderr |

### Data Storage
| Data | Type | Volume | Retention |
|------|------|--------|-----------|
| None | N/A | N/A | N/A |

---

## Constraints

- **Simple parsing**: Use sys.argv, no argparse framework (keep minimal)
- **Bare Python**: No external CLI libraries (Click, Typer deferred to v2)
- **Error clarity**: Users must understand what went wrong
- **Performance**: Input validation + formatting should be < 10ms

---

## Success Criteria

### Functional
- [ ] Accepts two integer arguments: start and end
- [ ] Rejects negative ranges
- [ ] Rejects ranges where start > end
- [ ] Calls Prime Math Engine with valid input
- [ ] Displays result in clear format: "Sum of primes in range [X, Y]: Z"

### Non-Functional
- [ ] Input validation + output formatting < 10ms
- [ ] Error messages printed to stderr
- [ ] Exit codes: 0 for success, 1 for error

### Quality
- [ ] Code coverage > 80%
- [ ] All acceptance criteria met
- [ ] Handles edge cases (empty range, single number)

---

## Bolt Suggestions

Based on complexity and stories:

| Bolt | Type | Stories | Objective |
|------|------|---------|-----------|
| bolt-002-cli-handler-1 | Simple | S1, S2, S3 | Complete CLI with argument parsing, validation, and output |

---

## Notes

- v1: Simple sys.argv parsing (no framework)
- v2 candidate: Migrate to Click or Typer for richer CLI features
- Error messages should be user-friendly, not technical
- Consider --help flag in v2
