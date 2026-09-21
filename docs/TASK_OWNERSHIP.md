# Task Ownership and Agent Workflow

## Codex owns

- Repository architecture and boundaries.
- Routing, shared state, API contracts, authentication, backend integration, and deployment.
- Dependency changes, migrations, tests, security, and final review.
- Merging approved Antigravity work.

## Antigravity owns

- One isolated storefront UI task at a time.
- Responsive page layout, visual hierarchy, accessibility states, and existing-component reuse.
- UI work must follow `AGENTS.md` and `docs/DEVELOPMENT_RULES.md`.

Antigravity must not change backend contracts, routing, package files, shared state, or deployment unless explicitly assigned.

## Branch and worktree rule

- Codex works on a `codex/*` branch.
- Antigravity works in `.worktrees/<task>` on an `antigravity/*` branch.
- Both agents must not edit the same file concurrently.
- Antigravity does not commit until Codex reviews its diff and checks.
- Codex integrates approved work with a reviewed commit or cherry-pick.

## Current split

- Codex: Phase 00 repository boundary, fake-commerce removal, toolchain, backend audit.
- Antigravity: `src/pages/CartPage.tsx` visual cleanup only.
