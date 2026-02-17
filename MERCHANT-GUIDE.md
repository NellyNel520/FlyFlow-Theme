# FlyFlow Theme - Merchant Guide

> A non-technical guide for store owners using the FlyFlow theme.

---

## Getting Started

### Accessing the Theme Customizer

1. Log in to your Shopify Admin
2. Go to **Online Store > Themes**
3. Find FlyFlow and click **Customize**
4. Use the left sidebar to navigate sections and settings

### Theme Settings Overview

The customizer is organized into these sections:

| Setting Group | What It Controls |
|--------------|-----------------|
| **Colors** | Brand colors, background, text, accents, dark mode palette |
| **Typography** | Font families, sizes, weights for headings and body |
| **Layout** | Page width, spacing, grid columns |
| **Header** | Logo, navigation style, announcement bar |
| **Footer** | Footer columns, social links, newsletter |
| **Product Pages** | Gallery style, variant display, tabs |
| **Collection Pages** | Grid layout, filter options, badges |
| **Cart** | Cart drawer, upsells, shipping threshold |
| **Social Proof** | Stock indicators, purchase notifications |
| **SEO & Analytics** | Meta defaults, tracking codes |

---

## Dark Mode

FlyFlow includes built-in dark mode support:

- **Automatic**: Detects your customer's system preference
- **Manual Toggle**: Customers can switch using the moon/sun icon in the header
- **Customizable**: Set dark mode colors in Theme Settings > Colors > Dark Mode

**Tip**: Test your product images in both light and dark modes to ensure they look great in both.

---

## Product Pages - Best Practices

### Product Images
- Upload images at **2048x2048px** minimum for zoom functionality
- Use consistent aspect ratios across all products (recommended: 3:4 portrait)
- First image is the hero — make it count
- Add alt text to every image for SEO and accessibility

### Product Descriptions
- Keep the first paragraph concise (appears above the fold)
- Use bullet points for features and specifications
- Include material composition and care instructions
- Add model measurements and size worn for fit reference

### Size Guides
- Upload your size chart under product metafields or use the theme's built-in size guide
- Include measurements in both inches and centimeters
- Add fit notes (e.g., "Runs small — size up")

### Variant Swatches
- Name color variants consistently (e.g., always "Black" not "Jet Black" then "Onyx")
- Upload swatch images for patterns/prints through variant metafields
- Mark sold-out variants clearly — FlyFlow will cross them out automatically

---

## Collection Pages

### Product Badges
FlyFlow automatically shows badges based on:
- **New**: Products created in the last 30 days
- **Sale**: Products with a compare-at price
- **Sold Out**: All variants out of stock
- **Limited Edition**: Tag products with `limited-edition`

### Filtering
- Enable filters in Theme Settings > Collection Pages
- Shopify's Search & Discovery app powers the filter options
- Customers can filter by color, size, price, availability, and more

---

## Image Optimization Tips

1. **Format**: Use JPEG for photos, PNG for graphics with transparency
2. **Size**: Max 2048x2048px — Shopify CDN handles resizing
3. **Compression**: Use tools like TinyPNG before uploading
4. **Alt Text**: Describe the image for SEO (e.g., "Women's black leather jacket front view")
5. **File Names**: Use descriptive names (e.g., `black-leather-jacket-front.jpg`)

---

## SEO Recommendations

### Page Titles
- Keep under 60 characters
- Include primary keyword near the beginning
- Format: `Product Name | Brand Name`

### Meta Descriptions
- Keep between 120-160 characters
- Include a call to action
- Make each page description unique

### URLs
- Use clean, descriptive handles
- Keep URLs short and keyword-rich
- Avoid changing URLs after publishing (breaks links)

### Content
- Write unique product descriptions (avoid manufacturer copy)
- Use heading hierarchy (H1 > H2 > H3)
- Add internal links between related products/collections
- Blog regularly about your fashion niche

---

## Analytics Setup

### Google Analytics 4
1. Go to Theme Settings > Analytics
2. Paste your GA4 Measurement ID (G-XXXXXXXXXX)
3. Enhanced ecommerce events are tracked automatically

### Facebook Pixel
1. Go to Theme Settings > Analytics
2. Paste your Facebook Pixel ID
3. Standard events (PageView, ViewContent, AddToCart, Purchase) fire automatically

---

## Announcement Bar

- Located at the top of every page
- Great for: Free shipping thresholds, sale promotions, new collection launches
- Customize text, colors, and link in Theme Settings > Header > Announcement Bar
- Can auto-rotate multiple messages

---

## Need Help?

- See [SUPPORT.md](SUPPORT.md) for troubleshooting
- Check [documentation/CUSTOMIZATION.md](documentation/CUSTOMIZATION.md) for detailed customization options
