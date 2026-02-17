# FlyFlow Theme - Mobile Implementation Guide

## Mobile-First Philosophy

FlyFlow is designed for 375px screens first, then progressively enhanced for larger viewports. Over 70% of fashion ecommerce traffic comes from mobile devices.

## Breakpoint System

```css
/* Mobile-first breakpoints (min-width) */
--breakpoint-sm: 640px;   /* Large phones / small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small desktops / landscape tablets */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1440px; /* Large desktops */
```

Usage:
```css
/* Base: mobile styles */
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## Mobile-Specific Components

### Bottom Navigation Bar
- Fixed to bottom of viewport on mobile
- Contains: Home, Search, Collections, Cart, Account
- 44px minimum touch targets
- Hides on scroll down, reveals on scroll up
- Disabled on desktop via `display: none` at `min-width: 1024px`

### Swipe Gestures
- Product gallery: horizontal swipe between images
- Filter drawer: swipe left to close
- Cart drawer: swipe right to close
- Implementation uses touch events with velocity detection

### Accordion Menus
- Navigation converts from mega menu to accordion on mobile
- Product page tabs convert to accordion sections
- Smooth open/close animations

### Mobile Filter Drawer
- Full-height slide-out drawer from left
- Grouped filter options with collapsible sections
- Apply/Clear buttons fixed at bottom
- Result count updates as filters are selected
- Body scroll locked when drawer is open

## Touch Optimizations

### Touch Targets
```css
/* All interactive elements */
.btn, a, input, select, textarea,
[role="button"], [tabindex] {
  min-height: 44px;
  min-width: 44px;
}

/* Variant swatches */
.swatch {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
```

### Tap Highlight
```css
/* Remove default tap highlight */
* {
  -webkit-tap-highlight-color: transparent;
}

/* Add custom active states */
.btn:active {
  transform: scale(0.98);
}
```

### Pinch-to-Zoom
Product images support native pinch-to-zoom on mobile using CSS `touch-action: pinch-zoom` and a JS zoom handler for the custom gallery.

## Mobile Performance

### Critical Considerations
- Images: serve 375w and 750w (for retina) via `srcset`
- Fonts: use system font stack on mobile, defer custom fonts
- JS: lazy-init components below the fold
- CSS: inline critical styles, defer full stylesheet
- Third-party scripts: load on user interaction only

### Connection-Aware Loading
```javascript
if (navigator.connection) {
  const { effectiveType } = navigator.connection;
  if (effectiveType === '2g' || effectiveType === 'slow-2g') {
    // Disable autoplay, reduce image quality, skip animations
  }
}
```

## Testing

### Devices to Test

| Device | Screen | Priority |
|--------|--------|----------|
| iPhone 14/15 | 390x844 | High |
| iPhone SE | 375x667 | High |
| Samsung Galaxy S23 | 360x780 | High |
| iPad | 768x1024 | Medium |
| iPad Pro | 1024x1366 | Medium |

### Chrome DevTools Mobile Testing
1. Open DevTools (F12)
2. Toggle device toolbar (Cmd+Shift+M)
3. Select a device or set custom dimensions
4. Throttle network to "Fast 3G" for realistic testing
5. Throttle CPU to 4x slowdown for performance testing
