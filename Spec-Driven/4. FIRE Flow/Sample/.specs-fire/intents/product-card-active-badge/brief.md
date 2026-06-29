---
id: product-card-active-badge
title: Product Card with Active Status Badge
status: completed
created: 2026-06-30T00:00:00Z
completed_at: 2026-06-29T18:49:08.899Z
---

# Intent: Product Card with Active Status Badge

## Goal

Create new product card component displaying green 'Status: Active' badge when inventory count is odd number.

## Users

All product viewers need quick visual indicator of inventory status.

## Problem

No status indicator for inventory levels on product cards. Users can't quickly identify products with odd inventory counts.

## Success Criteria

- Green badge displays when inventory count is odd
- Badge hidden when inventory count is even
- Component accepts inventory count via HTML data attribute
- Styling matches design system (green color, readable)
- Component renders in all browsers

## Constraints

- Inventory count sourced from HTML data attribute (data-inventory)
- Create new component, don't modify existing cards
- Support dynamic inventory values

## Notes

User preference: Green badge styling. Component is foundation for future inventory-based UI features.
