# FlyFlow Theme - Feature Documentation

## Feature Overview

### Conversion Features

| Feature | Description | Location |
|---------|-------------|----------|
| Ajax Cart Drawer | Slide-out cart with live updates | `sections/cart-drawer.liquid` |
| Sticky Add to Cart | Fixed ATC button on scroll | `sections/product-sticky-atc.liquid` |
| Quick Buy | Add to cart from collection grid | `snippets/product-card.liquid` |
| Cart Upsells | Recommended products in cart | `sections/cart-drawer.liquid` |
| Shipping Progress Bar | Visual progress to free shipping | `snippets/shipping-progress.liquid` |
| Countdown Timers | Sale/launch countdown | `snippets/countdown-timer.liquid` |
| Low Stock Indicator | "Only X left" messaging | `snippets/stock-indicator.liquid` |
| Purchase Notifications | Recent purchase social proof | `snippets/purchase-notification.liquid` |
| Recently Viewed | Products the customer has browsed | `sections/recently-viewed.liquid` |

### Product Discovery

| Feature | Description | Location |
|---------|-------------|----------|
| Mega Menu | Visual navigation with images | `sections/mega-menu.liquid` |
| Predictive Search | Autocomplete with thumbnails | `sections/predictive-search.liquid` |
| Faceted Filtering | Color, size, price filtering | `sections/collection-filters.liquid` |
| Quick View Modal | Preview products without leaving page | `snippets/quick-view.liquid` |
| Shop the Look | Hotspot product tagging | `sections/shop-the-look.liquid` |

### Product Page

| Feature | Description | Location |
|---------|-------------|----------|
| Image Zoom | Touch/mouse zoom on images | `sections/product-gallery.liquid` |
| 360° Rotation | Drag-to-rotate product view | `assets/theme.js` |
| Visual Swatches | Color/pattern swatch selectors | `snippets/variant-swatches.liquid` |
| Size Guide Modal | Measurement popup | `snippets/size-guide-modal.liquid` |
| Back-in-Stock | Email signup for sold out items | `snippets/back-in-stock.liquid` |
| Tabbed Content | Description, Reviews, Shipping tabs | `sections/product-tabs.liquid` |

### Technical Features

| Feature | Description | Location |
|---------|-------------|----------|
| Dark Mode | System detection + manual toggle | `assets/dark-mode.js` |
| Lazy Loading | Intersection Observer based | `assets/theme.js` |
| Critical CSS | Inlined above-fold styles | `layout/theme.liquid` |
| JSON-LD | Structured data for SEO | `snippets/json-ld.liquid` |
| GA4 Events | Ecommerce event tracking | `snippets/analytics.liquid` |

---

## Feature Details

### Ajax Cart Drawer

The cart drawer slides in from the right when items are added. It includes:
- Line item quantity adjustment
- Remove item functionality
- Cart note field
- Upsell product recommendations
- Free shipping progress bar
- Trust badges

**Theme Settings**: Cart type (drawer/page), upsell collection, shipping threshold amount.

### Predictive Search

Search triggers after 3 characters and shows:
- Up to 6 product results with thumbnails and prices
- Collection suggestions
- Page suggestions
- Trending searches (configurable)

**Performance**: Debounced at 300ms, results cached in sessionStorage.

### Dark Mode

Implementation uses CSS custom properties with three states:
1. **Auto** — Matches system `prefers-color-scheme`
2. **Light** — Forces light theme
3. **Dark** — Forces dark theme

User preference stored in `localStorage` under `flyflow-theme-preference`.

### Faceted Filtering

Mobile uses a slide-out drawer; desktop uses a sidebar or horizontal bar.
Supports:
- Color swatches (visual circles)
- Size buttons
- Price range slider
- Material checkboxes
- Availability toggle
- Active filter tags with remove buttons
- Result count and "Clear all" action
