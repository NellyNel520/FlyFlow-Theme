# FlyFlow Theme - Accessibility Guidelines

## Compliance Target

**WCAG 2.1 Level AA** — All features must meet this standard minimum.

## Core Requirements

### Color & Contrast
- Text contrast ratio: minimum 4.5:1 (AA) — target 7:1 (AAA)
- Large text (18px+ bold, 24px+ regular): minimum 3:1
- UI components and graphics: minimum 3:1
- Dark mode colors independently tested for contrast compliance
- Never use color alone to convey information

### Keyboard Navigation
- All interactive elements reachable via Tab key
- Visible focus indicators on all focusable elements
- Focus trap in modals (cart drawer, size guide, quick view)
- Escape key closes all modals and drawers
- Skip-to-content link as first focusable element
- Logical tab order matches visual order

### Screen Readers
- Semantic HTML5 elements (`<nav>`, `<main>`, `<article>`, `<aside>`)
- ARIA labels on icon-only buttons
- ARIA live regions for dynamic content (cart updates, search results)
- Meaningful alt text on all images
- Hidden decorative images (`aria-hidden="true"` or empty alt)
- Form labels associated with inputs

### Touch Targets
- Minimum 44x44px touch target size (WCAG 2.5.5)
- Adequate spacing between targets (minimum 8px)
- No hover-only interactions on mobile

### Motion & Animation
- Respect `prefers-reduced-motion` media query
- No auto-playing animations longer than 5 seconds
- Provide pause/stop controls for animated content
- Smooth scrolling disabled when reduced motion preferred

## Implementation Patterns

### Focus Management

```css
/* Visible focus indicator */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Remove default outline only when using mouse */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Screen Reader Only Text

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### ARIA Live Regions

```html
<!-- Cart count updates -->
<span aria-live="polite" aria-atomic="true" class="sr-only">
  {{ cart.item_count }} items in cart
</span>
```

## Testing Tools

| Tool | Purpose | Link |
|------|---------|------|
| axe DevTools | Automated a11y testing | Chrome extension |
| WAVE | Visual a11y evaluation | wave.webaim.org |
| Lighthouse | Accessibility audit | Chrome DevTools |
| NVDA | Screen reader testing (Windows) | nvaccess.org |
| VoiceOver | Screen reader testing (Mac/iOS) | Built into macOS |
| Color Contrast Checker | Verify contrast ratios | webaim.org/resources/contrastchecker |

## Testing Checklist

- [ ] All pages pass axe DevTools with zero critical issues
- [ ] Full keyboard navigation works (Tab, Enter, Escape, Arrow keys)
- [ ] Screen reader announces all content meaningfully
- [ ] Color contrast passes AA for all text and UI elements
- [ ] Dark mode passes same contrast requirements
- [ ] All form fields have visible labels
- [ ] Error messages are announced to screen readers
- [ ] Images have descriptive alt text
- [ ] Videos have captions or transcripts
- [ ] Animations respect reduced-motion preference
- [ ] Touch targets meet 44x44px minimum
- [ ] Skip-to-content link works correctly
- [ ] Modal focus trapping works correctly
- [ ] Language attribute set on `<html>` element
