# FlyFlow Catalog Setup (Phase 2)

## Import Products
1. In Shopify Admin, go to `Products`.
2. Click `Import`.
3. Upload `/Users/DeveloperNel/Archform-Labs/FlyFlow-Theme/documentation/flyflow-product-seed.csv`.
4. Run import and publish all imported products.

This seed is now the primary streetwear test catalog with full variant matrices and image mapping:
- 18 products across sneakers, graphic tees, hoodies, shorts, pants, sweatsuit, purses, hats, and beanies
- 114 total variants to stress-test theme capacity
- Full size runs where applicable (S-XL or US 8-11)
- Multiple colorways per product, including Butter, Onyx, Cloud, Bone, Slate, and Olive
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
- Color tags: `color-onyx`, `color-cloud`, `color-bone`, `color-slate`, `color-butter`, `color-olive`
- Material tags: `material-cotton`, `material-nylon`, `material-leather`, `material-knit`
- Style tags: `style-runner`, `style-low-top`, `style-techwear`, `style-graphic`, `style-oversized`, `style-relaxed`, `style-crossbody`, `style-shoulder-bag`, `style-tote`, `style-cap`, `style-beanie`

## Next
After import and collection creation, we can run the Phase 2 filter validation pass in-theme.
