# FlyFlow Theme - Dark Mode Implementation Guide

## Architecture

Dark mode uses CSS custom properties with a `data-theme` attribute on `<html>`:

```html
<html data-theme="light"> <!-- or "dark" -->
```

## Color System

### Light Mode (Default)

```css
:root {
  --color-background: #ffffff;
  --color-surface: #f9fafb;
  --color-text: #1a1a1a;
  --color-text-secondary: #6b7280;
  --color-border: #e5e7eb;
  --color-primary: #1a1a1a;
  --color-accent: #c8a97e;
}
```

### Dark Mode

```css
:root[data-theme="dark"] {
  --color-background: #0f0f0f;
  --color-surface: #1a1a1a;
  --color-text: #f5f5f5;
  --color-text-secondary: #9ca3af;
  --color-border: #2d2d2d;
  --color-primary: #f5f5f5;
  --color-accent: #d4b896;
}
```

## JavaScript Logic

### Initialization Flow

1. Check `localStorage` for saved preference
2. If no saved preference, check `prefers-color-scheme` media query
3. Apply the determined theme
4. Set up event listeners for toggle button and system changes

### Toggle Behavior

```
User clicks toggle:
  → Current theme is "light"? Switch to "dark"
  → Current theme is "dark"? Switch to "light"
  → Save preference to localStorage
  → Update data-theme attribute
  → Update toggle icon (sun ↔ moon)
  → Announce change to screen readers
```

### System Preference Sync

When the user hasn't set a manual preference, the theme follows the OS setting:

```javascript
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    if (!localStorage.getItem('flyflow-theme-preference')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
```

## Transition

Smooth transition between modes:

```css
:root {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

Use `prefers-reduced-motion` to disable transitions for users who prefer it:

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    transition: none;
  }
}
```

## Image Considerations

Product images work in both modes by default. For cases where images need adjustment:

```css
:root[data-theme="dark"] .product-image {
  /* Slight brightness reduction for very bright product photos */
  filter: brightness(0.95);
}
```

## Theme Customizer Integration

Merchants can customize dark mode colors through:
- Theme Settings > Colors > Dark Mode section
- Each color has a light and dark variant
- Preview updates in real-time in the customizer

## Testing Checklist

- [ ] Toggle switches between light and dark correctly
- [ ] Preference persists across page reloads (localStorage)
- [ ] System preference is detected on first visit
- [ ] System preference changes are reflected when no manual override
- [ ] All text meets contrast requirements in both modes
- [ ] Product images display well in both modes
- [ ] Form elements are visible in both modes
- [ ] Focus indicators are visible in both modes
- [ ] Transition is smooth (and disabled for reduced-motion)
- [ ] Toggle icon updates correctly (sun/moon)
- [ ] Screen reader announces theme change
