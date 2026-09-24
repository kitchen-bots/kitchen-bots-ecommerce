# AGENTS.md instructions

These instructions replace all previously provided AGENTS.md instructions.

## Communication Style

- Be direct, honest, and practical. Skip corporate fluff, moral lectures, and unnecessary disclaimers.
- Assume tech-savvy users. Do not over-explain basics.
- Prefer steps, commands, scripts, and concrete examples over vague advice.
- Recommend the best approach and explain why.
- Match tone. Casual and blunt is fine.
- Optimize for efficiency, performance, minimalism, and clean setups.
- Warn clearly about breakage, failure modes, and trade-offs.
- Correct plainly and confidently.
- Prefer open-source, privacy-respecting tools when relevant.
- If a request is restricted, explain briefly and offer the closest practical alternative.

## Website and UI

Core principle: Every page must look intentionally designed, not template-generated. Consistency and restraint beat decoration.

Never use unless explicitly requested:

- Purple or generic AI gradients
- Pill-shaped buttons as the default
- Excessive glassmorphism, glow, or rounded corners
- Fake reviews, testimonials, ratings, stats, or customer counts
- Animated fake counters
- Vague hero copy
- AI-slop imagery or copy
- Emoji as icons
- Em dashes
- Cursor-following or gimmick animations
- Scroll-jacking or excessive parallax
- Decorative elements with no function
- Default framework branding or starter content
- Placeholder or lorem-ipsum content in production

## Page Fundamentals

- Provide a unique title, meta description, and canonical tag.
- Use one h1 and a logical heading hierarchy.
- Use semantic HTML.
- Add meaningful internal links and breadcrumbs where useful.
- Hero copy must state what the product is, what it does, who it serves, and the primary action.

## SEO and Technical Setup

- Ship sitemap.xml, robots.txt, llms.txt, and a real favicon.
- Add structured data using real information only.
- Add custom OG and Twitter metadata.
- Use HTTPS, one canonical host, and no duplicate pages.

## Accessibility

- Use alt text on meaningful images and empty alt text on decorative images.
- Label form controls.
- Support keyboard navigation and visible focus states.
- Maintain sufficient contrast. Never use color alone for meaning.
- Respect prefers-reduced-motion.

## Error and Empty States

- Provide a site-matching 404 without exposed internals.
- Handle error, loading, and empty states deliberately.

## Performance and Build Hygiene

- Avoid oversized or unsplit bundles and duplicate or unused dependencies.
- Lazy-load and code-split where sensible.
- Optimize images and fonts.
- Ship with zero console errors or warnings.
- Do not ship debug logging or production source maps.
- Do not expose secrets.
- Verify environment variables.
- Test the production build.
- Use the real app name in the tab title.

## Animation

- Use animation only for state or feedback.
- Never use scroll-jacking, cursor effects, or motion that delays content.

## Responsive Design

- Test phone through wide desktop breakpoints.
- Prevent overflow, clipped text, and undersized touch targets.

## Implementation Quality

- Avoid fragile hacks, arbitrary z-index values, !important, and unexplained magic numbers.
- Use reusable components.
- Do not duplicate logic.
- Keep editable content in data, not component markup.

## Editing Existing Projects

- Inspect before changing.
- Preserve working functionality, branding, integrations, and business logic.
- Do not redesign unrelated parts or swap libraries without a project reason.

## No Fabrication

Never fabricate reviews, stats, customers, partners, awards, case studies, addresses, or certifications. Design around missing data.

## Completion Gate

Before calling work complete:

- Verify the build passes.
- Confirm console output is clean.
- Confirm route metadata renders.
- Check links and forms.
- Check responsive layouts.
- Remove placeholder content.

Above all: do not make careless changes. Inspect before modifying. Verify after.

## Daily Git & PR Workflow

Always follow this exact workflow when starting work, committing, opening PRs, and making follow-up updates in this repository:

### 1. Start Work
```bash
git switch main
git fetch upstream
git merge --ff-only upstream/main
git push origin main
git switch -c charan/<task-name>
```

### 2. Commit Changes
```bash
git add <path/to/files>
git diff --cached --check
npm run check
git commit -m "feat: describe the change"
git push -u origin HEAD
```

### 3. Open PR
```bash
gh pr create \
  --repo kitchen-bots/kitchen-bots-ecommerce \
  --base main \
  --head "workofcharan:$(git branch --show-current)"
```

### 4. Follow-up Changes on the Same PR
```bash
git add <path/to/files>
npm run check
git commit -m "fix: describe the correction"
git push
```
