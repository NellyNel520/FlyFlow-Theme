# FlyFlow Theme - Performance Optimization Guide

## Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP (Largest Contentful Paint) | < 2.5s | Core Web Vitals |
| FID (First Input Delay) | < 100ms | Core Web Vitals |
| CLS (Cumulative Layout Shift) | < 0.1 | Core Web Vitals |
| Mobile Load Time | < 2.0s | WebPageTest |
| Desktop Load Time | < 1.5s | WebPageTest |
| JS Bundle Size | < 50KB gzip | Build output |
| Lighthouse Performance | > 90 | Chrome DevTools |

## Optimization Strategies

### Critical CSS Inlining

Above-the-fold styles are inlined in `<head>` to eliminate render-blocking CSS:

```liquid
<!-- layout/theme.liquid -->
<style>
  /* Critical styles for header, hero, above-fold content */
  /* Generated from critical path CSS extraction */
</style>
<link rel="stylesheet" href="{{ 'theme.css' | asset_url }}" media="print" onload="this.media='all'">
```

### Image Optimization

- **Responsive images**: All `<img>` tags use `srcset` and `sizes` attributes
- **Lazy loading**: `loading="lazy"` on all below-fold images
- **Aspect ratios**: Explicit `width` and `height` attributes prevent CLS
- **Format**: Shopify CDN serves WebP automatically when supported
- **Sizing**: Request only the size needed via Shopify's image URL filters

```liquid
{{ image | image_url: width: 800 | image_tag:
  loading: 'lazy',
  widths: '375, 750, 1100, 1500',
  sizes: '(min-width: 1200px) 25vw, (min-width: 768px) 50vw, 100vw'
}}
```

### JavaScript Loading

- Core JS loaded with `defer` attribute
- Non-critical JS loaded dynamically on interaction
- Intersection Observer triggers lazy component initialization
- Event delegation reduces listener count

### Font Loading

- System font stack as default (zero font files to load)
- Optional custom fonts loaded with `font-display: swap`
- Fonts preloaded in `<head>` when used

```html
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

### Reduce Layout Shift

- All images have explicit dimensions
- Font fallback metrics match custom fonts
- Skeleton screens for async-loaded content
- Fixed-size containers for dynamic content

## Testing Performance

### Lighthouse

```bash
# Run via Chrome DevTools > Lighthouse tab
# Or via CLI:
npx lighthouse https://your-store.myshopify.com --view
```

### WebPageTest

1. Go to [webpagetest.org](https://www.webpagetest.org/)
2. Enter your store URL
3. Select "Mobile - Fast 3G" for mobile testing
4. Run test and review waterfall chart

### Real User Monitoring

Enable Google Analytics Web Vitals reporting:
- CrUX (Chrome User Experience Report) data available in Search Console
- GA4 automatically collects Core Web Vitals when configured

## Common Performance Pitfalls

| Issue | Impact | Solution |
|-------|--------|----------|
| Unoptimized images | Slow LCP | Use Shopify image filters with size params |
| Render-blocking CSS | Slow FCP | Inline critical CSS, defer non-critical |
| Third-party scripts | Slow TTI | Load non-essential scripts on interaction |
| Missing image dimensions | CLS | Always set width/height attributes |
| Web fonts | FOUT/FOIT | Use font-display: swap, preload fonts |
| Large DOM | Slow interactions | Minimize nesting, remove hidden elements |
