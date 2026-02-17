# FlyFlow Theme - Development Guidelines

## Development Workflow

### Starting Development

```bash
# Switch to develop branch
git checkout develop

# Create a feature branch
git checkout -b feature/your-feature-name

# Start the dev server
npm run dev
```

### Code Style

#### JavaScript
- ES6+ syntax (const/let, arrow functions, template literals)
- Vanilla JS only — no jQuery, no heavy frameworks
- JSDoc comments on all exported functions
- Event delegation over direct event binding
- Debounce user input handlers (search, resize, scroll)

#### CSS
- BEM naming: `.block__element--modifier`
- CSS custom properties for all colors, spacing, typography
- Mobile-first media queries using `min-width`
- Logical properties where supported (`margin-inline`, `padding-block`)
- Group related styles with section comments

#### Liquid
- Use meaningful variable names
- Comment section schemas
- Prefer `render` over `include`
- Use `capture` for complex string building

### File Header Template

Every file should include a header comment:

```javascript
/**
 * FlyFlow Theme - [File Name]
 * Purpose: [Brief description]
 * Dependencies: [List dependencies]
 * Last modified: YYYY-MM-DD
 */
```

### Commit Workflow

```bash
# Stage specific files
git add assets/theme.js sections/header.liquid

# Commit with conventional format
git commit -m "feat(header): add mobile hamburger animation"

# Push to your feature branch
git push origin feature/your-feature-name
```

### Pull Request Process

1. Ensure all linting passes: `npm run lint`
2. Test on mobile and desktop
3. Update relevant documentation
4. Create PR against `develop` branch
5. Fill in the PR template
6. Request review

## Architecture Decisions

### Why Vanilla JS?
- Zero dependency overhead (< 50KB gzipped target)
- No framework version conflicts with Shopify apps
- Direct DOM manipulation is fast for our use cases
- Smaller learning curve for theme contributors

### Why CSS Custom Properties over Sass?
- Runtime theming (dark mode toggle without rebuild)
- No build step required for CSS
- Native browser support is excellent
- Reduces tooling complexity

### Why Mobile-First?
- 70%+ of fashion ecommerce traffic is mobile
- Progressive enhancement is more robust than graceful degradation
- Smaller base CSS payload for mobile users
- Forces design discipline
