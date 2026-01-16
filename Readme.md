🌿 Siraba Organic

Global Premium Organic B2C E-Commerce Platform

Siraba Organic is an Indian-origin premium organic food brand focused on delivering world-class certified organic products to global consumers.
This project is a scalable international B2C e-commerce platform built using the MERN stack, starting with flagship products: Kashmiri Saffron (Kesar) and Asafoetida (Hing).

🎯 Project Objectives

Build an international-standard luxury organic brand

Focus on limited SKUs for quality & scalability

Establish trust through certifications & traceability

Enable global direct-to-consumer sales

Create an AI-ready, scalable architecture

🧺 Product Scope (Phase 1)

Kashmiri Saffron (Kesar)

Asafoetida (Hing)

Limited products = stronger brand positioning, easier scaling, better quality control.

👥 Target Audience

International premium consumers

Health-conscious & wellness buyers

Gourmet chefs & luxury food enthusiasts

🧾 Certifications & Trust

Eurofins Laboratory Testing (Germany-based, Gurgaon)

USDA Organic

NPOP

Export-compliant quality & traceability

🎨 Design System
Color Palette (Luxury Organic Theme)
Purpose	Color	Hex
Primary	Deep Forest Green	#0F3D2E
Secondary	Olive / Sage Green	#6B8E6E
Background	Off-White / Ivory	#FAFAF7
Accent	Gold / Saffron	#C9A24D
Text (Primary)	Charcoal Black	#1C1C1C
Text (Secondary)	Muted Gray	#6F6F6F

❌ Avoid neon or bright greens
✅ Use muted, earthy, premium tones

Typography

Headings: Luxury Serif (e.g. Playfair Display / Cormorant)

Body Text: Clean Sans-serif (e.g. Inter / Helvetica Neue)

Large typography, generous line height

Editorial, magazine-style layout

UI / UX Principles

Clean & minimal

High whitespace

Editorial storytelling

Mobile-first

Fast loading

Trust-first product pages


Phase 1: The Core Shopping Flow (Critical)
These are essential for a user to actually buy something.

Product Details Page (PDP)
Why: When a user clicks a product on the Shop page, they need to go here.
Features: Large hero image gallery, rich description (Health Benefits, Origin/Farm info), Ingredients list, "Add to Cart" sticky button, and Related Products.
Cart / Shopping Bag
Why: To review items.
Style: Often a Side Drawer (Slide-over) is more premium than a separate page, allowing users to stay on the shop page.
Checkout
Why: To collect shipping and payment info.
Style: A clean, distraction-free stepped process (Information > Shipping > Payment).
Order Success / Thank You
Why: Confirmation styling is often overlooked but important for reassurance.
Phase 2: User Account & Engagement
Login / Register: Branded authentication pages.
User Dashboard:
Order History: Status of current orders.
Wishlist: For saved premium items (Saffron, etc.).
Addresses: Saved shipping info.
Contact / Support: A dedicated page for customer service or wholesale inquiries (since "Wholesale" is in your footer).
Phase 3: Brand Storytelling (The "Premium" Touch)
The Journal (Blog):
Why: Organic brands rely on education. Articles like "Benefits of Kashmiri Saffron" or "Farm to Table Stories" build trust and SEO.
Recipes Page: Showing how to use the products (e.g., "Saffron Milk Recipe").
Sustainability / Our Farm: A visual-heavy page showing the actual fields, farmers, and organic certification process.

## 📊 Financial Logic Verification

### 1. Manual Order Breakdown (Admin Perspective)
This table breaks down the recent orders to verify the "Total Revenue" and "Admin Balance" calculations.

| Order ID | Status | Gross Sales (GMV) | Refund to User | Delivery/Tax (Retained) | Admin Commission (if applicable) | Vendor Payout | **Net Admin Impact** |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **#a1c6dfc9** | Returned | ₹5,097.46 | -₹4,598.46 | ₹499.00 | ₹194.85 (Reversed) | ₹0.00 | **+₹499.00** |
| **#725a6aff** | Returned | ₹2,031.82 | -₹1,532.82 | ₹499.00 | ₹64.95 (Reversed) | ₹0.00 | **+₹499.00** |
| **Vendor Payout** | Completed | - | - | - | - | -₹600.00 | **-₹600.00** |
| **TOTALS** | | **₹7,129.28** | **-₹6,131.28** | **₹998.00** | | **-₹600.00** | **₹398.00** |

> **Note:** "Gross Sales" includes ALL orders (Start of funnel). "Admin Balance" is the Cash-in-hand after refunds and payouts.

### 2. Admin Dashboard Metrics Verification

| Metric | Dashboard Logic | Calculation Based on Above Data | Result |
| :--- | :--- | :--- | :--- |
| **Total Revenue** | Sum of `totalPrice` for non-cancelled orders | ₹5,097.46 + ₹2,031.82 | **₹7,129.28** |
| **Total Refunds** | Sum of `amount` in `RefundLogs` | ₹4,598.46 + ₹1,532.82 | **₹6,131.28** |
| **Vendor Payouts** | Sum of completed payouts | From transaction history | **₹600.00** |
| **Admin Balance** | Gross Revenue - Refunds - Payouts | ₹7,129.28 - ₹6,131.28 - ₹600.00 | **₹398.00** |

### 3. Vendor Wallet Verification (Vendor Perspective)

| Transaction | Type | Amount | Running Balance (Approx) |
| :--- | :--- | :--- | :--- |
| Item Sold (#a1c6dfc9) | Credit | +₹3,702.15 | ₹3,702.15 |
| Item Sold (#725a6aff) | Credit | +₹1,234.05 | ₹4,936.20 |
| Payout Request | Debit | -₹600.00 | ₹4,336.20 |
| Refund Deduction (#a1c6dfc9) | Debit | -₹3,702.15 | ₹634.05 |
| Refund Deduction (#725a6aff) | Debit | -₹1,234.05 | **-₹600.00** |

> **Result:** The vendor balance ends at **-₹600.00** because they withdrew ₹600 before the refunds were processed, leaving them in debt to the platform.
