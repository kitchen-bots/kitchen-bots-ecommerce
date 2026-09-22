# API Consumer Inventory: Storefront and Dashboard

**Date:** 2026-09-22  
**Status:** Canonical Baseline Inventory  
**Target Applications:**
- Kitchen Bots Storefront (`kitchen-bots-ecommerce`)
- Kitchen Bots Operations Dashboard (`kitchen-bots-dashboard`)

---

## Executive Summary and Repository Boundaries

This inventory establishes the technical baseline for Phase 03 commerce integration across the Kitchen Bots storefront and operations dashboard. It inventories every consumer, call site, data dependency, state machine, and authorization expectation for the core API surface:

1. `GET /v1/catalog/products` (Public catalog list)
2. `GET /v1/catalog/products/:slug` (Public catalog item detail)
3. `POST /v1/enquiries` (Public lead and quote enquiry submission)
4. `POST /v1/orders` (Authenticated direct purchase placement)
5. `Firebase Auth` (Customer and staff identity, session, and claims)

### Boundary Rules and Evidence Standard
- **Confirmed Code Fact:** Refers exclusively to existing, verified source code statements, files, line numbers, data structures, and current behaviors in the repository worktrees.
- **Proposed Contract Field:** Refers to the canonical target schema, endpoint parameters, and payloads specified by `docs/MASTER_PLAN.md`, `docs/phases/01-firebase-worker-and-security.md`, and `docs/phases/03-commerce-integration.md`.
- **Currency Convention:** Storefront UI code currently renders numbers in INR rupees (`price: 18000`). Canonical backend schemas define currency values strictly as non-negative integer paise (`price: 1800000` paise = INR 18,000.00).
- **Price Authority:** In accordance with development rules, browser code must never supply authoritative prices, order totals, publication status, ownership, or roles. The Cloudflare Worker recalculates all financial totals server-side from Cloud Firestore.

---

## 1. GET /v1/catalog/products

### 1.1 Storefront Call Sites and Consumers

1. **`src/pages/ProductsPage.tsx` (Lines 3, 41-46, 114-153)**
   - **Current Mechanism:** Synchronous filter over static `PRODUCTS` array imported from `src/data/products.ts`.
   - **Filter Parameters in Use:**
     - Category: `activeCategory` state synced to URL query parameter `?category=<category>`.
     - Text Search: `searchQuery` state synced to URL query parameter `?q=<query>`, matched against `name`, `description`, `category`, and `features`.
   - **Fields Consumed:** `id`, `name`, `description`, `category`, `features`, `price`, `image`.
   - **Child Interactions:** Calls `onProductClick(product.id)` for navigation and `addToCart({ id, name, price, image })`.

2. **`src/sections/ProductFleetSection.tsx` (Lines 4, 13, 41-68)**
   - **Current Mechanism:** Static filter `PRODUCTS.filter(product => product.featured).slice(0, 4)`. Rendered directly on the Home page (`src/App.tsx:158-162`).
   - **Fields Consumed:** `id`, `name`, `description`, `price`, `image`, `featured`.

3. **`src/components/Navigation.tsx` (Lines 5, 17, 114-124, 190-194)**
   - **Current Mechanism:** Derives dynamic navigation categories via `['All', ...new Set(PRODUCTS.map(product => product.category))]`.
   - **Usage:** Populates category selectors in the desktop dropdown menu and mobile navigation drawer.

4. **`src/components/CategorySection.tsx` (Lines 2, 57)**
   - **Current Mechanism:** Resolves category showcase banner images using `PRODUCTS.find(product => product.category === operation.category)?.image`.

5. **`src/pages/WishlistPage.tsx` (Lines 2, 19, 57-75)**
   - **Current Mechanism:** Resolves saved item IDs stored in `localStorage` by filtering `PRODUCTS.filter(p => wishlist.includes(p.id))`.
   - **Fields Consumed:** `id`, `name`, `price`, `image`.

6. **`src/sections/ProductCarousel.tsx` (Lines 7, 11, 41-75)**
   - **Current Mechanism:** Auxiliary component filtering `PRODUCTS.filter(p => p.featured).slice(0, 6)`.
   - **Fields Consumed:** `id`, `name`, `price`, `image`, `category`, `tag`, `rating`.

### 1.2 Dashboard Call Sites and Consumers

1. **`src/dashboard/pages/admin/ProductsManagement.tsx` (Lines 5, 23, 31-35)**
   - **Current Mechanism:** Calls `useProducts({ search: searchQuery })` from `src/dashboard/hooks/queries.ts:11-16`.
   - **Backing Implementation:** `CommerceProductService.getProducts(params)` in `src/dashboard/services/commerce/ProductService.ts:204-230` (in-memory mock array).
   - **Fields Consumed:** `id`, `sku`, `name`, `category`, `status`, `visibility`, `isFeatured`, `images`, `variants`, `createdAt`, `updatedAt`.

2. **`src/dashboard/pages/customer/ProductManagement.tsx` (Lines 16, 48-52)**
   - **Current Mechanism:** Calls `productService.getProducts()` from `src/dashboard/services/productService.ts:8-10`.
   - **Backing Implementation:** `productsApi.getProducts(params)` in `src/dashboard/api/products.api.ts:17-39` (legacy Google Apps Script adapter `api.request({ module: 'products', action: 'getAll' })`).
   - **Fields Consumed:** `id`, `name`, `category`, `price`, `stock`, `status`, `sku`, `image`.

