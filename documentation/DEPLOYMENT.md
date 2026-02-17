# FlyFlow Theme - Deployment Guide

## Deployment Environments

| Environment | Branch | Purpose |
|------------|--------|---------|
| Development | `develop` | Local dev with `shopify theme dev` |
| Staging | `develop` | Unpublished theme on Shopify store |
| Production | `main` | Live published theme |

## Deployment Steps

### To Development Store (Staging)

```bash
# Push theme to development store as unpublished theme
shopify theme push --store your-store.myshopify.com

# Or push to a specific theme
shopify theme push --theme THEME_ID --store your-store.myshopify.com
```

### To Production (Live)

```bash
# 1. Merge develop into main
git checkout main
git merge develop

# 2. Tag the release
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin main --tags

# 3. Push to live theme (CAUTION: affects live store)
shopify theme push --live --store your-store.myshopify.com
```

## Pre-Deployment Checklist

- [ ] All linting passes (`npm run lint`)
- [ ] Tested on mobile devices (iOS Safari, Chrome Android)
- [ ] Tested on desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Dark mode tested in both states
- [ ] Performance audit passes (Lighthouse > 90)
- [ ] Accessibility audit passes (no critical issues)
- [ ] All images have alt text
- [ ] Meta tags and structured data verified
- [ ] Analytics tracking confirmed
- [ ] Cart and checkout flow tested end-to-end
- [ ] CHANGELOG.md updated
- [ ] Version number bumped in package.json

## Rollback Procedure

If a deployment causes issues:

```bash
# 1. Identify the last working theme version in Shopify Admin
# Online Store > Themes > Theme library > Actions > Publish (on previous version)

# 2. Or revert via Git
git revert HEAD
git push origin main
shopify theme push --live --store your-store.myshopify.com
```

## CI/CD with GitHub Actions

See `.github/workflows/deploy.yml` for automated deployment configuration.

The pipeline runs:
1. Lint check on all PRs
2. Theme check (Shopify's theme linter) on all PRs
3. Auto-deploy to staging on merge to `develop`
4. Manual approval required for production deploy on `main`
