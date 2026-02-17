# Changelog

All notable changes to FlyFlow Theme will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Mobile bottom navigation bar (fixed, thumb-friendly, hides on scroll)
- Countdown timer snippet for sales and launches
- Purchase notification social proof pop-ups
- Stock indicator snippet (in stock, low stock, out of stock)
- Shipping progress bar snippet for free shipping threshold
- Gift card template with QR code and Apple Wallet support
- Integrated bottom nav and purchase notifications into theme.liquid

## [0.2.0] - 2026-02-17

### Added
- Complete theme.liquid base layout with dark mode, analytics, CSS custom properties
- Settings schema with full customizer options (colors, typography, layout, cart, product, collection, social proof, analytics)
- All JSON templates: index, product, collection, cart, search, page, blog, article, 404, list-collections
- Customer templates: account, login, register, order, addresses, reset password, activate account
- Header section with mega menu, mobile accordion menu, dark mode toggle
- Footer section with multi-column links and newsletter signup
- Announcement bar section
- Cart drawer with shipping progress, quantity controls, trust badges
- Product gallery with thumbnails, swipe, zoom, fullscreen
- Main product section with variant swatches, stock indicator, sticky ATC, back-in-stock
- Main collection section with filters, sort, grid/list toggle, pagination, mobile filter drawer
- Product tabs (desktop) / accordion (mobile) for description, size guide, reviews, shipping
- Featured collection, related products, recently viewed sections
- Shop the Look section with product hotspots
- Newsletter, blog, article, search, 404, collections list sections
- Product card snippet with badges, hover image, quick buy, color swatches
- Size guide modal with measurements table
- JSON-LD structured data (Product, BreadcrumbList, Organization, CollectionPage)
- Analytics snippet (GA4 + Facebook Pixel with ecommerce events)
- CSS architecture: BEM, custom properties, mobile-first, fluid typography
- JavaScript modules: Cart, Navigation, Search, Gallery, Variants, Filters, LazyLoad, Modal, Accordion, StickyATC, Analytics
- Dark mode with localStorage persistence and system preference detection
- English locale file with comprehensive translation strings
- ESLint, Stylelint, Prettier configuration
- GitHub issue templates (bug report, feature request)

## [0.1.0] - 2026-02-17

### Added
- Project initialization
- Base directory structure following Shopify 2.0 conventions
- Comprehensive README with quick start guide
- Documentation framework (SETUP, FEATURES, CUSTOMIZATION, DEPLOYMENT, PERFORMANCE, ACCESSIBILITY, MOBILE, DARK-MODE, API, TESTING)
- SUPPORT.md with FAQs and troubleshooting
- MERCHANT-GUIDE.md for non-technical store owners
- MIT License
- Package.json with development dependencies and scripts
- .gitignore configured for Shopify theme development
