---
run: run-sample-001
work_items: [product-card-component, active-status-badge, component-tests, documentation]
intent: product-card-active-badge
mode: autopilot
checkpoint: none
scope: wide
---

# Implementation Plan: Product Card with Active Status Badge

## Overview

Build a React product card component with conditional green status badge. Badge visibility tied to inventory count (odd = visible, even = hidden). All items execute sequentially.

---

## Work Item 1: Create ProductCard Component

### Approach

Create base React functional component accepting inventory count via prop. Renders basic card structure with placeholder content.

### Files to Create

| File | Purpose |
|------|---------|
| `src/components/ProductCard.jsx` | React component for product card |

### Files to Modify

| File | Changes |
|------|---------|
| (none) | |

### Technical Details

- Functional component using React hooks
- Accept `inventory` prop (number)
- Render basic card layout with placeholder product info
- No styling beyond basic structure (CSS added in later items)

---

## Work Item 2: Add Active Status Badge Logic

### Approach

Add conditional rendering for green status badge within ProductCard. Check if inventory is odd (inventory % 2 === 1), render badge or null based on condition.

### Files to Create

| File | Purpose |
|------|---------|
| (none) | |

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/ProductCard.jsx` | Add badge render logic and inline CSS |

### Technical Details

- Check: `inventory % 2 === 1` for odd inventory
- Badge: `<div className="status-badge">Status: Active</div>`
- Styling: Green background (#4CAF50), white text, padding, rounded corners
- Conditional render: `{isActive && <badge>}` or ternary operator

---

## Work Item 3: Write ProductCard Tests

### Approach

Write Jest unit tests validating component behavior. Test odd/even logic, badge visibility, component rendering, prop acceptance.

### Files to Create

| File | Purpose |
|------|---------|
| `tests/ProductCard.test.jsx` | Jest tests for component |

### Files to Modify

| File | Changes |
|------|---------|
| (none) | |

### Tests

| Test File | Coverage |
|-----------|----------|
| `tests/ProductCard.test.jsx` | Badge visibility, odd/even logic, prop handling |

### Technical Details

- Use React Testing Library for component testing
- Test cases:
  - Renders without crashing
  - Badge visible when inventory is odd (1, 3, 5)
  - Badge hidden when inventory is even (2, 4, 6)
  - Badge text content correct
  - Component accepts inventory prop
- Coverage target: ≥80%

---

## Work Item 4: Create Usage Documentation

### Approach

Write README with usage examples, prop documentation, and HTML usage patterns. Include examples for odd and even inventory counts.

### Files to Create

| File | Purpose |
|------|---------|
| `docs/ProductCard.md` | Component documentation |

### Files to Modify

| File | Changes |
|------|---------|
| (none) | |

### Technical Details

- Document component props (inventory: number)
- JSX usage example
- HTML data-attribute usage example
- Behavior description (badge logic)
- Expected inventory value ranges
- Browser compatibility notes

---

## Execution Order

1. Create ProductCard component (base)
2. Add status badge logic (depends on #1)
3. Write tests (depends on #2)
4. Create documentation (depends on #3)

All items execute sequentially within this run (wide scope).

---

*Plan generated for autopilot execution. Continuing without checkpoint.*