3. **`src/dashboard/pages/customer/AddOrder.tsx` (Lines 16, 55-60)**
   - **Current Mechanism:** Calls `productService.getProducts()` to populate product selection options when creating a manual order.
   - **Fields Consumed:** `id`, `name`, `price`.

### 1.3 Required Request Fields

- **Confirmed Code Facts (Current Usage):**
  - Storefront: Reads query parameters `category` (string) and `q` (string search term).
  - Dashboard TanStack Hook: Accepts `{ search?: string, category?: string, status?: string, page?: number, limit?: number }`.
- **Proposed Contract Fields (`GET /v1/catalog/products`):**
  - HTTP Method: `GET`
  - Headers: `Accept: application/json` (Unauthenticated)
  - Query Parameters:
    - `category` (string, optional): Filter by category slug or name.
    - `q` (string, optional): Search keyword matched against product name, description, and tags.
    - `salesMode` (`direct` | `quote` | `both`, optional): Filter by purchase model.
    - `page` (integer >= 1, optional, default: `1`).
    - `limit` (integer 1 to 50, optional, default: `20`).
    - `sort` (string, optional): Sorting criteria (e.g., `price_asc`, `price_desc`, `featured`).

### 1.4 Required Response Fields

- **Confirmed Code Facts (Storefront consumption requirements):**
  - `id` (string, unique product identifier).
  - `name` (string, display title).
  - `description` (string, marketing summary).
  - `category` (string, category name).
  - `price` (number, display price in INR).
  - `image` (string, primary display image URL).
  - `features` (string array, highlights).
- **Proposed Contract Fields (`GET /v1/catalog/products`):**
  - Top-level pagination envelope:
    ```typescript
    {
      data: CatalogProductSummary[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }
    ```
  - Fields per `CatalogProductSummary`:
    - `id` (string, canonical Firestore ID).
    - `slug` (string, URL-safe slug, e.g. `commercial-bbq-grill`).
    - `name` (string).
    - `shortDescription` (string, optional).
    - `description` (string).
    - `category` (string).
    - `salesMode` (`direct` | `quote` | `both`).
    - `price` (integer, in paise; e.g. `1800000`).
    - `mrp` (integer, in paise, optional).
    - `currency` (string, `'INR'`).
    - `primaryImage` (string, public CDN URL).
    - `images` (string array of CDN URLs).
    - `features` (string array).
    - `specifications` (Record<string, string>).
    - `inStock` (boolean).
    - `isFeatured` (boolean).
    - `status` (string, strictly `'Published'`).

### 1.5 Loading, Empty, and Error States

- **Storefront `ProductsPage`:**
  - *Loading State:* Currently absent (synchronous static array). Proposed: Skeleton product cards rendered in both grid and list view layouts while fetch is in flight.
  - *Empty State:* Confirmed implemented in `ProductsPage.tsx:156-163` (renders search icon, "No matching products", "Change the search text or select another category", "Clear filters" button).
  - *Error State:* Currently absent. Proposed: Error alert with "Retry loading products" button and offline fallback banner.
- **Dashboard `ProductsManagement`:**
  - *Loading State:* Confirmed implemented via `loadingProducts` boolean rendering spinner.
  - *Empty State:* Handled by `DataGrid` component when `productsData.data` is empty.
  - *Error State:* Confirmed implemented via `ErrorState` component (`productsError ? 'Failed to load products. Please check your connection.' : null`) with refetch trigger.

### 1.6 Authorization Expectations

- Public, unauthenticated endpoint.
- Server-side filtering is mandatory: Draft, UnderReview, Archived, Discontinued, or Hidden products must NEVER be returned by this endpoint.
- Sensitive business fields (cost prices, supplier IDs, inventory ledger entries, internal notes) must be stripped by the Worker.
- Caching: Cloudflare edge cache with short TTL (`public, max-age=60, s-maxage=300`) and version key invalidation upon product catalog edits.

### 1.7 Contract Tests Needed

1. `catalog_products_returns_200_with_published_items_only`: Verify non-published products in Firestore are excluded.
2. `catalog_products_category_filter`: Verify `?category=Collapsible%20BBQ` returns only matching items.
3. `catalog_products_search_filter`: Verify `?q=rocket` searches name and description case-insensitively.
4. `catalog_products_pagination_bounds`: Verify limit above 50 is capped and out-of-range pages return empty array with accurate total.
5. `catalog_products_price_in_paise`: Verify all price and mrp fields are positive integers representing paise.
6. `catalog_products_strips_internal_metadata`: Verify response payload contains no internal notes, cost fields, or supplier keys.

---

## 2. GET /v1/catalog/products/:slug

### 2.1 Storefront Call Sites and Consumers

1. **`src/pages/ProductDetailPage.tsx` (Lines 3, 24-44, 47, 86-134)**
   - **Current Mechanism:** Receives `productId: string` prop from URL parameter `?id=<id>` via `src/App.tsx:48`. Calls `getProductById(productId)` from `src/data/products.ts:199`.
   - **Fields Consumed:**
     - `id`: Used for wishlist toggle, cart item identity, and URL generation.
     - `name`: Rendered in page heading, breadcrumb, alt text, and email subject.
     - `description`: Rendered in main product copy.
     - `price`: Formatted as INR currency and passed into `addToCart`.
     - `mrp`: Formatted as strikethrough price if present.
     - `image`: Fallback primary image.
     - `images`: Image gallery thumbnails.
     - `features`: Displayed in feature grid with check icons.
     - `specifications`: Rendered in key-value specification table.
     - `usage`: Rendered under Usage tab.
     - `warranty`: Rendered under Warranty tab.
   - **Interactive Elements:**
     - `addToCart`: Adds current item to cart.
     - `share`: Copies URL to clipboard.
     - "Ask about product" button: Constructs `mailto:info@kitchenbots.in?subject=Product enquiry: <product.name>`.

