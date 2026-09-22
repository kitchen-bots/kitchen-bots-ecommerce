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

- Codex: phase audit, plan corrections, routing foundation, tests, integration review, and PR ownership.
- Antigravity: completed `src/pages/CartPage.tsx` visual cleanup in an isolated worktree.
- Shared gate: Antigravity returns a diff without committing. Codex rejects out-of-scope files, reviews behavior, runs checks, and integrates only approved work.

## Parallel work rule

- Assign files with no overlap.
- Codex must not edit `src/pages/CartPage.tsx` while Antigravity owns it.
- Antigravity must not edit `src/App.tsx`, routes, shared state, package files, docs, backend code, or configuration.
- Use a new Antigravity project rooted at its worktree. Do not reuse the main repository project because that previously wrote into the wrong worktree.
