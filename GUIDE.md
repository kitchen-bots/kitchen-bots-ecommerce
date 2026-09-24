# Kitchen Bots: Catalog Sync & Git PR Workflow Guide

This guide explains how catalog data is synchronized between the storefront (`kitchen-bots-ecommerce`) and the admin operations dashboard (`kitchen-bots-dashboard`), as well as how to push changes to your personal fork and open a Pull Request against upstream.

---

## 1. Catalog Synchronization

### Architecture
- **Source of Truth**: The storefront product and category files:
  - `src/data/products.ts` (12 Kitchen Bots products, prices, images, specs)
  - `src/data/categories.ts` (6 categories and metadata)
- **Target Consumer**: The operational dashboard:
  - `../kitchen-bots-dashboard/src/dashboard/data/catalog.json`
  - `../kitchen-bots-dashboard/src/dashboard/data/catalog.ts`
  - `../kitchen-bots-dashboard/src/dashboard/services/commerce/ProductService.ts`
  - `../kitchen-bots-dashboard/src/dashboard/services/commerce/InventoryService.ts`

### Running the Sync
Whenever products or categories are modified, added, or removed in the ecommerce repository, run:

```bash
# In either kitchen-bots-ecommerce OR kitchen-bots-dashboard:
npm run sync:catalog
```

To verify that both repositories are currently synchronized without writing files (ideal for CI / pre-commit):

```bash
npm run sync:catalog:check
```

---

## 2. Git & GitHub PR Workflow

Each developer works on a **personal fork** (`origin`) and contributes back to the **organization repository** (`upstream`) via Pull Requests.

### Remote Configuration
Verify your git remotes:

```bash
git remote -v
```

Expected remotes:
- `origin`: `https://github.com/workofcharan/kitchen-bots-ecommerce.git` (Your Fork)
- `upstream`: `https://github.com/kitchen-bots/kitchen-bots-ecommerce.git` (Organization Repo)

If `upstream` is missing:
```bash
git remote add upstream https://github.com/kitchen-bots/kitchen-bots-ecommerce.git
```

---

### Step-by-Step: Pushing Changes & Opening a Pull Request

#### Step 1: Ensure Local `main` is Up-to-Date
Before starting new work, always sync with `upstream/main`:

```bash
git switch main
git fetch upstream
git merge --ff-only upstream/main
git push origin main
```

#### Step 2: Create a Feature Branch
Create a descriptive branch prefixed with your name (`charan/`):

```bash
git switch -c charan/catalog-sync-pipeline
```

#### Step 3: Review and Stage Changes
Check your working tree:

```bash
git status
```

Stage the relevant files:
```bash
git add package.json scripts/sync-catalog.mjs GUIDE.md
```

Verify staged diff:
```bash
git diff --cached --stat
```

#### Step 4: Commit Your Changes
Follow conventional commit message prefixes (`feat:`, `fix:`, `docs:`, `chore:`):

```bash
git commit -m "feat(catalog): add cross-repository catalog synchronization pipeline"
```

#### Step 5: Push Branch to Your Fork (`origin`)
Push your branch to your personal fork on GitHub:

```bash
git push -u origin HEAD
```

*(Future commits on the same branch only require `git push`.)*

#### Step 6: Create the Pull Request to `upstream`

##### Option A: Using GitHub CLI (`gh`)
Run the CLI command from the repository root:

```bash
gh pr create \
  --repo kitchen-bots/kitchen-bots-ecommerce \
  --base main \
  --head "workofcharan:$(git branch --show-current)" \
  --title "feat(catalog): add cross-repository catalog synchronization pipeline" \
  --body "Adds cross-repository catalog synchronization script and npm commands to keep product data in sync with the dashboard."
```

##### Option B: Using the GitHub Web Interface
1. Navigate to your fork on GitHub: `https://github.com/workofcharan/kitchen-bots-ecommerce`
2. You will see a banner: **"charan/catalog-sync-pipeline had recent pushes"** with a **"Compare & pull request"** button.
3. Ensure the base repository is `kitchen-bots/kitchen-bots-ecommerce` (branch `main`), and the head repository is `workofcharan/kitchen-bots-ecommerce` (branch `charan/catalog-sync-pipeline`).
4. Fill in the title and description, then click **"Create pull request"**.

---

## 3. After Your Pull Request Merges

Once the PR is reviewed and merged into `upstream/main`:

```bash
git switch main
git fetch upstream
git merge --ff-only upstream/main
git push origin main
git branch -d charan/catalog-sync-pipeline
```
