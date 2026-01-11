# HSN Code Implementation Guide

## Overview
HSN (Harmonized System of Nomenclature) codes have been added to the product schema for Indian GST compliance. All invoices now display HSN codes for each product.

## What Was Added

### 1. Product Model (`backend/models/Product.js`)
```javascript
hsn: { type: String, default: '0909' }
```
- Field added to Product schema
- Default value: `'0909'` (Spices/Saffron)
- Stored in MongoDB with each product

### 2. Invoice Templates
- Backend PDF template includes HSN column
- Frontend print invoice includes HSN column
- Format: `DESCRIPTION | HSN | QTY | UNIT PRICE | AMOUNT`

## How to Set HSN Codes for Products

### Method 1: Through API (Recommended for Bulk Updates)
Use MongoDB or your admin panel to update products:

```javascript
// Example: Update a single product via API
await client.put('/products/PRODUCT_ID', {
  hsn: '0909'  // Your HSN code
});
```

### Method 2: Direct Database Update
```javascript
// Update all saffron products
db.products.updateMany(
  { category: 'Saffron' },
  { $set: { hsn: '0909' } }
);

// Update specific product
db.products.updateOne(
  { _id: ObjectId('PRODUCT_ID') },
  { $set: { hsn: '0909' } }
);
```

### Method 3: When Creating New Products
When adding new products through your admin dashboard or API, include the HSN field:

```javascript
const newProduct = {
  name: 'Kashmiri Mongra Saffron',
  description: 'Premium quality saffron',
  price: 850,
  category: 'Saffron',
  hsn: '0909',  // Add HSN code here
  // ... other fields
};
```

## Common HSN Codes for Organic Products

| Product Type | HSN Code | Description |
|--------------|----------|-------------|
| Saffron | 0909 | Saffron and other spices |
| Organic Tea | 0902 | Tea, whether or not flavored |
| Organic Coffee | 0901 | Coffee, roasted or not |
| Organic Honey | 0409 | Natural honey |
| Organic Spices | 0909 | Pepper, saffron, and other spices |
| Dried Fruits | 0813 | Dried apricots, prunes, etc. |
| Nuts | 0801-0802 | Various nuts |
| Organic Rice | 1006 | Rice |
| Organic Pulses | 0713 | Dried leguminous vegetables |
| Organic Flour | 1101 | Wheat or meslin flour |
| Herbal Products | 1211 | Plants and parts for medicinal use |

## Updating Existing Products

### Step 1: Identify Products Without HSN
```javascript
// Find products with default HSN
const productsNeedingUpdate = await Product.find({ hsn: '0909' });
```

### Step 2: Categorize by Product Type
Group your products by category and assign appropriate HSN codes.

### Step 3: Bulk Update
```javascript
// Example: Update all tea products
await Product.updateMany(
  { category: 'Tea' },
  { $set: { hsn: '0902' } }
);
```

## Invoice Display

### Before (No HSN):
```
┌──────────────────────┬────┬──────┬────────┐
│ DESCRIPTION          │ QTY│ PRICE│ AMOUNT │
├──────────────────────┼────┼──────┼────────┤
│ Kashmiri Saffron     │ 2  │ ₹850 │ ₹1700  │
└──────────────────────┴────┴──────┴────────┘
```

### After (With HSN):
```
┌──────────────────────┬─────┬────┬──────┬────────┐
│ DESCRIPTION          │ HSN │ QTY│ PRICE│ AMOUNT │
├──────────────────────┼─────┼────┼──────┼────────┤
│ Kashmiri Saffron     │0909 │ 2  │ ₹850 │ ₹1700  │
└──────────────────────┴─────┴────┴──────┴────────┘
```

## GST Compliance

### Why HSN Codes Are Important:
1. **Mandatory Requirement**: Required on tax invoices as per Indian GST law
2. **Tax Classification**: Helps identify the correct GST rate
3. **ITC Claims**: Necessary for Input Tax Credit claims
4. **Audit Trail**: Maintains proper documentation for tax audits

### HSN Code Format:
- **4-digit code**: For businesses with turnover < ₹5 crores
- **6-digit code**: For businesses with turnover ≥ ₹5 crores
- **8-digit code**: For exports (optional)

## Future Product Additions

When adding new products:

1. **Research the HSN code** for your product category
2. **Add it during product creation:**
   ```javascript
   {
     name: "New Organic Product",
     category: "Category",
     hsn: "XXXX",  // ← Add HSN here
     price: 100,
     // ... other fields
   }
   ```

3. **Verify on invoice** - Download an invoice to confirm HSN appears correctly

## API Endpoints

### Get Product (includes HSN):
```
GET /api/products/:id
```

### Update Product HSN:
```
PUT /api/products/:id
Body: { hsn: "0909" }
```

### Create Product (include HSN):
```
POST /api/products
Body: {
  name: "Product Name",
  hsn: "0909",
  // ... other fields
}
```

## Troubleshooting

### HSN Not Showing on Invoice:
1. Check product has HSN field in database
2. Verify invoice template is updated
3. Clear cache and regenerate invoice

### Wrong HSN Code Displayed:
1. Update product in database: `{ hsn: "CORRECT_CODE" }`
2. Regenerate invoice (download new PDF)

### Default 0909 Showing for All Products:
- Products created before HSN implementation will have default '0909'
- Update each product with correct HSN code

## References

- [HSN Code Finder - Government of India](https://www.cbic.gov.in/resources//htdocs-cbec/gst/hsn-code-finder.html)
- [GST Portal HSN Lookup](https://www.gst.gov.in/)

## Support

For questions about:
- **HSN Code Classification**: Consult your CA or tax consultant
- **Implementation Issues**: Check this guide or backend logs
- **Bulk Updates**: Use MongoDB queries or contact development team
