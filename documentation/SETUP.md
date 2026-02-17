# FlyFlow Theme - Setup Guide

## Prerequisites

| Requirement | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | JavaScript runtime |
| npm | 9+ | Package manager |
| Shopify CLI | 3+ | Theme development tools |
| Git | 2.30+ | Version control |

## Step-by-Step Installation

### 1. Install System Dependencies

```bash
# Install Node.js (via nvm recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Install Shopify CLI
npm install -g @shopify/cli @shopify/theme
```

### 2. Clone the Repository

```bash
git clone https://github.com/your-org/flyflow-theme.git
cd flyflow-theme
```

### 3. Install Project Dependencies

```bash
npm install
```

### 4. Create a Shopify Development Store

1. Log in to [Shopify Partners](https://partners.shopify.com/)
2. Go to Stores > Add Store > Create development store
3. Choose "Create a store to test and build"
4. Name your store and create it

### 5. Connect to Your Store

```bash
# Start the development server
shopify theme dev --store your-store.myshopify.com

# You'll be prompted to authenticate via browser
# After auth, a preview URL will be displayed
```

### 6. Verify Setup

- Open the preview URL in your browser
- You should see the FlyFlow theme loading
- Changes to files will hot-reload automatically

## Environment Configuration

Create a `shopify.theme.toml` file (gitignored) for your local config:

```toml
[environments.development]
store = "your-store.myshopify.com"
```

## Editor Setup

### VS Code (Recommended)

Install these extensions:
- **Shopify Liquid** — Liquid syntax highlighting and snippets
- **ESLint** — JavaScript linting
- **Stylelint** — CSS linting
- **Prettier** — Code formatting

### Recommended VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[liquid]": {
    "editor.defaultFormatter": "Shopify.theme-check-vscode"
  }
}
```

## Next Steps

- Read [DEVELOPMENT.md](DEVELOPMENT.md) for development workflows
- Read [FEATURES.md](FEATURES.md) for feature documentation
- Read [CUSTOMIZATION.md](CUSTOMIZATION.md) for theme customization options
