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
- [x] Reviews app integration (OS 2.0 app block-ready with fallback)

### Collection Pages
- [x] Filtering and sort controls
- [x] Quick view modal
- [x] Pagination support
- [x] Material/style taxonomy filtering validation with real catalog data
- [x] Masonry layout option
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
- [x] Define canonical collection set (Sneakers, Apparel, Accessories, New Arrivals, Best Sellers)
- [x] Rebind homepage/featured/upsell sections to FlyFlow-aligned collections
- [ ] Ensure product photography style consistency (editorial, high-contrast, premium)

## Execution Plan (Phased)

### Phase 1: Feature Completion
- [x] Add hero video + optional carousel mode
- [x] Add Instagram feed section
- [x] Add back-to-top control
- [x] Add newsletter popup/slide-in option
- [x] Add quick-links utility section on homepage

### Phase 2: Merchandising & Brand Fit
- [x] Catalog cleanup in Shopify admin to remove off-vibe products
- [x] Update section defaults/content copy to FlyFlow tone across templates
- [x] Validate collection filters against real catalog attributes (size/color/material/style)
- [x] Generate import-ready starter catalog seed (luxe streetwear)
- [x] Upgrade seed to full streetwear variant matrix (sizes + colorways)

### Phase 3: Optimization & Launch Hardening
- [x] Convert product template to required OS 2.0 block architecture (vendor/title/price/variant picker/quantity/buy buttons/description)
- [x] Add dynamic checkout button support on product
- [x] Add additional checkout buttons support on cart page/drawer
- [x] Add required `custom-liquid` section
- [x] Integrate reviews app block cleanly
- [ ] Final cart/search/product regression pass on mobile + desktop
- [ ] Lighthouse and Core Web Vitals measurement pass
- [x] Reduce remaining lint/theme warnings where practical
- [x] Final launch checklist and deployment runbook

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
- 2026-02-18: Phase 2 in-theme merchandising pass completed: canonical collection handles applied (`new-arrivals`, `best-sellers`, `sneakers`, `apparel`, `accessories`) and homepage/editorial/cart defaults rebound to these collections.
- 2026-02-18: Added Shopify import assets for fresh FlyFlow catalog seeding: `documentation/flyflow-product-seed.csv` and `documentation/CATALOG_SETUP.md`.
- 2026-02-18: Replaced seed catalog with designer streetwear-focused assortment and full size/color variant matrices (sneakers, hoodies, joggers, tees, accessories); aligned collection color swatch handling for Onyx/Cloud/Bone/Slate tones.
- 2026-02-18: Upgraded seed CSV to include Shopify image fields (`Image Src`, `Variant Image`) with per-color media URLs and explicit per-variant inventory quantities across size/color options.
- 2026-02-18: Expanded seed to a full stress-test catalog: 18 streetwear products and 114 variants (graphic tees, shorts, pants, sweatsuit, hoodies, sneakers, purses, hats, beanies) with media mapping and filter tags.
- 2026-02-18: Applied demo-ready swatch mapping palette in live theme settings to support custom color names without manual setup.
- 2026-02-18: Completed Phase 2 validation pass with live catalog data; hardened collection color filter detection to support `Color`/`Colour` and case variants.
- 2026-02-18: Completed Phase 3 reviews integration wiring: product tabs now support OS 2.0 app blocks for reviews with graceful fallback messaging and default template reviews tab enabled.
- 2026-02-18: Added launch playbook document: `documentation/LAUNCH_RUNBOOK.md` covering pre-launch gates, UX regression checklist, deployment commands, rollback, and post-launch monitoring.
- 2026-02-18: Completed JS lint cleanup pass (`assets/theme.js`, `assets/dark-mode.js`) and pushed commit `93b272d`; synced latest theme to live store.
- 2026-02-18: Theme Check reduced to 2 expected `RemoteAsset` warnings in analytics snippets (GA4/Facebook pixel URLs); no actionable Liquid offenses remain.
- 2026-02-18: Implemented functional collection view modes (grid/list/masonry) with persisted preference and section-level default view setting.
- 2026-02-18: Fixed add-to-cart reliability by refreshing full cart drawer section state (empty/non-empty transitions) and scoping PDP variant updates to the product section only.
- 2026-02-18: Hardened add-to-cart requests across PDP/sticky/quick-view/quick-buy with FormData submission support and native `/cart/add` fallback redirect when AJAX add fails.
- 2026-02-18: Unified mobile bottom nav with header mobile menu source, improved bottom-nav reappearance behavior during downward scroll, and parallelized cart refresh API calls to reduce update latency.
- 2026-02-18: Added native POST `/cart/add` fail-safe fallback in cart JS so add-to-cart always completes even if AJAX path fails.
- 2026-02-18: Completed About page fallback build in `main-page.liquid` for `/pages/about` with finished FlyFlow brand story layout, pillars, and CTAs (no template reassignment required).
- 2026-02-18: Shopify approval-readiness structural pass: rebuilt `main-product.liquid` as block-based OS 2.0 section with required product information blocks + `@app` support, updated `templates/product.json` block order, added `sections/custom-liquid.liquid`, added `content_for_additional_checkout_buttons` on cart page/drawer, and resolved remaining hardcoded route warning in `main-page.liquid`.
- 2026-02-18: Approval hardening cleanup: removed simulated purchase-notification rendering from `layout/theme.liquid` and removed Social Proof settings group from `config/settings_schema.json` to avoid deceptive/demo behavior in submission builds.
- 2026-02-18: Added premium social/rating feature set: global floating social rail (`snippets/floating-social-rail.liquid` + `assets/floating-social-rail.css` + `assets/social-ui.js`), PDP native share row (`snippets/product-share.liquid`), and upgraded PDP star rating block with app-safe source selection + SVG partial-fill stars (`sections/main-product.liquid`, `config/settings_schema.json`, `templates/product.json`, `layout/theme.liquid`).
- 2026-02-18: Social UI refinement pass: removed circular chrome from floating rail icons, increased icon scale with motion hover treatment, replaced desktop PDP share row with share-trigger modal (icons + copy-link), and kept mobile inline share actions for fast access.
- 2026-02-18: Enhanced desktop share modal motion quality: smooth backdrop fade, eased dialog rise/scale, and staggered share-action entrance with reduced-motion safeguards.
- 2026-02-18: Corrected share UX breakpoint logic: share modal trigger now small-screen only (<750px) and full inline share links are shown on medium+ screens.
- 2026-02-18: Refined PDP share responsiveness: standard mobile now shows full inline share icons, modal fallback only on ultra-small screens (<390px) with explicit "Share" trigger text; removed main-product description block from template flow and increased share-area spacing.
- 2026-02-18: Styled PDP description content as a premium card inside Product Tabs/accordion with luxe spacing, rounded corners, subtle border, and soft elevation.
- 2026-02-18: Styled PDP purchase controls (variant picker, quantity, buy buttons) as premium rounded cards with subtle gradient/surface, softer border/elevation, and improved control spacing for a sleeker modern look.
- 2026-02-18: Consolidated PDP purchase controls into a single bordered purchase panel wrapper (variants + quantity + buy buttons) and removed per-block border treatment.
- 2026-02-18: Increased vertical spacing inside single PDP purchase panel between variant picker, quantity selector, and buy buttons to reduce visual clutter.
- 2026-02-18: Added extra bottom spacing below PDP buy-buttons block (including Buy It Now area) to reduce crowding under checkout actions.
- 2026-02-18: Rounded PDP size option cards with 12px radius to match premium control styling.
- 2026-02-18: Tightened PDP main-to-tabs vertical spacing with product-page scoped section spacing, redesigned tabs/panels to compact premium card layout, and added toggleable compact reviews placeholder (`show_reviews_placeholder`) to avoid large empty no-app review areas.
- 2026-02-18: Changed PDP details/tabs styling from per-panel rounded cards to a single rounded parent frame (`product-tabs__frame`) with unified border/background and simplified inner panel styling.
- 2026-02-18: Replaced PDP static details row with fully functional ARIA product tabs in `main-product` (Details/Size Guide/Reviews/Shipping), including keyboard navigation, URL hash sync, responsive tabs/accordion style setting, size-guide table/page fallback logic, and compact reviews fallback with app-block rendering in the Reviews panel.
