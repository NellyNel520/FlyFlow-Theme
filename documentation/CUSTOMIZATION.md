# FlyFlow Theme - Customization Guide

## Theme Customizer Settings

All settings are managed through `config/settings_schema.json` and accessible via the Shopify theme customizer.

### Color Settings

| Setting | CSS Variable | Default (Light) | Default (Dark) |
|---------|-------------|-----------------|----------------|
| Primary | `--color-primary` | `#1a1a1a` | `#f5f5f5` |
| Secondary | `--color-secondary` | `#6b7280` | `#9ca3af` |
| Accent | `--color-accent` | `#c8a97e` | `#d4b896` |
| Background | `--color-background` | `#ffffff` | `#0f0f0f` |
| Surface | `--color-surface` | `#f9fafb` | `#1a1a1a` |
| Text Primary | `--color-text` | `#1a1a1a` | `#f5f5f5` |
| Text Secondary | `--color-text-secondary` | `#6b7280` | `#9ca3af` |
| Border | `--color-border` | `#e5e7eb` | `#2d2d2d` |
| Success | `--color-success` | `#10b981` | `#34d399` |
| Error | `--color-error` | `#ef4444` | `#f87171` |
| Sale | `--color-sale` | `#dc2626` | `#f87171` |

### Typography Settings

| Setting | CSS Variable | Default |
|---------|-------------|---------|
| Heading Font | `--font-heading` | System serif stack |
| Body Font | `--font-body` | System sans-serif stack |
| Base Size | `--font-size-base` | `16px` |
| Scale Ratio | `--font-scale` | `1.25` (Major Third) |

### Layout Settings

| Setting | Description | Default |
|---------|-------------|---------|
| Page Width | Max content width | `1440px` |
| Grid Columns | Products per row (desktop) | `4` |
| Section Spacing | Vertical space between sections | `48px` |
| Border Radius | Global border radius | `4px` |

## Customizing Without Code

All visual customizations are available through the theme customizer:

1. **Colors**: Theme Settings > Colors
2. **Fonts**: Theme Settings > Typography
3. **Layout**: Theme Settings > Layout
4. **Header**: Sections > Header
5. **Footer**: Sections > Footer
6. **Product Pages**: Template > Product sections
7. **Collection Pages**: Template > Collection sections

## Customizing With Code

### Adding a New Section

Create a new `.liquid` file in `sections/`:

```liquid
{% comment %}
  FlyFlow Theme - Custom Section
  Purpose: [Description]
  Last modified: YYYY-MM-DD
{% endcomment %}

<section class="custom-section" data-section-id="{{ section.id }}">
  <div class="custom-section__container container">
    {{ section.settings.heading }}
  </div>
</section>

{% schema %}
{
  "name": "Custom Section",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Custom Section"
    }
  ],
  "presets": [
    {
      "name": "Custom Section"
    }
  ]
}
{% endschema %}
```

### Adding CSS Custom Properties

Add new variables to the `:root` block in `assets/theme.css`:

```css
:root {
  --custom-property: value;
}

:root[data-theme="dark"] {
  --custom-property: dark-value;
}
```

### Adding a New Template

Create a JSON template in `templates/`:

```json
{
  "sections": {
    "main": {
      "type": "your-section-name",
      "settings": {}
    }
  },
  "order": ["main"]
}
```
