# Kitchen Bots Ecommerce Master Implementation Plan

> **For Claude:** Use `${SUPERPOWERS_SKILLS_ROOT}/skills/collaboration/executing-plans/SKILL.md` to implement this plan task-by-task.

**Goal:** Deliver a trustworthy, responsive, accessible storefront with live catalog data, real authentication, guest enquiries, authenticated orders, and clear links to the separate customer portal.

**Architecture:** This repository owns the public storefront and commerce experience only. It consumes published catalog data and trusted write endpoints from the dashboard repository's Worker API, uses Firebase Auth for customer identity, and loads media from Cloudflare R2.

**Tech Stack:** React, Vite, TypeScript, React Router, shadcn/ui, Tailwind CSS, Firebase Auth, Cloudflare Worker API, R2, React Hook Form, Zod, Playwright, Vitest.

---

## Repository Boundary

This repository owns:

- Marketing and content pages.
- Product discovery and product detail pages.
- Cart and wishlist.
- Login, registration, verification, and password reset.
- Guest quote requests.
- Authenticated direct-order checkout.
- Order confirmation based on real API responses.
- Links to the separate customer portal.

This repository does not own:

- Admin screens.
- Customer portal screens.
- Firestore administration.
- Staff roles.
- Order or quote operations.
- Private document storage.
- Transactional email delivery.
- Payment webhooks.

## Required Reading

- [Development Rules](DEVELOPMENT_RULES.md)
- [Phase 00: Baseline and Boundary](phases/00-baseline-and-boundary.md)
- [Phase 01: Routing and Design Foundation](phases/01-routing-and-design-foundation.md)
- [Phase 02: UI/UX Audit and Improvement](phases/02-ui-ux-audit-and-improvement.md)
- [Phase 03: Catalog, Auth, Enquiry, and Order Integration](phases/03-commerce-integration.md)
- [Phase 04: Storefront Hardening and Deployment](phases/04-hardening-and-deployment.md)
- [Current Project Status](reports/PROJECT_STATUS_REPORT.md)
- [Backend Status and Implementation Report](reports/BACKEND_STATUS_REPORT.md)

## Delivery Order

| Phase | Outcome | Dependency |
|---|---|---|
| 00 | Clean boundary and verified baseline | None |
| 01 | Reliable routing and owned design primitives | Phase 00 |
| 02 | Evidence-based responsive and accessible UX | Phase 01; audit may start earlier |
| 03 | Live catalog, Firebase Auth, enquiries, and orders | Dashboard API contracts available |
| 04 | Production tests, performance, and deployment | Phases 01-03 |

## Current Phase State

| Phase | State | Next gate |
|---|---|---|
| 00 | Implementation complete; PR #2 pending | Merge and verify under Node 22 |
| 01 | Not started | Replace page-state routing and inventory existing primitives |
| 02 | Started | Cart cleanup complete; complete route-by-route browser audit |
| 03 | Blocked | Dashboard Worker contracts and endpoints |
| 04 | Blocked | Completed functional integrations |

## Cross-Repository Contracts

The dashboard repository owns the Worker implementation and canonical server schemas. This repository keeps matching request and response fixtures for:

```text
GET  /v1/catalog/products
GET  /v1/catalog/products/:slug
POST /v1/enquiries
POST /v1/orders
POST /v1/enquiries/:id/claim
```

Contract changes require review in both repositories. Browser code never sends authoritative prices, roles, publication status, ownership, or payment state.

## Global Acceptance Gate

```bash
npm ci
npm run typecheck
npm run lint
npm run test
npm run build
```

Critical Playwright journeys must cover catalog discovery, product detail, guest enquiry, registration/login, direct order, confirmation, responsive navigation, and failure recovery.

## Deferred

- Real payment collection.
- Embedded admin or customer dashboard.
- Equipment telemetry.
- Advanced customer organization management.
- SMS or WhatsApp transactional messaging.
- Automatic media processing in the browser.

## Definition of Storefront Readiness

The storefront is ready when customers can understand real products, choose direct purchase or quote correctly, submit durable records without simulated success, authenticate securely, recover from errors, and complete critical journeys on mobile and desktop with no prohibited UI patterns.
