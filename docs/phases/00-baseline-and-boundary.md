# Ecommerce Phase 00: Baseline and Boundary Implementation Plan

> **For Claude:** Use `${SUPERPOWERS_SKILLS_ROOT}/skills/collaboration/executing-plans/SKILL.md` to implement this plan task-by-task.

**Goal:** Restore a buildable storefront and remove the duplicate dashboard boundary violation.

**Architecture:** The storefront remains a standalone React application. Dashboard and portal routes become external navigation to the separately deployed portal.

**Tech Stack:** React, TypeScript, Vite, ESLint, npm audit.

## Status

**Complete and merged upstream.**

Completed on branch `codex/phase-00-boundary` and merged through `workofcharan/kitchen-bots-ecommerce#2`.

- Removed embedded customer and admin dashboard code.
- Changed My Account to use `VITE_PORTAL_URL`, with `/login` as local fallback.
- Removed simulated checkout and order-confirmation pages.
- Changed cart completion to the existing quote-request flow until trusted order endpoints exist.
- Added Node 22 pinning, typecheck/test/check scripts, focused portal URL tests, and CI.
- Removed unused dashboard chart dependencies.
- Verified typecheck, lint, tests, build, and no high or critical production audit findings.

### Verification evidence

- `npm run check` passed on 22 September 2026.
- Portal resolver tests: 2 passed.
- Production audit: zero high or critical findings; one moderate `fflate` advisory remains.
- Repository pins Node 22. Local verification host still runs Node 20 and reports an npm compatibility warning.
- No browser QA is claimed. Responsive and interaction checks belong to Phase 02.

### Completion gate

1. Pull request #2 merged into upstream `main`.
2. Global acceptance gate passed on the implementation branch. Upstream CI owns merged-commit verification under Node 22.
3. Cart UI work remains outside Phase 00. The stopped draft was replaced by the reviewed Phase 02 cart cleanup in pull request #3.

---

### Task 1: Record the baseline

1. Run `npm ci`, build, lint, and production dependency audit.
2. Record every failure before editing.
3. Confirm that current build failures include embedded-dashboard TypeScript errors.
4. Confirm the Git worktree contains no unrelated changes.

### Task 2: Remove the embedded dashboard

**Files:**
- Modify: `src/App.tsx`
- Remove after reference review: `src/dashboard/`
- Remove after route replacement: `src/pages/DashboardPage.tsx`

1. Add a test proving account/admin actions resolve to `VITE_PORTAL_URL`.
2. Remove `CustomerPortal`, `AdminPortal`, and legacy dashboard routes.
3. Remove embedded dashboard mock data and unused dashboard dependencies.
4. Use `rg` before deleting any dependency or shared component.
5. Run the build and verify the original TypeScript failures are gone.

### Task 3: Stabilize the toolchain

1. Pin Node 22 with a repository-local version file.
2. Add `typecheck`, `test`, and aggregate `check` scripts where missing.
3. Upgrade vulnerable production dependencies without `--force`.
4. Run checks after each dependency group.
5. Add CI for clean install, type check, lint, test, build, and audit.

## Acceptance Criteria

- Production build succeeds from a clean install.
- Lint reports zero errors.
- No embedded dashboard code remains.
- Portal navigation uses configuration rather than a hard-coded development URL.
- No unresolved high or critical production advisory remains.
- No simulated commerce behavior is added during cleanup.

## Rollback

Keep dashboard removal, dependency upgrades, and CI changes in separate commits. Revert only the failing change while keeping the application boundary intact.
