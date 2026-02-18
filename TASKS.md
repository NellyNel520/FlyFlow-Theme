# FlyFlow Theme Task Tracker

Last updated: 2026-02-18

## Current Goal
Deliver an elevated, minimalist fashion storefront with premium UX, strong storytelling, and production readiness.

## Spec Audit (from initial brief)

### Homepage
- [x] Announcement bar
- [x] Hero section (image-based, refined visual treatment)
- [x] Featured collections with hover effects
- [x] Lookbook/editorial content sections (`shop-the-look`, `editorial-landing`, `image-with-text`)
- [x] Newsletter section
- [x] Hero video support
- [x] Hero carousel support
- [x] Parallax scrolling support
- [x] Instagram feed integration
- [x] Newsletter popup/slide-in behavior
- [x] Explicit quick-links band (collections/about/contact)

### Product Pages
- [x] High-res gallery with thumbnails/swipe/zoom/fullscreen
- [x] Size guide integration
- [x] Variant swatches
- [x] Complete-the-look / related products
- [x] Stock indicators + urgency behavior
- [x] Quick add from collection cards
- [x] Sticky add-to-cart
- [ ] True 360° media support
- [ ] Reviews app integration (current state: placeholder hook)

### Collection Pages
- [x] Filtering and sort controls
- [x] Quick view modal
- [x] Pagination support
- [ ] Material/style taxonomy filtering validation with real catalog data
- [ ] Masonry layout option
- [ ] Infinite scroll option wiring (setting exists; UX path not finalized)

### Navigation & UX
- [x] Mega menu with image tiles
- [x] Sticky header + cart preview/drawer
- [x] Predictive search with suggestions
- [x] Breadcrumbs
- [x] Mobile-optimized navigation
- [x] Back-to-top control

### Performance & Technical
- [x] Lazy loading patterns
- [x] Mobile-first responsive architecture
- [x] SEO structure + JSON-LD
- [x] Core checks currently passing (`npm run build`, `shopify theme check` warnings only)
- [~] Core Web Vitals optimization (good base; needs final measured QA)
- [~] Multi-currency (Shopify/platform-driven; needs store-level verification)
- [~] Shopify POS compatibility (platform-driven; needs store-level verification)

## Brand Catalog Alignment (FlyFlow vibe)
- [~] Replace off-vibe demo/sample catalog products in Shopify admin with luxe streetwear apparel/shoes/accessories: theme-level masking applied; admin catalog replacement still pending
- [ ] Define canonical collection set (Sneakers, Apparel, Accessories, New Arrivals, Best Sellers)
- [ ] Rebind homepage/featured/upsell sections to FlyFlow-aligned collections
- [ ] Ensure product photography style consistency (editorial, high-contrast, premium)

## Execution Plan (Phased)

### Phase 1: Feature Completion
- [x] Add hero video + optional carousel mode
- [x] Add Instagram feed section
- [x] Add back-to-top control
- [x] Add newsletter popup/slide-in option
- [x] Add quick-links utility section on homepage

### Phase 2: Merchandising & Brand Fit
- [ ] Catalog cleanup in Shopify admin to remove off-vibe products
- [ ] Update section defaults/content copy to FlyFlow tone across templates
- [ ] Validate collection filters against real catalog attributes (size/color/material/style)

### Phase 3: Optimization & Launch Hardening
- [ ] Integrate reviews app block cleanly
- [ ] Final cart/search/product regression pass on mobile + desktop
- [ ] Lighthouse and Core Web Vitals measurement pass
- [ ] Reduce remaining lint/theme warnings where practical
- [ ] Final launch checklist and deployment runbook

## Completed Engineering Work (to date)
- [x] Theme architecture stabilization and build/check pipeline recovery
- [x] Liquid fixes and route hardening
- [x] Predictive search + quick view resilience improvements
- [x] Cart interaction reliability improvements
- [x] Product variant/gallery interaction improvements
- [x] Homepage visual refinement pass
- [x] Added editorial/contact/brand-story templates

## Work Log
- 2026-02-18: Converted tracker to spec-audit + phased roadmap aligned to original project brief.
- 2026-02-18: Added theme-level off-vibe product masking so snowboard items no longer surface in key storefront cards.
- 2026-02-18: Completed Phase 1 UX additions: back-to-top, quick-links homepage utility section, and configurable newsletter popup/slide-in.
- 2026-02-18: Completed remaining Phase 1 homepage features: hero video/carousel/parallax support and new Instagram feed section.