2. **`src/App.tsx` (Lines 28, 48, 103-105, 172-174)**
   - **Current Mechanism:** Parses `new URLSearchParams(window.location.search).get('id')` on route change. Passes `productId` to `ProductDetailPage` and calls `getProductById` to populate `<SEOHead>`.

3. **`src/lib/seo.ts` (Lines 27-46)**
   - **Current Mechanism:** `getProductSEO(product: Product)` creates OpenGraph metadata, meta description, and Schema.org JSON-LD structured data (`@type: 'Product'`, `offers: { price, priceCurrency: 'INR' }`).

### 2.2 Dashboard Call Sites and Consumers

1. **`src/dashboard/pages/customer/EditProduct.tsx` (Lines 9, 47-50)**
   - **Current Mechanism:** Calls `productService.getProductById(id)` from `src/dashboard/services/productService.ts:12`.
   - **Backing Implementation:** `productsApi.getProductById(id)` in `src/dashboard/api/products.api.ts:41` (legacy GAS adapter `action: 'getById'`).

2. **`src/dashboard/hooks/queries.ts` (Lines 18-24)**
   - **Current Mechanism:** `useProduct(id)` hook calls `CommerceProductService.getProductById(id)` from `src/dashboard/services/commerce/ProductService.ts:232`.

### 2.3 Required Request Fields

- **Confirmed Code Facts (Current Usage):**
  - Storefront currently queries by query string parameter `?id=<id>` (e.g. `prod-1`).
  - Dashboard services currently query by ID path parameter `:id`.
- **Proposed Contract Fields (`GET /v1/catalog/products/:slug`):**
  - HTTP Method: `GET`
  - Path Parameter:
    - `:slug` (string, required): Product URL slug (e.g. `flip-bbq-height-adjustable`).
    - *Compatibility requirement:* If no matching slug is found, endpoint should evaluate `:slug` against document ID to maintain backwards compatibility during migration.
  - Headers: `Accept: application/json` (Unauthenticated)

### 2.4 Required Response Fields

- **Confirmed Code Facts (Storefront consumption requirements):**
  - `id` (string).
  - `name` (string).
  - `description` (string).
  - `price` (number, in INR).
  - `mrp` (number, in INR, optional).
  - `image` (string).
  - `images` (string array).
  - `category` (string).
  - `features` (string array).
  - `specifications` (Record<string, string>).
  - `usage` (string, optional).
  - `warranty` (string, optional).
- **Proposed Contract Fields (`GET /v1/catalog/products/:slug`):**
  - `id` (string, canonical Firestore ID).
  - `slug` (string).
  - `name` (string).
  - `shortDescription` (string, optional).
  - `description` (string).
  - `category` (string).
  - `salesMode` (`direct` | `quote` | `both`).
  - `price` (integer, in paise).
  - `mrp` (integer, in paise, optional).
  - `currency` (string, `'INR'`).
  - `primaryImage` (string, CDN URL).
  - `images` (string array of CDN URLs).
  - `features` (string array).
  - `specifications` (Record<string, string>).
  - `usage` (string, optional).
  - `warranty` (string, optional).
  - `leadTime` (string, optional).
  - `inStock` (boolean).
  - `status` (string, strictly `'Published'`).
  - `seo` (object, optional: `{ title?: string, description?: string, canonicalUrl?: string }`).

### 2.5 Loading, Empty, and Error States

- **Storefront `ProductDetailPage`:**
  - *Not Found State:* Confirmed implemented in `ProductDetailPage.tsx:33-41` (checks `if (!product)` and renders "Product not found", "This product link is invalid or no longer available", back button).
  - *Loading State:* Currently absent. Proposed: Skeleton layout showing placeholder image gallery, title, specs list, and action buttons.
  - *Error State:* Currently absent. Proposed: Error panel explaining network failure with "Retry" action.
- **Dashboard `EditProduct`:**
  - *Loading State:* Confirmed implemented via `loading` state rendering loading indicator.
  - *Error State:* Toasts error if fetch fails.

### 2.6 Authorization Expectations

- Public, unauthenticated endpoint.
- Only published products are accessible. Non-published, draft, or archived products requested through this endpoint must return `404 Not Found` to public consumers.
- No internal cost, supplier, or audit records exposed.

### 2.7 Contract Tests Needed

1. `catalog_product_by_slug_returns_200`: Valid slug returns complete product detail matching schema.
2. `catalog_product_by_slug_not_found`: Non-existent slug returns 404 with structured error `{ error: { code: 'NOT_FOUND', message: 'Product not found' } }`.
3. `catalog_product_by_slug_draft_returns_404`: Slug belonging to a draft or unpublished product returns 404 to public callers.
4. `catalog_product_by_id_fallback`: Calling endpoint with Firestore ID returns 200 or 301 redirect to canonical slug.
5. `catalog_product_specifications_format`: Validates that specifications dictionary is accurately serialized as string key-value pairs.

