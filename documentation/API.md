# FlyFlow Theme - Shopify API Usage & Integration

## Shopify AJAX API

FlyFlow uses Shopify's AJAX API for dynamic cart operations and predictive search.

### Cart API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/cart.js` | GET | Get current cart state |
| `/cart/add.js` | POST | Add items to cart |
| `/cart/update.js` | POST | Update item quantities |
| `/cart/change.js` | POST | Change a specific line item |
| `/cart/clear.js` | POST | Clear the cart |

### Usage Pattern

```javascript
/**
 * Fetch wrapper for Shopify AJAX API
 * @param {string} endpoint - API endpoint path
 * @param {Object} [body] - Request body for POST requests
 * @returns {Promise<Object>} Parsed JSON response
 */
async function shopifyFetch(endpoint, body = null) {
  const options = {
    method: body ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(endpoint, options);
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

// Add to cart
await shopifyFetch('/cart/add.js', {
  items: [{ id: variantId, quantity: 1 }]
});

// Update quantity
await shopifyFetch('/cart/change.js', {
  id: lineItemKey, // Use line item key, not variant ID
  quantity: newQuantity
});
```

### Predictive Search API

```
GET /search/suggest.json?q={query}&resources[type]=product,collection,page&resources[limit]=6
```

Returns product suggestions with titles, images, prices, and URLs.

## Liquid Objects Reference

### Key Objects Used in FlyFlow

| Object | Usage |
|--------|-------|
| `product` | Product data on product pages |
| `collection` | Collection data and product listing |
| `cart` | Current cart contents and totals |
| `shop` | Store settings and info |
| `settings` | Theme customizer settings |
| `section` | Current section settings and blocks |
| `customer` | Logged-in customer data |
| `request` | Current request/page info |

### Metafield Access

```liquid
<!-- Product metafield -->
{{ product.metafields.custom.size_guide }}

<!-- Variant metafield -->
{{ variant.metafields.custom.swatch_image }}
```

## Section Rendering API

For dynamic section updates without full page reload:

```javascript
/**
 * Fetch a section's HTML via Shopify's Section Rendering API
 * @param {string} sectionId - The section ID to re-render
 * @param {string} [url] - Optional URL context for the section
 * @returns {Promise<string>} Section HTML
 */
async function fetchSection(sectionId, url = window.location.pathname) {
  const response = await fetch(`${url}?sections=${sectionId}`);
  const data = await response.json();
  return data[sectionId];
}
```

## Structured Data (JSON-LD)

FlyFlow outputs JSON-LD for:
- **Product** schema on product pages
- **BreadcrumbList** schema on all pages
- **Organization** schema on the homepage
- **CollectionPage** schema on collection pages

See `snippets/json-ld.liquid` for implementation.
