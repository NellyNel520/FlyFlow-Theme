# FlyFlow Catalog Setup (Phase 2)

## Import Products
1. In Shopify Admin, go to `Products`.
2. Click `Import`.
3. Upload `/Users/DeveloperNel/Archform-Labs/FlyFlow-Theme/documentation/flyflow-product-seed.csv`.
4. Run import and publish all imported products.

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
- Color tags: `color-black`, `color-white`, `color-grey`, `color-olive`, `color-gold`, `color-silver`
- Material tags: `material-cotton`, `material-nylon`, `material-polyester`, `material-leather`, `material-metal`, `material-steel`
- Style tags: `style-runner`, `style-low-top`, `style-oversized`, `style-techwear`, `style-bomber`, `style-crossbody`, `style-aviator`, `style-cap`, `style-chain`

## Next
After import and collection creation, we can run the Phase 2 filter validation pass in-theme.