---

## 3. POST /v1/enquiries

### 3.1 Storefront Call Sites and Consumers

1. **`src/pages/BulkEnquiryPage.tsx` (Lines 17-36, 115-144)**
   - **Current Mechanism:** Local React state `formData = { name, email, phone, company, city, requirements }`.
   - **Submission Code:**
     ```typescript
     const handleSubmit = (e: React.FormEvent) => {
       e.preventDefault();
       setIsSubmitted(true);
       const subject = encodeURIComponent('KitchenBots Bulk Enquiry - ' + formData.name);
       const body = encodeURIComponent(
         `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company || 'N/A'}\nCity: ${formData.city || 'N/A'}\n\nRequirements:\n${formData.requirements}`
       );
       window.location.href = `mailto:kitchenbots.sales@gmail.com?subject=${subject}&body=${body}`;
     };
     ```
   - **Current UI Transition:** Immediately sets `isSubmitted = true` and renders confirmation banner with `CheckCircle` icon and message "Enquiry Received!".

2. **`src/pages/ContactPage.tsx` (Lines 38-48, 76-93, 194-245)**
   - **Current Mechanism:** Local React state `formData = { name, email, phone, company, city, message }`.
   - **Submission Code:** Sets `isSubmitting = true`, opens `mailto:kitchenbots.sales@gmail.com`, and executes a simulated `setTimeout(..., 800)` that toggles `isSubmitting = false` and `isSubmitted = true`.

3. **`src/pages/CartPage.tsx` (Line 273) and `src/components/CartDrawer.tsx` (Line 145)**
   - **Current Mechanism:** Action buttons "Request Quote" and "Request an Order Quote" call `onNavigate('bulk-enquiry')`. Cart contents are not yet serialized or transferred into the enquiry submission.

4. **`src/pages/ProductDetailPage.tsx` (Lines 130-132)**
   - **Current Mechanism:** "Ask about product" button opens `mailto:info@kitchenbots.in?subject=Product enquiry: <name>`.

### 3.2 Dashboard Call Sites and Consumers

1. **`src/dashboard/pages/admin/LeadsManagement.tsx` (Lines 26, 45, 50)**
   - **Current Mechanism:** Consumes lead records generated from enquiries via `useLeads()` from `src/dashboard/hooks/queries.ts:118-123`.
   - **Backing Implementation:** `leadService.getLeads()` in `src/dashboard/services/leadService.ts:10` -> `leadsApi.getLeads()` in `src/dashboard/api/leads.api.ts:290-326`.
   - **Fields Consumed:** `id`, `source` (`'Bulk Enquiry'` | `'Contact Form'`), `firstName`, `lastName`, `companyName`, `email`, `phone`, `equipmentNeeded`, `quantity`, `timeline`, `message`, `status`, `score`, `assignedTo`, `notes`, `createdAt`.

2. **`src/dashboard/utils/schemas.ts` (Lines 53-68)**
   - **Current Schema:** `LeadSchema` expects separate `firstName` and `lastName`, whereas storefront forms capture a single `name` field.

### 3.3 Required Request Fields

- **Confirmed Code Facts (Current Storefront Form inputs):**
  - `name`: string (Full contact name).
  - `email`: string (Valid email address).
  - `phone`: string (Contact telephone number).
  - `company`: string (Optional company / establishment name).
  - `city`: string (Optional city).
  - `requirements` or `message`: string (Textual description of equipment or operational needs).
- **Proposed Contract Fields (`POST /v1/enquiries`):**
  - HTTP Method: `POST`
  - Headers:
    - `Content-Type: application/json`
    - `Idempotency-Key`: UUID v4 string (required, prevents duplicate lead creation on double clicks)
  - Request Body:
    - `fullName` (string, required, 2 to 100 characters).
    - `email` (string, required, valid email format).
    - `phone` (string, required, min 10 digits).
    - `companyName` (string, optional, max 120 characters).
    - `city` (string, optional, max 80 characters).
    - `source` (`'storefront_bulk_enquiry'` | `'storefront_contact'` | `'storefront_cart_quote'` | `'storefront_product_ask'`).
    - `message` (string, required, 5 to 3000 characters).
    - `turnstileToken` (string, required Cloudflare Turnstile verification token).
    - `items` (array, optional): Selected cart or product items:
      - `productId` (string).
      - `productName` (string, optional).
      - `quantity` (integer >= 1).
      - `configuration` (Record<string, string>, optional).
    - `consent` (boolean, required, must be `true`).

### 3.4 Required Response Fields

- **Confirmed Code Facts (Current):**
  - Storefront receives no response because submission is handled by `mailto:` and simulated client state.
- **Proposed Contract Fields (`POST /v1/enquiries`):**
  - HTTP Status: `201 Created`
  - Body:
    - `success` (boolean, strictly `true`).
    - `referenceNumber` (string, e.g. `ENQ-2026-0922-0042`).
    - `message` (string confirmation message).
    - `createdAt` (string, ISO 8601 timestamp).

### 3.5 Loading, Empty, and Error States

