---
title: "Fibonacci Teaching Module: Recursion Explosion & Memoization"
status: draft
created: 2026-07-10
updated: 2026-07-10
audience: "Self / hobby learning project"
stakeholders: "Solo author"
---

# Fibonacci Teaching Module: Recursion Explosion & Memoization

## Vision

A single Python module that teaches learners why naive recursive Fibonacci explodes exponentially—not through abstract explanation, but by seeing the problem unfold in real time. The goal is deep understanding: learner grasps *why* duplication happens and *how* memoization stops it.

## Problem

Learners often implement recursive Fibonacci, run it, and assume "it works" because fib(10) returns an answer. They miss the computational cost: fib(10) recalculates fib(5) dozens of times. Traditional teaching shows trees or formulas; this module makes the waste *visible* by printing every call with indentation depth, so learners count duplicates with their eyes.

## Success Criteria

Learner completes the module and can:
1. Trace a call tree mentally and predict which subproblems recalculate
2. Explain why naive fib(n) is exponential without memorizing a formula
3. Recognize the pattern (repeated subproblems → cache wins) in other contexts

## Deliverable

**One Python file** (`fibonacci_teaching.py`) with:

- **Naive recursive fib**: Unoptimized baseline. Prints each call with indentation and argument, so learner sees the tree structure on screen.
- **Instrumented naive fib**: Same logic, but wrapped to count how many times each subproblem recalculates.
- **Memoized fib**: Caches intermediate results. Learner runs the same fib(10), sees far fewer prints (aha moment).
- **Docstrings**: Explain the teaching intent, not just the algorithm. Lead learner through the logic with annotations.

[ASSUMPTION] File is self-contained—no external dependencies, pure Python stdlib.

[ASSUMPTION] All implementations handle n in range [0, 40] correctly (no overflow, no arbitrary limit).

## Structure & Narrative

### Part 1: Problem Setup (Docstring + Example)
```
- Define naive fib with print instrumentation
- Run fib(10) and display the full output (with indentation)
- Let learner count duplicates: "fib(5) appears 21 times"
```

### Part 2: Explanation (Docstring)
```
- Walk through why: fib(10) = fib(9) + fib(8)
- fib(9) also calls fib(8) → duplication starts
- For larger n, duplication cascades exponentially
- Visual: "If you traced fib(30), you'd see fib(1) calculated 832,040 times"
```

### Part 3: Solution (Code + Example)
```
- Show memoization: dict cache stores (n → result)
- Before first call, check cache; if miss, compute and store
- Run memo_fib(10), compare output to naive version
- Learner sees ~20 prints instead of 177
- Docstring: "The cache transforms exponential into linear"
```

### Part 4: Verification (Optional Doctest or Main Block)
```
- Simple assertions: memo_fib(40) == naive_fib(40) (but memo runs instantly)
- Learner can run the module directly and see both versions in action
```

## Open Questions

- [NOTE FOR PM] Should the output include a call-count summary at the end? E.g., `"Total calls: 177"` vs. just printing each call?
- [NOTE FOR PM] Include timing comparison (naive vs memo for fib(35))? Might distract from the core lesson.

## Out of Scope

- Iterative Fibonacci (different approach, separate lesson)
- Matrix exponentiation or closed-form formula
- Generator patterns or infinite sequences
- Big-integer handling or cryptography
- Integration with larger project or test suite

## Success Metrics

1. **Completeness**: All four implementations present and functional
2. **Teaching clarity**: Docstrings explain *why* each step matters, not just what it does
3. **Learner experience**: Running the module side-by-side (naive vs memo) makes the efficiency gain obvious
