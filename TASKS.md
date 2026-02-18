# FlyFlow Theme Task Tracker

Last updated: 2026-02-18

## Current Goal
Ship a production-ready Shopify theme with stable structure, complete core flows, and clear release documentation.

## In Progress
- [ ] Build out remaining full-site layout/content structure for launch-ready presentation
- [ ] Complete functionality polish on product, search, cart, and mobile flows

## Completed
- [x] Restore local build tooling (Node/ICU linkage) and unblock project commands
- [x] Fix invalid section nesting by converting product gallery usage to snippet render
- [x] Add `snippets/product-gallery.liquid` and wire from `sections/main-product.liquid`
- [x] Add ESLint v9 flat config (`eslint.config.js`)
- [x] Align lint/style configs with current codebase baseline
- [x] Fix Theme Check errors in `snippets/quick-view.liquid` and `templates/gift_card.liquid`
- [x] Add missing gift card locale key in `locales/en.default.json`
- [x] Replace hardcoded routes with Shopify `routes.*` objects in key sections/snippets
- [x] Reach passing checks: `npm run build` and `shopify theme check` (warnings only)
- [x] Add reusable `editorial-landing` section and wire it into homepage template flow
- [x] Add `templates/page.editorial.json` for structured storytelling/brand pages
- [x] Add `sections/main-contact.liquid` and `templates/page.contact.json`
- [x] Add `templates/page.brand-story.json` using modular narrative sections

## Next Up (Priority Order)
- [ ] Continue expanding strategic page templates (campaign, lookbook, landing variants)
- [ ] Harden predictive search and quick view UX edge cases
- [ ] Validate cart drawer/cart page behavior against manual QA checklist
- [ ] Reduce remaining warnings (analytics remote assets + JS lint debt)
- [ ] Final pre-release QA pass and deployment checklist

## Work Log
- 2026-02-18: Session resumed from timeout; stabilized theme architecture and CI-quality checks.
- 2026-02-18: Added editorial landing section and inserted it after hero in `templates/index.json`.
- 2026-02-18: Added a dedicated editorial page template with hero, narrative block, and newsletter CTA.
- 2026-02-18: Added dedicated contact and brand-story templates, including a new main contact section with Shopify form handling.