- **Storefront:**
  - *Loading State:* `ContactPage` has `isSubmitting` toggling button text to "Sending...". `BulkEnquiryPage` currently has no loading state. Proposed: Form controls disabled, submit button displays loading spinner, prevents repeat submission.
  - *Empty State:* Form renders clean, blank input fields with accessible placeholders.
  - *Error State:* Currently absent. Proposed:
    - Field-level validation errors for empty required fields, invalid emails, or invalid phone numbers.
    - Cloudflare Turnstile challenge rejection banner ("Spam verification failed. Please try again.").
    - Network failure alert with "Retry Submission" button.
    - Rate limit notification ("Too many requests. Please wait a moment.").
    - Critical rule: Never display a success message or reference number if the endpoint returns an error.
  - *Success State:* Displays confirmed `referenceNumber` returned by the server, with instructions on sales contact timeframe.

### 3.6 Authorization Expectations

- Public endpoint accessible to unauthenticated guest visitors.
- Abuse Mitigation: Mandatory Cloudflare Turnstile token verification evaluated by the Worker using `TURNSTILE_SECRET_KEY`.
- Rate Limiting: Strict IP-based and token-based rate limiting (e.g., maximum 5 enquiries per hour per IP).
- Idempotency: Duplicate requests presenting identical `Idempotency-Key` headers must return the previously generated response without inserting duplicate Firestore lead documents or dispatching duplicate notification emails.

### 3.7 Contract Tests Needed

1. `enquiry_valid_submission_creates_lead`: Valid payload with valid Turnstile token and idempotency key returns 201 with `referenceNumber`.
2. `enquiry_validation_missing_fields`: Missing email, phone, fullName, or message returns 400 Bad Request with field-level validation errors.
3. `enquiry_invalid_turnstile_rejected`: Missing or invalid `turnstileToken` returns 403 Forbidden (`TURNSTILE_FAILED`).
4. `enquiry_idempotency_replay`: Submitting duplicate request with identical `Idempotency-Key` within 24 hours returns cached 201 response and does not write duplicate record.
5. `enquiry_rate_limiting`: Exceeding allowed submission frequency returns 429 Too Many Requests.
6. `enquiry_with_cart_items`: Validates that cart items and configurations are accurately serialized into the lead record.

---

## 4. POST /v1/orders

### 4.1 Storefront Call Sites and Consumers

1. **`src/pages/CartPage.tsx` (Lines 38-46, 120-227, 230-292)**
   - **Current Mechanism:** Consumes client cart state via `useCart()` (`src/hooks/use-cart.ts` and `src/context/CartContext.tsx`).
   - **Cart Item Structure:**
     ```typescript
     export interface CartItem {
       id: string;
       name: string;
       price: number;
       image: string;
       quantity: number;
       configuration?: Record<string, string>;
     }
     ```
   - **Current Checkout Behavior:** Direct order checkout and simulated payment were removed in Phase 00/02. The primary call-to-action is "Request Quote" navigating to `/bulk-enquiry`.
   - **Phase 03 Target Behavior:** Reintroduce authenticated direct-order checkout for products with `salesMode === 'direct'` or `'both'`, while keeping quote-only products gated.

2. **`src/hooks/use-cart.ts` and `src/context/CartContext.tsx`**
   - **Current Mechanism:** Manages persistent shopping cart in `localStorage` under key `'kb_cart'`.
   - **Actions:** `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`.
   - **Target Behavior:** Cart must only be cleared after durable 201 confirmation from `POST /v1/orders`.

### 4.2 Dashboard Call Sites and Consumers

1. **`src/dashboard/pages/customer/AddOrder.tsx` (Lines 15, 101-144)**
   - **Current Mechanism:** Exact call site line 104: `await orderService.createOrder({ ... })`.
   - **Current Submitted Payload:**
     ```typescript
     {
       customerId: custId,
       customer: { id: custId, name: customer.name, email: customer.email, phone: customer.phone, role: 'customer', ... },
       totalPrice: total, // Insecure client-calculated total!
       paymentMethod: 'Credit Card',
       status: 'pending',
       items: items.map(item => ({
         id: `ITEM-${...}`,
         productId: item.product.id,
         name: item.product.name,
         quantity: item.quantity,
         price: item.product.price ?? 0 // Insecure client-supplied price!
       })),
       shippingAddress: { ... }
     }
     ```
   - **Target Behavior:** Must be refactored to conform to the secure order contract: client passes product IDs and quantities only. Server calculates prices and totals.

2. **`src/dashboard/services/orderService.ts` (Lines 26-28)**
   - Delegates to `ordersApi.createOrder(order)` in `src/dashboard/api/orders.api.ts:68-74` (legacy Google Apps Script adapter `api.request({ module: 'orders', action: 'create', data: order })`).

3. **`src/dashboard/services/sales/orderService.ts` (Lines 12-99)**
   - `OrderService.createOrderFromQuote(quote, userId, userName)` converts an accepted quote into an order in-memory and emits domain events (`QuoteConverted`, `OrderCreated`).

4. **`src/dashboard/pages/customer/OrdersManagement.tsx` (Lines 22, 45)**
   - Consumes existing orders via `useOrders()` (`src/dashboard/hooks/queries.ts:90-95`).

### 4.3 Required Request Fields

- **Confirmed Code Facts (Current Insecure Dashboard Call):**
  - Currently passes client-computed `totalPrice`, item `price`, and `status: 'pending'`.
