# FlyFlow Catalog Setup (Phase 2)

## Import Products
1. In Shopify Admin, go to `Products`.
2. Click `Import`.
3. Upload `/Users/DeveloperNel/Archform-Labs/FlyFlow-Theme/documentation/flyflow-product-seed.csv`.
4. Run import and publish all imported products.

This seed is now the primary streetwear set with full variant matrices and image mapping:
- Premium sneakers: multiple sizes and colors
- Hoodies: sizes S/M/L/XL and two colorways
- Joggers: sizes S/M/L and two colorways
- Tees: sizes S/M/L/XL and two colorways
- Accessories: designer crossbody colorways
- Every row includes `Image Src` and `Variant Image` for color-specific media

## Create Smart Collections (Required)
Create these collections as **Automated (Smart)** with condition `Product tag is equal to`:
- `new-arrivals` -> tag `new-arrivals`
- `best-sellers` -> tag `best-sellers`
- `sneakers` -> tag `sneakers`
- `apparel` -> tag `apparel`
- `accessories` -> tag `accessories`

Set collection handles exactly:
- `new-arrivals`
- `best-sellers`
- `sneakers`
- `apparel`
- `accessories`

## Filter Readiness
The CSV seeds tags for filter validation:
- Color tags: `color-onyx`, `color-cloud`, `color-bone`, `color-slate`
- Material tags: `material-cotton`, `material-nylon`, `material-leather`
- Style tags: `style-runner`, `style-oversized`, `style-techwear`, `style-crossbody`

## Next
After import and collection creation, we can run the Phase 2 filter validation pass in-theme.
