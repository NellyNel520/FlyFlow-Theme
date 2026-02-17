# FlyFlow Theme - Support Guide

## Common Issues & Solutions

### Installation Issues

**Shopify CLI not found**
```bash
# Install Shopify CLI globally
npm install -g @shopify/cli @shopify/theme
```

**Node version mismatch**
```bash
# Check your Node version (must be 18+)
node --version

# Use nvm to switch versions
nvm install 18
nvm use 18
```

**Permission errors on install**
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Development Issues

**Theme not connecting to store**
- Verify your store URL: `your-store.myshopify.com`
- Ensure you have Staff access or are a Partner on the store
- Run `shopify auth logout` then `shopify theme dev` to re-authenticate

**Hot reload not working**
- Check that no other Shopify CLI instance is running
- Restart the dev server: kill the process and run `npm run dev` again
- Try a different port: `shopify theme dev --port 9293`

**CSS changes not reflecting**
- Hard refresh: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)
- Clear Shopify CDN cache by saving a theme setting in the customizer
- Check for CSS specificity conflicts

**JavaScript errors in console**
- Check browser dev tools Console tab for specific error messages
- Verify all Liquid objects are outputting valid JSON (use `| json` filter)
- Check for missing DOM elements that scripts depend on

### Dark Mode Issues

**Dark mode not persisting**
- Verify localStorage is not blocked by browser privacy settings
- Check that `dark-mode.js` is loading (Network tab in dev tools)
- Test in an incognito window to rule out extension interference

**Colors wrong in dark mode**
- Inspect element and check which CSS custom property is being used
- Verify the dark mode variables are defined in `:root[data-theme="dark"]`

### Performance Issues

**Slow page load**
- Run Lighthouse audit in Chrome DevTools
- Check for unoptimized images (use Shopify's image CDN with size parameters)
- Verify lazy loading is working on below-fold images
- Check for render-blocking scripts

### Cart Issues

**Ajax cart not updating**
- Check browser console for fetch/API errors
- Verify the Shopify AJAX API endpoint: `/cart.js`
- Check for Content Security Policy blocking requests

---

## FAQs

**Q: Can I use FlyFlow with my existing Shopify store?**
A: Yes. Upload the theme via Shopify Admin > Online Store > Themes > Add Theme.

**Q: Does FlyFlow work with Shopify apps?**
A: Yes. FlyFlow includes app block integration points in all major sections.

**Q: How do I customize colors?**
A: Go to Online Store > Customize > Theme Settings > Colors. All colors are managed through the theme customizer.

**Q: Is FlyFlow compatible with Shopify Markets?**
A: Yes. FlyFlow uses Shopify's built-in translation and currency features.

**Q: How do I enable dark mode?**
A: Dark mode is enabled by default. Users see a toggle in the header. It also respects the system `prefers-color-scheme` setting.

---

## Known Limitations

- 360° product rotation requires a sequence of images uploaded to product media
- Video in product galleries uses Shopify's hosted video or YouTube/Vimeo embeds only
- Predictive search requires Shopify's Search & Discovery app for best results
- Mega menu supports up to 3 levels of nesting
- Filter drawer on mobile supports Shopify's native storefront filtering

---

## Browser Compatibility

| Feature | Chrome 90+ | Firefox 90+ | Safari 15+ | Edge 90+ | iOS Safari 15+ |
|---------|:----------:|:-----------:|:----------:|:--------:|:--------------:|
| Core Layout | Yes | Yes | Yes | Yes | Yes |
| Dark Mode | Yes | Yes | Yes | Yes | Yes |
| CSS Grid | Yes | Yes | Yes | Yes | Yes |
| Lazy Loading | Yes | Yes | Yes | Yes | Yes |
| Pinch-to-Zoom | N/A | N/A | N/A | N/A | Yes |
| Smooth Scroll | Yes | Yes | Yes | Yes | Yes |
| CSS clamp() | Yes | Yes | Yes | Yes | Yes |
| :has() selector | Yes | Yes | Yes | Yes | Yes |

---

## Getting Help

- **GitHub Issues**: Report bugs and request features
- **Documentation**: See the `/documentation` folder for detailed guides
- **Merchant Guide**: See [MERCHANT-GUIDE.md](MERCHANT-GUIDE.md) for non-technical help