- **Proposed Contract Fields (`POST /v1/orders`):**
  - HTTP Method: `POST`
  - Headers:
    - `Authorization`: `Bearer <Firebase_ID_Token>` (required)
    - `Content-Type`: `application/json`
    - `Idempotency-Key`: UUID v4 string (required)
  - Request Body:
    - `items` (array, required, min 1 item):
      - `productId` (string, required).
      - `variantId` (string, optional).
      - `quantity` (integer, required, min: 1, max: 99).
      - `configuration` (Record<string, string>, optional).
      - *Explicit rule:* Request body MUST NOT contain unit prices or line subtotals. Any client-supplied prices are discarded.
    - `shippingAddress` (object, required):
      - `addressLine1` (string, required).
      - `addressLine2` (string, optional).
      - `city` (string, required).
      - `state` (string, required).
      - `postalCode` (string, required).
      - `country` (string, required, default: `'India'`).
    - `billingAddress` (object, optional, defaults to shippingAddress).
    - `contactPhone` (string, required).
    - `companyName` (string, optional).
    - `gstDetails` (string, optional GSTIN).
    - `notes` (string, optional).
    - `consent` (boolean, required, must be `true`).

### 4.4 Required Response Fields

- **Confirmed Code Facts (Current):**
  - Storefront: None.
  - Dashboard: Expects `{ id: string, ... }` returned from Google Apps Script.
- **Proposed Contract Fields (`POST /v1/orders`):**
  - HTTP Status: `201 Created`
  - Body:
    - `orderId` (string, canonical Firestore order ID).
    - `orderNumber` (string, human-readable identifier, e.g. `ORD-2026-10492`).
    - `status` (`'Pending Approval'` | `'Confirmed'` | `'Draft'`).
    - `customerId` (string, verified Firebase UID).
    - `currency` (string, `'INR'`).
    - `items` (array of server-calculated lines):
      - `productId` (string).
      - `name` (string).
      - `unitPrice` (integer, in paise).
      - `quantity` (integer).
      - `subtotal` (integer, in paise).
      - `gstRate` (number, e.g. `0.18`).
      - `gstAmount` (integer, in paise).
      - `total` (integer, in paise).
    - `subtotal` (integer, in paise, authoritative sum before tax).
    - `taxTotal` (integer, in paise, authoritative 18% GST).
    - `shippingCost` (integer, in paise).
    - `grandTotal` (integer, in paise, authoritative payable total).
    - `shippingAddress` (snapshot object).
    - `billingAddress` (snapshot object).
    - `createdAt` (string, ISO 8601 timestamp).

### 4.5 Loading, Empty, and Error States

- **Storefront `CartPage` / Direct Checkout Flow:**
  - *Loading State:* Submitting button shows spinner with label "Securing your order...". User interactions and quantity adjustments are locked.
  - *Empty State:* Cart has 0 items. Checkout button is disabled.
  - *Error State:*
    - Unauthenticated: Prompts customer to log in or register before checkout, preserving cart state.
    - Unverified Email: Displays alert "Please verify your email address to complete your order."
    - Quote-only Product in Cart: Identifies product with error "Item requires a formal quote and cannot be purchased directly."
    - Out of Stock / Unpublished Product: Rejects with specific unavailable item notice.
    - Price Drift / Repriced Product: If server price differs from cached storefront price, returns 409 Conflict with updated price for customer confirmation.
    - Network Error: Keeps cart intact, presents clear error banner with "Retry Order Submission".
  - *Success State:* Empties cart (`clearCart()`), navigates to `/order-confirmation?orderNumber=<number>` displaying server-returned order details and next operational steps.
- **Dashboard `AddOrder`:**
  - *Loading State:* `isSubmitting` disables submit button, displays `Loader2` spinner.
  - *Error State:* Toast notifications for missing fields or creation failures.

### 4.6 Authorization Expectations

- Strictly authenticated endpoint. Valid Firebase ID token is mandatory in the `Authorization: Bearer <token>` header.
- Email Verification Gate: Worker verifies `decodedToken.email_verified === true`. Unverified users are rejected with `403 Forbidden`.
- Customer Identity Binding: The `customerId` recorded in Firestore is derived strictly from `decodedToken.uid`, never from client request body.
- Server Calculation Authority: Worker queries Firestore product records to retrieve official prices and calculate line items, taxes, and totals. Client-supplied totals are completely disregarded.
- Sales Mode Enforcement: If any item in the order has `salesMode === 'quote'`, the order is rejected with `400 Bad Request`.

### 4.7 Contract Tests Needed

1. `order_creation_authenticated_success`: Verified customer token produces 201 Created with authoritative totals calculated from Firestore catalog.
2. `order_creation_unauthenticated_rejected`: Missing or malformed `Authorization` header returns 401 Unauthorized.
3. `order_creation_unverified_email_rejected`: Token with `email_verified: false` returns 403 Forbidden (`EMAIL_NOT_VERIFIED`).
4. `order_creation_client_price_ignored`: Submitting request with tampered lower client prices confirms server ignores them and charges catalog price.
5. `order_creation_quote_only_product_rejected`: Submitting order containing product with `salesMode === 'quote'` returns 400 Bad Request (`PRODUCT_REQUIRES_QUOTATION`).
6. `order_creation_idempotency`: Submitting duplicate order with same `Idempotency-Key` returns original order record without creating duplicate Firestore documents.
7. `order_creation_unavailable_product`: Request for inactive or out-of-stock product returns 400 Bad Request (`PRODUCT_UNAVAILABLE`).

---

## 5. Firebase Auth

### 5.1 Storefront Call Sites and Consumers

