# Ecommerce Phase 04: Hardening and Deployment Implementation Plan

> **For Claude:** Use `${SUPERPOWERS_SKILLS_ROOT}/skills/collaboration/executing-plans/SKILL.md` to implement this plan task-by-task.

**Goal:** Prove storefront reliability, security, accessibility, and performance before production promotion.

**Architecture:** Build immutable static assets, deploy previews from pull requests, smoke-test against development services, then promote the exact tested commit to production.

**Tech Stack:** Cloudflare Workers Static Assets, CI, Playwright, Lighthouse, axe, Firebase Auth.

---

### Task 1: Configure deployments

1. Deploy preview builds from pull requests without production write credentials.
2. Deploy production from the approved upstream branch.
3. Configure SPA fallback, cache headers, security headers, and source-map policy.
4. Record commit SHA for every deployment.
5. Retain a known-good rollback version.

### Task 2: Run the production matrix

Test mobile and desktop flows for catalog, search/filter, product detail, cart, wishlist, guest enquiry, registration, verification, login, password reset, direct order, confirmation, portal navigation, errors, offline/retry, and unknown routes.

### Task 3: Verify security and privacy

1. Confirm no secret appears in the browser bundle.
2. Confirm no customer-sensitive data enters analytics or console logs.
3. Verify content security policy and allowed API origins.
4. Verify authentication errors do not leak internal details.
5. Verify private document URLs are never rendered by this application without an authorized portal flow.

### Task 4: Verify accessibility and performance

1. Run automated and manual accessibility checks.
2. Test reduced motion and slow-network fallbacks.
3. Record Core Web Vitals for representative routes.
4. Confirm heavy media is lazy-loaded and dimensioned.
5. Confirm no sticky action obscures content at target widths.

## Acceptance Criteria

- Preview smoke tests pass before promotion.
- Production deploy matches the tested commit.
- Critical Playwright tests pass in Chromium, Firefox, and WebKit where supported.
- Accessibility and performance targets in the master plan pass or have an explicit approved exception.
- Rollback instructions identify an exact previous deployment.

## Rollback

Roll back static deployment to the recorded known-good version. Do not alter backend records as part of a storefront rollback.
