# FlyFlow Theme

> A high-performance, conversion-optimized Shopify 2.0 theme built for fashion ecommerce brands.

[![Shopify 2.0](https://img.shields.io/badge/Shopify-2.0-7AB55C?style=flat-square)](https://shopify.dev/themes)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-green?style=flat-square)](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Overview

FlyFlow is a mobile-first Shopify theme purpose-built for fashion brands that need speed, accessibility, and conversion-focused features out of the box. It prioritizes Core Web Vitals performance, dark mode support, and a merchant-friendly customization experience.

### Key Features

- **Mobile-First Architecture** — Designed for 375px first, scales to 1920px desktop
- **Dark Mode** — System preference detection + user toggle with localStorage persistence
- **< 2s Mobile Load Time** — Critical CSS inlining, lazy loading, optimized assets
- **Conversion Tools** — Ajax cart, quick buy, urgency indicators, social proof widgets
- **Advanced Product Pages** — Visual swatches, image zoom, 360° rotation, size guides
- **Predictive Search** — Autocomplete with product thumbnails and trending searches
- **Mega Menu** — Visual category cards with promotional spots
- **Faceted Filtering** — Color swatches, size selectors, price sliders with mobile drawer
- **SEO Optimized** — JSON-LD structured data, rich snippets, Open Graph support
- **WCAG 2.1 AA** — Accessible color contrast, keyboard navigation, screen reader support
- **Zero jQuery** — Vanilla JS with < 50KB gzipped bundle

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Shopify CLI](https://shopify.dev/docs/themes/tools/cli) v3+
- A [Shopify Partner account](https://partners.shopify.com/) and development store

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/flyflow-theme.git
cd flyflow-theme

# 2. Install dependencies
npm install

# 3. Connect to your Shopify development store
shopify theme dev --store your-store.myshopify.com

# 4. Open the preview URL in your browser
```

### Development Workflow

```bash
# Start local development server with hot reload
npm run dev

# Lint CSS and JavaScript
npm run lint

# Format code with Prettier
npm run format

# Build for production
npm run build

# Deploy to Shopify
npm run deploy
```

---

## Project Structure

```
flyflow-theme/
├── assets/               # CSS, JS, images, fonts
│   ├── theme.css         # Main stylesheet (CSS custom properties, BEM)
│   ├── theme.js          # Core JS functionality
│   └── dark-mode.js      # Dark mode toggle logic
├── config/               # Theme settings
│   ├── settings_schema.json  # Theme customizer schema
│   └── settings_data.json    # Default settings values
├── layout/               # Base layouts
│   └── theme.liquid      # Main layout wrapper
├── locales/              # Translations
│   └── en.default.json   # English (default)
├── sections/             # Modular theme sections
│   ├── header.liquid
│   ├── footer.liquid
│   ├── mega-menu.liquid
│   ├── product-gallery.liquid
│   └── ...
├── snippets/             # Reusable components
│   ├── product-card.liquid
│   ├── size-guide-modal.liquid
│   └── ...
├── templates/            # Page templates (JSON)
│   ├── index.json
│   ├── product.json
│   ├── collection.json
│   └── customers/        # Customer account templates
├── documentation/        # Detailed docs
├── .github/              # GitHub workflows & templates
├── tests/                # Testing files
├── package.json          # Dependencies & scripts
├── CHANGELOG.md          # Version history
└── README.md             # This file
```

---

## Development

See [documentation/DEVELOPMENT.md](documentation/DEVELOPMENT.md) for full development guidelines.

### Branching Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code only |
| `develop` | Active development |
| `feature/*` | Individual features |
| `fix/*` | Bug fixes |
| `docs/*` | Documentation updates |

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(product-page): add 360° image rotation
fix(mobile): resolve touch navigation issues
docs(readme): update installation instructions
style(dark-mode): improve color contrast ratios
perf(images): implement lazy loading
```

---

## Deployment

See [documentation/DEPLOYMENT.md](documentation/DEPLOYMENT.md) for detailed deployment procedures.

```bash
# Push to development store
shopify theme push --store your-store.myshopify.com

# Push to live theme (use with caution)
shopify theme push --live --store your-store.myshopify.com
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Theme not loading locally | Run `shopify theme dev --store your-store.myshopify.com` and check your store URL |
| CSS not updating | Clear browser cache or hard refresh (Cmd+Shift+R) |
| Shopify CLI errors | Run `shopify version` to verify CLI v3+ is installed |
| Node module issues | Delete `node_modules/` and run `npm install` again |

See [SUPPORT.md](SUPPORT.md) for more troubleshooting tips.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes using conventional commits
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request against `develop`

### Code Standards

- **JavaScript**: ESLint with Prettier formatting, JSDoc for all functions
- **CSS**: BEM naming, Stylelint, mobile-first media queries
- **Liquid**: Descriptive variable names, section/block comments
- **Accessibility**: WCAG 2.1 AA minimum compliance

---

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Last 2 |
| Firefox | Last 2 |
| Safari | Last 2 |
| Edge | Last 2 |
| iOS Safari | Last 2 |
| Chrome Android | Last 2 |

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

## Links

- [Feature Documentation](documentation/FEATURES.md)
- [Customization Guide](documentation/CUSTOMIZATION.md)
- [Performance Guide](documentation/PERFORMANCE.md)
- [Merchant Guide](MERCHANT-GUIDE.md)
- [Support](SUPPORT.md)

---

Built with precision by **Archform Labs**
