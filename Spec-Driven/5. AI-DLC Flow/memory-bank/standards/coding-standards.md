# Coding Standards

## Overview

Simple, practical coding standards for Python CLI tool. Focus on clarity, consistency, and testability.

## Code Formatting

**Tool:** Black (default settings)

**Key Settings:**
- Line length: 88 characters (Black default)
- Indentation: 4 spaces (Python standard)
- Trailing commas: Auto (Black handles)
- Quote style: Double quotes (Black default)

**Enforcement:** Format code with Black before commit. Can be integrated into pre-commit hooks or IDE settings.

## Linting

**Tool:** Flake8

**Base Config:** Standard Flake8

**Strictness:** Balanced (catches real issues, not pedantic)

**Key Rules:**
- `E501`: Line too long (handled by Black, skip)
- `W503`: Line break before binary operator (handled by Black, skip)
- `F401`: Unused imports - error (remove unused)
- `F841`: Unused variables - error (remove or use)
- `E302`: Expected 2 blank lines, found N - error (spacing)

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Variables | snake_case | `prime_numbers`, `is_valid`, `max_limit` |
| Functions | snake_case | `calculate_sum`, `is_prime`, `filter_primes` |
| Classes | PascalCase | `PrimeCalculator`, `MathUtils` |
| Constants | UPPER_SNAKE | `MAX_ITERATIONS`, `DEFAULT_LIMIT`, `BUFFER_SIZE` |
| Modules | snake_case | `prime_utils.py`, `main.py`, `calculator.py` |
| Private | Leading underscore | `_internal_helper`, `_cache_result` |

**File Naming:**
- Python files: snake_case (e.g., `prime_utils.py`)
- Test files: `test_<module>.py` (e.g., `test_prime_utils.py`)

## File Organization

**Pattern:** Simple flat structure

**Structure:**
```text
prime-calculator/
  main.py                 # Entry point
  prime_utils.py          # Core utility functions
  calculator.py           # Main calculation logic (optional if small)
  tests/
    test_prime_utils.py
    test_calculator.py    # If separate calculator module
  requirements.txt        # Python dependencies
  README.md
  .flake8                 # Flake8 config (optional)
```

**Conventions:**
- Tests: `tests/` folder, named `test_<module>.py`
- Core logic: Root level or simple src structure
- No barrel imports needed (small project)

## Testing Strategy

**Framework:** pytest

**Coverage Target:** ≥80%

**Test Types:**

| Type | Tool | When to Use |
|------|------|-------------|
| Unit | pytest | Individual functions (prime checking, sum calculation) |
| Integration | pytest | Full workflow (CLI input → calculation → output) |

**Conventions:**

- Test naming: `test_<function>_<scenario>_<expected>` (e.g., `test_is_prime_with_valid_number_returns_true`)
- Test structure: Arrange-Act-Assert
- Mock strategy: Mock external dependencies only (file I/O, network)
- Test data: Inline simple values, fixtures for complex cases

**Coverage verification:**
```bash
pytest --cov=. --cov-report=term-missing
```

## Error Handling

**Pattern:** try/catch with meaningful error messages to stderr

**Approach:**
```python
try:
    result = calculate_sum_of_primes(numbers)
except ValueError as e:
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)
except Exception as e:
    print(f"Unexpected error: {e}", file=sys.stderr)
    sys.exit(1)
```

**Custom Errors:** Use built-in exceptions (ValueError, TypeError) unless domain-specific errors are needed

**CLI Exit Codes:**
- `0`: Success
- `1`: General error
- `2`: Invalid input

## Logging

**Tool:** print() for output

**Format:** Human-readable text to stdout

**Approach:**
- Progress/results: `print()` to stdout
- Errors: Print error messages to stderr with `file=sys.stderr`
- Debug info: Use comments or optional `--verbose` flag if needed

**What to output:**
- Calculation results
- User-facing feedback
- Error messages (clear and actionable)

**What NOT to output:**
- Internal debug details (unless `--verbose` flag)
- Performance metrics (unless requested)

## Decision Relationships

- Black + Flake8 together catch style + quality issues
- Simple flat structure keeps project navigable for small CLI
- pytest + 80% coverage ensures core logic is tested
- try/catch error handling works well for CLI (no complex recovery needed)
- print() approach keeps CLI lightweight and portable
