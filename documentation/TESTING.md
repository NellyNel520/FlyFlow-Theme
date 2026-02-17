# FlyFlow Theme - Testing & Quality Assurance

## Manual Testing Checklist

### Core Functionality
- [ ] Homepage loads correctly with all sections
- [ ] Navigation works on mobile and desktop
- [ ] Search returns relevant results
- [ ] Product pages display all information correctly
- [ ] Variant selection updates image, price, and availability
- [ ] Add to cart works and cart drawer opens
- [ ] Cart quantity update and remove work
- [ ] Collection pages display products with correct filtering
- [ ] Pagination or load-more works
- [ ] Customer login/register/account pages work
- [ ] 404 page displays correctly

### Dark Mode
- [ ] Toggle switches theme correctly
- [ ] Preference persists on reload
- [ ] All pages look correct in dark mode
- [ ] Text is readable in both modes
- [ ] Images display properly in dark mode

### Mobile
- [ ] Bottom navigation is visible and functional
- [ ] Swipe gestures work on product gallery
- [ ] Filter drawer opens and closes correctly
- [ ] Accordion menus work
- [ ] Touch targets are large enough
- [ ] No horizontal scroll on any page

### Cart & Checkout
- [ ] Products can be added from collection and product pages
- [ ] Cart drawer updates in real-time
- [ ] Quantity can be increased/decreased
- [ ] Items can be removed
- [ ] Cart totals are accurate
- [ ] Free shipping progress bar updates
- [ ] Checkout link works

### Performance
- [ ] Lighthouse Performance score > 90
- [ ] LCP < 2.5s on mobile (Fast 3G)
- [ ] No CLS issues visible
- [ ] Images lazy load correctly
- [ ] No render-blocking resources

### Accessibility
- [ ] Full keyboard navigation works
- [ ] Screen reader announces content correctly
- [ ] Focus indicators are visible
- [ ] Color contrast passes AA
- [ ] Skip-to-content link works
- [ ] Modals trap focus correctly

## Browser Testing Matrix

| Test | Chrome | Firefox | Safari | Edge | iOS Safari | Android Chrome |
|------|:------:|:-------:|:------:|:----:|:----------:|:-------------:|
| Layout | | | | | | |
| Navigation | | | | | | |
| Search | | | | | | |
| Cart | | | | | | |
| Dark Mode | | | | | | |
| Animations | | | | | | |
| Forms | | | | | | |

## Performance Testing

### Lighthouse Audit
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select: Performance, Accessibility, Best Practices, SEO
4. Choose "Mobile" device
5. Click "Analyze page load"
6. Target: all scores > 90

### WebPageTest
1. Visit webpagetest.org
2. Test URL: your store URL
3. Test location: closest to target market
4. Connection: Fast 3G (mobile), Cable (desktop)
5. Review: waterfall, filmstrip, metrics

## Accessibility Testing

### Automated Tools
1. **axe DevTools**: Run on every page, fix all critical/serious issues
2. **WAVE**: Visual overlay shows accessibility issues
3. **Lighthouse A11y**: Part of Lighthouse audit

### Manual Testing
1. **Keyboard only**: Navigate entire site using only keyboard
2. **Screen reader**: Test with VoiceOver (Mac) or NVDA (Windows)
3. **Zoom**: Test at 200% and 400% zoom levels
4. **Reduced motion**: Enable in OS settings and verify animations stop

## Load Testing

For stores expecting high traffic:
1. Use tools like k6 or Artillery for load testing
2. Test the storefront, not the admin
3. Focus on: homepage, collection pages, product pages, cart operations
4. Target: response time < 500ms at expected concurrent users
