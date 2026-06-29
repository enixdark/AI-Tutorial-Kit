---
id: active-status-badge
title: Add Active Status Badge Logic
intent: product-card-active-badge
complexity: low
mode: autopilot
status: completed
depends_on:
  - product-card-component
created: 2026-06-30T00:00:00Z
run_id: run-sample-001
completed_at: 2026-06-29T18:49:01.777Z
---

# Work Item: Add Active Status Badge Logic

## Description

Add conditional rendering for green 'Status: Active' badge. Badge displays when inventory count is odd, hides when even.

## Acceptance Criteria

- [ ] Badge renders as green div with 'Status: Active' text
- [ ] Badge visibility tied to odd/even inventory check
- [ ] Odd inventory = badge visible
- [ ] Even inventory = badge hidden
- [ ] CSS styling complete (green color, proper spacing)
- [ ] Badge integrated into ProductCard component

## Technical Notes

Odd check: `inventory % 2 === 1`
Badge styling: green background, white text, rounded corners
Location: src/components/ProductCard.jsx (within component)

## Dependencies

- product-card-component
