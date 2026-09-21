# Ecommerce Phase 01: Routing and Design Foundation Implementation Plan

> **For Claude:** Use `${SUPERPOWERS_SKILLS_ROOT}/skills/collaboration/executing-plans/SKILL.md` to implement this plan task-by-task.

**Goal:** Replace fragile page-state navigation and consolidate a restrained, accessible Kitchen Bots component system.

**Architecture:** React Router owns URLs and navigation. Existing shadcn/Radix components are inventoried and consolidated before any new primitive is introduced.

**Tech Stack:** React Router, shadcn/ui, Radix UI, Tailwind CSS, Lucide, Vitest, Testing Library.

---

### Task 1: Adopt React Router

**Files:**
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`
- Create: `src/routes/`

1. Write failing tests for direct loads, unknown routes, product URLs, and browser back/forward behavior.
2. Define routes for home, catalog, product detail, cart, wishlist, checkout, enquiry, login, password reset, content, and policies.
3. Replace `history.pushState` and page-state switching.
4. Preserve existing page props through temporary route adapters.
5. Configure the static-host SPA fallback.

### Task 2: Inventory components and tokens

1. List current primitives, duplicates, one-off buttons, fields, cards, dialogs, sheets, tables, alerts, and badges.
2. Define semantic brand, surface, text, border, focus, success, warning, and error tokens.
3. Keep storefront spacing editorial and product-led.
4. Use moderate radii. Do not use pill-shaped actions.
5. Standardize visible focus and disabled states.

### Task 3: Create a component showcase

1. Add a development-only showcase route.
2. Display every state of the approved primitives.
3. Verify keyboard behavior and screen-reader names.
4. Verify dark mode only if the product explicitly retains it. Do not add dark mode as decoration.
5. Remove the showcase from production navigation.

### Task 4: Remove prohibited patterns

1. Remove custom cursor components and cursor effects.
2. Remove fake customer counts, testimonials, metrics, and counters.
3. Remove placeholder avatars and remote stock product imagery.
4. Replace vague headings only with approved, verifiable copy.
5. Remove excessive scroll effects and respect reduced motion.

## Acceptance Criteria

- Direct route loading and browser navigation work.
- Component primitives are consistent and accessible.
- No prohibited pattern from `docs/DEVELOPMENT_RULES.md` remains on migrated pages.
- No real product fact or claim is invented during copy cleanup.
- Build, lint, and route tests pass.

## Rollback

Keep routing and visual-system commits separate. Preserve stable URLs if a component consolidation must be reverted.
