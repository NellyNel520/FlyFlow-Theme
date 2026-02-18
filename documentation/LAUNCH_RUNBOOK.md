# FlyFlow Theme Launch Runbook

## Pre-Launch Gate
1. Verify theme branch is up to date (`develop`).
2. Run checks locally:
   - `npm run format`
   - `npm run build`
   - `shopify theme check`
3. Confirm no blockers in `TASKS.md` under Phase 3.

## Store Config Gate (Shopify Admin)
1. Products imported and published.
2. Inventory assigned at active location.
3. Smart collections exist with handles:
   - `new-arrivals`
   - `best-sellers`
   - `sneakers`
   - `apparel`
   - `accessories`
4. Product options normalized (`Size`, `Color`).
5. Theme setting `Custom swatch color map` includes all current color names.

## UX Regression Gate
1. Product page:
   - Variant switching updates price, stock, and image.
   - Swatches display custom color names correctly.
   - Sticky add-to-cart works on mobile.
2. Collection page:
   - Color/material/style filters return expected products.
   - Sort and pagination work.
   - Quick view variant selection works.
3. Cart:
   - Drawer add/remove/quantity updates are stable.
   - Cart note autosaves in drawer and cart page.
4. Search:
   - Predictive results open/close behavior is stable.
   - Search results pagination works.

## Performance Gate
1. Run Lighthouse on home, collection, product, cart:
   - Mobile + Desktop
2. Target priorities:
   - LCP image sizing
   - CLS from late-loading media/components
   - JS payload from non-critical scripts

## Deployment
1. Push verified code to target theme:
   - Dev theme: `shopify theme push --store flyflow-2.myshopify.com --theme 185609617772`
   - Live theme: `shopify theme push --store flyflow-2.myshopify.com --theme 185609486700 --allow-live`
2. Hard refresh storefront and spot-check critical pages.
3. Tag release commit in git.

## Rollback
1. In Shopify Admin Themes, publish previous known-good theme.
2. Revert recent commit(s) in git and re-push to dev theme.
3. Re-run UX regression gate for critical flows.

## Post-Launch Monitoring (24h)
1. Track checkout conversion and add-to-cart rate.
2. Monitor 404s/search no-result spikes.
3. Validate inventory decrement and variant availability behavior.
4. Capture any swatch/name mismatches and add to swatch map.
