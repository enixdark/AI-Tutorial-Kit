---
title: "Fibonacci Teaching Module — Architecture Spine"
status: draft
updated: 2026-07-10
altitude: "Feature / Module level"
---

# Fibonacci Teaching Module — Architecture Spine

## Paradigm

**Linear narrative code.** Three implementations in sequence: naive fib → instrumented naive fib → memoized fib. Each function is self-contained; the module is read top-to-bottom as a teaching progression, not as a reference library.

## Invariants

### AD-1: Linear Code Sequence
**Binds:** Function order in `fibonacci_teaching.py` is: `fib_naive()` → `fib_naive_instrumented()` → `fib_memoized()`.

**Prevents:** Learner confusion from jumping between implementations; narrative flow broken by alphabetical/category sorting.

**Rule:** All three implementations live in one file, in declaration order. Module's `if __name__ == "__main__"` block demonstrates each function in sequence on the same input (e.g., `fib(10)`).

---

### AD-2: Docstring-First Teaching
**Binds:** Every function carries a module-level docstring explaining the teaching intent and the algorithm *before* the learner reads the code.

**Prevents:** Learner skipping straight to code and missing the conceptual setup; abstract code without grounding in the problem.

**Rule:** 
- Docstring structure: **Problem setup** (why this implementation exists) → **Concept** (how it works) → **Example** (what the output looks like on fib(10)).
- Docstrings explain *why* each version matters, not just what it does.
- Include execution trace or call count for instrumented/memoized versions so learner sees the payoff.

---

### AD-3: Single Focused Module
**Binds:** `fibonacci_teaching.py` is self-contained, imports only Python stdlib (`functools` for decorator, nothing else).

**Prevents:** Dependency bloat; external dependencies distract from the teaching goal; learner can run it anywhere without setup.

**Rule:** No external packages. `functools.lru_cache` is acceptable (stdlib, immediate teaching payoff). Print output to stdout; no logging framework or custom instrumentation library.

---

### AD-4: Deliverables Pairing
**Binds:** Two artifacts:
1. `fibonacci_teaching.py` — the module, runnable standalone.
2. `GUIDE_ATTACK_DOCS.md` — a narrative guide that walks a learner through running the module and understanding each step.

**Prevents:** Code without context (learner doesn't know how to use it); docs without code (learner doesn't see the payoff).

**Rule:** Guide opens with "What you'll learn" → links to run the module → explains output of each function → closes with "You now understand why recursion explodes."

---

## Seed (Non-Negotiable Startup State)

- `fib_naive(n: int) -> int` — unoptimized recursive Fibonacci, prints each call with indentation to show tree structure.
- `fib_naive_instrumented(n: int) -> tuple[int, int]` — same logic, returns `(fib_value, call_count)` so learner sees how many times each subproblem recalculates.
- `fib_memoized(n: int) -> int` — memoized version using `@functools.lru_cache`, prints calls like naive (fewer of them).
- Both `fibonacci_teaching.py` and `GUIDE_ATTACK_DOCS.md` live in the same directory for easy discovery.

---

## Open Questions

- **Timing comparison (fib(35) naive vs. memo)?** Worth including in guide to show real-world impact, or distracting from core lesson (duplication → cache)?
  - *Deferred to implementation review.*

- **Generator pattern or iterative variant in docs?** Out of scope per PRD, but worth noting as a "next step" section in guide?
  - *Deferred; no docs yet, decide when writing guide.*

---

## Deferred (Not Decided, No Risk)

- Exact print format for instrumentation (exact indentation style, markers for duplicates).
- `fib(n)` argument limits or validation (assume n ∈ [0, 40]).
- Test suite for the module (falls to implementation/verification phase).

---

## Why This Architecture

**Linear organization** makes the teaching intent visible: learner sees progression from problem to solution without distraction.

**Docstring-first** mirrors how learning happens: concept, then code, then execution.

**Single module + paired guide** keeps the cognitive load light: everything needed lives in one place, and the guide bridges code to understanding.
