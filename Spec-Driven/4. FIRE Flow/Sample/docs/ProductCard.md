# ProductCard Component Documentation

## Overview

`ProductCard` is a React component that displays a product card with a conditional status badge. The badge shows "Status: Active" when the inventory count is an odd number.

## Props

### `inventory` (number, required)

The inventory count for the product. Determines badge visibility:
- **Odd number** (1, 3, 5, 7, ...): Badge displays as "Status: Active"
- **Even number** (2, 4, 6, 8, ...): Badge is hidden

## Usage

### JSX Example

```jsx
import ProductCard from './components/ProductCard';

function App() {
  return (
    <div>
      <ProductCard inventory={5} />  {/* Badge visible */}
      <ProductCard inventory={4} />  {/* Badge hidden */}
    </div>
  );
}
```

### HTML Data Attribute Example

```html
<div id="app" data-inventory="5"></div>

<script>
  const inventory = parseInt(document.getElementById('app').dataset.inventory);
  // Use with React or other framework
</script>
```

## Behavior

### Status Badge

- **Visible when**: Inventory count is odd (inventory % 2 === 1)
- **Hidden when**: Inventory count is even (inventory % 2 === 0)
- **Style**: Green background (#4CAF50), white text, rounded corners
- **Text**: "Status: Active"

### Card Structure

The component renders:
1. Product header with title and optional badge
2. Product content with inventory count display

## Styling

The component uses CSS from `ProductCard.css`. Styles include:
- Card container with border and shadow
- Flexbox header layout
- Green badge styling
- Responsive typography

## Browser Compatibility

Tested and compatible with:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Example: Odd Inventory (Badge Visible)

```jsx
<ProductCard inventory={7} />
```

Renders:
```
┌─ Product Card ───────────┐
│ Product    [Status: Active] │
│ Inventory Count: 7          │
└─────────────────────────────┘
```

## Example: Even Inventory (Badge Hidden)

```jsx
<ProductCard inventory={8} />
```

Renders:
```
┌─ Product Card ───────────┐
│ Product                   │
│ Inventory Count: 8        │
└─────────────────────────────┘
```

## Integration

Import and use in any React application:

```jsx
import ProductCard from './components/ProductCard';

<ProductCard inventory={anyNumber} />
```

## Testing

Run tests with:

```bash
npm test -- ProductCard.test.jsx
```

Test coverage includes:
- Component rendering
- Badge visibility logic (odd/even)
- Prop acceptance
- CSS class presence
- Badge text content