1. **`src/pages/LoginPage.tsx` (Lines 17-179)**
   - **Current Mechanism:** Pure UI presentation. Contains two tabs:
     - Login Form: Inputs for `email` and `password`. Submit button labeled "Enter Dashboard". Form has `onSubmit={(e) => e.preventDefault()}` (Line 80).
     - Sign-Up Form: Inputs for `fullName`, `companyEmail`, and `createPassword`. Submit button labeled "Create Account". Form has `onSubmit={(e) => e.preventDefault()}` (Line 132).
   - **Status:** No Firebase Web SDK initialized or imported. No network request occurs.

2. **`src/pages/ForgotPasswordPage.tsx` (Lines 7-19, 49-74)**
   - **Current Mechanism:** Local React state `email`, `isSent`, `isSubmitting`.
   - **Submission Code:**
     ```typescript
     const handleSubmit = (e: React.FormEvent) => {
       e.preventDefault();
       setIsSubmitting(true);
       setTimeout(() => {
         setIsSubmitting(false);
         setIsSent(true);
       }, 1500);
     };
     ```
   - **Status:** Simulated password recovery using `setTimeout`. No Firebase Auth `sendPasswordResetEmail` call.

3. **`src/components/Navigation.tsx` (Lines 18, 145, 199)**
   - **Current Mechanism:**
     ```typescript
     const ACCOUNT_URL = getPortalUrl(import.meta.env.VITE_PORTAL_URL);
     ```
     Renders "My Account" link pointing to `ACCOUNT_URL` (directing users to the separate portal/dashboard login).

4. **`src/lib/portal.ts` (Lines 1-5)**
   - Evaluates `configuredUrl?.trim() || '/login'`.

### 5.2 Dashboard Call Sites and Consumers

1. **`src/lib/firebase.ts` (Lines 1-68)**
   - **Current Mechanism:** Real Firebase Web SDK 10.x imports and initialization:
     - `initializeApp`, `getApps`, `getApp` from `firebase/app`
     - `getAuth`, `connectAuthEmulator` from `firebase/auth`
     - `getFirestore`, `connectFirestoreEmulator` from `firebase/firestore`
     - `getAnalytics` from `firebase/analytics`
   - **Exports:** `getFirebaseApp()`, `getFirebaseServices()`, `getFirebaseAnalytics()`.
   - **Emulator Integration:** Connects Auth emulator to `http://127.0.0.1:9099` when `VITE_USE_FIREBASE_EMULATORS === 'true'`.
   - **Status:** Configured and tested against emulator, but not yet integrated into the primary UI auth provider.

2. **`src/dashboard/services/auth/AuthService.ts` (Lines 30-154)**
   - **Current Mechanism:** `MockAuthService` class implementing `IAuthService`.
   - **Hardcoded Logic:** Authenticates if `username === 'Admin'` and password is `'12345'` or `'123456'`.
   - **Session Persistence:** Serializes mock user to `localStorage` under key `kitchenbots_auth_user`.
   - **Role Switching:** Exposes client-side `switchRole(role)` and `switchOrganization(orgId)`.

3. **`src/dashboard/context/AuthContext.tsx` (Lines 19-73)**
   - Provides `AuthProvider` wrapping application in React context. Exposes `user`, `role`, `isAuthenticated`, `isLoading`, `login`, `logout`, `switchRole`.

4. **`src/dashboard/pages/auth/Login.tsx` (Lines 28-58)**
   - Calls `const user = await login(data.username, data.password)` from `useAuth()`.
   - On success, navigates to `/admin` or `/customer` based on client-side `user.role`.

5. **`src/dashboard/components/layout/auth/ProtectedRoute.tsx` and `src/dashboard/components/ProtectedRoute.tsx`**
   - Guards routes based on `useAuth().isAuthenticated` and `allowedRoles.includes(role)`.

### 5.3 Required Request Fields / SDK Invocations

- **Confirmed Code Facts (Current Form Inputs):**
  - Storefront: Login accepts `email` and `password`. Sign-up accepts `fullName`, `companyEmail`, and `createPassword`. Reset accepts `email`.
  - Dashboard: Login form accepts `username` and `password`.
- **Proposed Contract / SDK Integration (Both Applications):**
  - SDK Methods:
    - `signInWithEmailAndPassword(auth, email, password)`
    - `createUserWithEmailAndPassword(auth, email, password)`
    - `sendEmailVerification(auth.currentUser)`
    - `sendPasswordResetEmail(auth, email)`
    - `signInWithPopup(auth, googleAuthProvider)`
    - `signOut(auth)`
    - `onAuthStateChanged(auth, callback)`
    - `getIdToken(auth.currentUser, forceRefresh)`
  - Environment Contract:
    ```text
    VITE_FIREBASE_API_KEY
    VITE_FIREBASE_AUTH_DOMAIN
    VITE_FIREBASE_PROJECT_ID
    VITE_FIREBASE_APP_ID
    ```

### 5.4 Required Response / Session Fields

- **Firebase Auth `User` Instance:**
  - `uid` (string, unique customer/staff identifier).
  - `email` (string, account email).
  - `emailVerified` (boolean, email verification indicator).
  - `displayName` (string | null).
- **Decoded Firebase ID Token Claims (evaluated by Worker and Rules):**
  - `uid` (string).
  - `email` (string).
  - `email_verified` (boolean).
  - `role` (`'admin'` | `'ops'` | `'sales'` | `'customer'` | `'service'` | `'finance'`).
  - `orgId` (string, optional multi-tenant identifier).
