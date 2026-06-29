---
id: component-tests
title: Write ProductCard Tests
intent: product-card-active-badge
complexity: low
mode: autopilot
status: completed
depends_on:
  - active-status-badge
created: 2026-06-30T00:00:00Z
run_id: run-sample-001
completed_at: 2026-06-29T18:49:01.848Z
---

# Work Item: Write ProductCard Tests

## Description

Create unit tests for ProductCard component covering odd/even inventory logic and badge visibility.

## Acceptance Criteria

- [ ] Test file created: tests/ProductCard.test.jsx
- [ ] Test: badge visible when inventory is odd
- [ ] Test: badge hidden when inventory is even
- [ ] Test: badge has correct text content
- [ ] Test: component renders without errors
- [ ] All tests pass
- [ ] Coverage >= 80%

## Technical Notes

Test framework: Jest
Use React Testing Library for component testing
Mock data: test with inventory values 1, 2, 3, 4 (odd/even coverage)

## Dependencies

- active-status-badge
