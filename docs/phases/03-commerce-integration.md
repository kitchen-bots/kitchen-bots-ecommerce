# Ecommerce Phase 03: Commerce Integration Implementation Plan

> **For Claude:** Use `${SUPERPOWERS_SKILLS_ROOT}/skills/collaboration/executing-plans/SKILL.md` to implement this plan task-by-task.

**Goal:** Replace static and simulated commerce behavior with live catalog data, Firebase customer identity, durable guest enquiries, and authenticated orders.

**Architecture:** The storefront reads a cached public catalog API. Firebase Auth supplies customer ID tokens. Enquiries and orders are created by trusted Worker endpoints owned by the dashboard repository.

**Tech Stack:** Firebase Auth, React Hook Form, Zod, Worker API, Turnstile, R2, Playwright.

---

### Task 1: Integrate the public catalog

1. Add shared contract fixtures before the fetch client.
2. Consume `GET /v1/catalog/products` and `GET /v1/catalog/products/:slug`.
3. Add loading, empty, not-found, retry, and offline states.
4. Stop using `src/data/products.ts` as a runtime fallback.
5. Preserve stable product URLs and R2 media paths.

### Task 2: Integrate Firebase Auth

1. Test registration, email verification, login, Google sign-in, reset, logout, and session restoration.
2. Replace UI-only authentication forms.
3. Preserve cart and intended route through authentication.
4. Require verified email for direct order submission.
5. Send portal navigation to `VITE_PORTAL_URL`.

### Task 3: Integrate guest enquiries

1. Validate contact, company optional, product interest, quantity, message, and consent.
2. Add Turnstile.
3. Send an idempotency key with the request.
4. Display the returned reference only after durable creation.
5. Test validation, bot rejection, duplicate click, network failure, and retry.

### Task 4: Integrate authenticated orders

1. Remove fake payment controls.
2. Send only product IDs, quantities, configuration, addresses, GST details, and consent.
3. Never send a browser total as authoritative data.
4. Handle unpublished, quote-only, unavailable, and repriced product responses.
5. Clear cart only after successful creation.
6. Render confirmation from the returned order record.

### Task 5: Enforce mixed sales modes

1. `direct` and `both` products may enter cart.
2. `quote` and `both` products expose quote actions.
3. Quote-only products cannot reach checkout through URL or state manipulation.
4. Explain next steps in direct language.

## Acceptance Criteria

- Catalog reflects published API data.
- Guest enquiry works without an account.
- Direct order requires verified authentication.
- Modified browser prices cannot change server totals.
- No UI shows simulated submission or payment success.
- Contract and Playwright tests pass.

## Rollback

Feature-flag catalog reads and write integrations separately. Never fall back to fake success when a trusted endpoint fails.