- **Firestore User Document (`/users/{uid}`):**
  - `id` (string).
  - `name` (string).
  - `email` (string).
  - `phone` (string, optional).
  - `role` (string).
  - `status` (`'active'` | `'inactive'`).
  - `createdAt` (timestamp).

### 5.5 Loading, Empty, and Error States

- **Storefront:**
  - *Boot Loading:* `onAuthStateChanged` initial resolution must display non-flashing loading state or maintain existing layout before resolving auth.
  - *Form Submission Loading:* Login, register, and reset buttons render loading spinner and disable inputs.
  - *Empty State:* Unauthenticated guest visitor. Cart and browse functionality operate seamlessly.
  - *Error States:*
    - `auth/wrong-password` or `auth/user-not-found` or `auth/invalid-credential`: "Invalid email or password."
    - `auth/email-already-in-use`: "An account with this email already exists. Please log in."
    - `auth/weak-password`: "Password must be at least 8 characters with letters and numbers."
    - `auth/too-many-requests`: "Access temporarily locked due to failed attempts. Please reset password or try later."
    - `auth/popup-closed-by-user`: Handled cleanly without presenting raw runtime errors.
- **Dashboard:**
  - *Boot Loading:* Confirmed handled in `AuthContext.tsx:54-56` (renders `<LoadingSpinner fullPage />` when `status === 'INITIALIZING'`).
  - *Error States:* Confirmed rendered in `Login.tsx:82-86` using `<Alert variant="destructive">{error}</Alert>`.

### 5.6 Authorization Expectations

- Storefront Scope:
  - Customers hold `'customer'` role.
  - Email verification (`email_verified === true`) is required before placing direct orders.
  - Customers cannot access dashboard operational routes or modify Firestore documents directly.
- Dashboard Scope:
  - Staff roles (`'admin'`, `'ops'`, `'sales'`, `'finance'`, `'service'`) are managed strictly through Firebase Custom Claims assigned by the Worker or Admin SDK.
  - Client-side role selection (such as `MockAuthService.switchRole`) must be completely prohibited.
  - Firestore Security Rules enforce deny-by-default, granting document read/write access only to verified tokens with appropriate role claims.

### 5.7 Contract Tests Needed

1. `auth_email_password_login_success`: Valid credentials return authenticated Firebase user with valid JWT token.
2. `auth_invalid_credentials_error`: Incorrect password returns `auth/invalid-credential` with user-facing message.
3. `auth_registration_sends_verification`: User creation dispatches verification email and creates Firestore customer record with `role: 'customer'`.
4. `auth_password_reset_dispatch`: Requesting password reset triggers email dispatch for registered email.
5. `auth_google_popup_success`: Google provider signs in and resolves user profile.
6. `auth_token_verification_by_worker`: Validates that Worker successfully parses ID token and extracts claims.
7. `auth_revoked_token_rejected`: Revoked or expired token fails Worker authorization with 401 Unauthorized.

---

## 6. Summary Matrix: Code Facts vs. Proposed Contracts

| Capability / Endpoint | Storefront Consumer | Dashboard Consumer | Confirmed Code Fact (Current) | Proposed Contract (Target) |
|---|---|---|---|---|
| `GET /v1/catalog/products` | `ProductsPage.tsx`, `ProductFleetSection.tsx`, `Navigation.tsx`, `CategorySection.tsx`, `WishlistPage.tsx` | `ProductsManagement.tsx`, `ProductManagement.tsx`, `AddOrder.tsx` | Synchronous static array `src/data/products.ts`; Dashboard uses mock array or Google Apps Script | Cached Cloudflare Worker endpoint returning published items only, prices in paise, category/search filters |
| `GET /v1/catalog/products/:slug` | `ProductDetailPage.tsx`, `App.tsx`, `seo.ts` | `EditProduct.tsx`, `queries.ts:useProduct` | Synchronous ID lookup `getProductById(id)` against static array; Dashboard queries by ID | Cloudflare Worker endpoint returning full published specifications and R2 media by URL slug |
| `POST /v1/enquiries` | `BulkEnquiryPage.tsx`, `ContactPage.tsx`, `CartPage.tsx`, `CartDrawer.tsx`, `ProductDetailPage.tsx` | `LeadsManagement.tsx`, `leads.api.ts` | Local state opens client `mailto:` link with simulated timeout success; Dashboard reads from GAS or mock CRM | Trusted Worker endpoint creating Firestore lead record, protected by Turnstile, idempotency key, rate limiting |
| `POST /v1/orders` | `CartPage.tsx` (cart state exists in `useCart.ts`, direct checkout currently removed) | `AddOrder.tsx`, `orderService.ts` | Storefront routes cart to quote enquiry; Dashboard `AddOrder.tsx` sends client-calculated prices/totals to GAS | Trusted Worker endpoint requiring verified Firebase Auth, recalculating prices server-side, returning durable order |
| `Firebase Auth` | `LoginPage.tsx`, `ForgotPasswordPage.tsx` (currently static forms) | `lib/firebase.ts`, `AuthService.ts`, `AuthContext.tsx`, `Login.tsx` | Storefront forms are inert UI mocks; Dashboard has real Firebase SDK configured with emulator but UI runs on `MockAuthService` | Shared Firebase Auth integration: customer email/Google login on storefront, custom claims on dashboard |
