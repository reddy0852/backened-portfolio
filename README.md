# Vinay Reddy — Backend Engineer Portfolio

> Building Scalable Systems | Java • Spring Boot • GCP • Kafka • Microservices

🔗 **Live:** [https://reddy0852.github.io/backened-portfolio](https://reddy0852.github.io/backened-portfolio)

The site ships several design versions side by side (`v1` is the default). A floating button in the
bottom-right corner lets visitors pick one; the choice is kept in the URL (`?v=v1`)
and remembered for next time.

| Version | Name              | Look                                                         |
| ------- | ----------------- | ------------------------------------------------------------ |
| `v2`    | Through the stack | Light, layered glass; the skill layers float over the name   |
| `v1`    | Terminal          | The original dark terminal design (Tailwind), ported to React |

The original static HTML site is preserved on the `legacy/static-site` branch.

## Tech stack

React 18 · TypeScript (strict) · Vite · CSS Modules (v2) · Tailwind CSS (v1) · GitHub Actions → GitHub Pages

## Getting started

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

## Project structure

```
src/
  content/
    profile.ts       ← everything the site says about Vinay (edit this to update content)
    types.ts         ← the content model
  lib/               ← pure helpers: dates, derived profile data, mailto builder
  hooks/             ← shared React hooks (version selection, contact form, dismiss, …)
  shared/            ← version-agnostic UI: VersionSwitcher, ContactForm, Icon
  versions/
    registry.ts      ← list of site versions shown in the switcher
    v1/              ← "Terminal" (Tailwind, original design)
    v2/              ← "Through the stack" (CSS Modules)
```

## Common updates

All personal content lives in **`src/content/profile.ts`**. Every version reads from it,
so one edit updates every design.

- **New job / role** — add an entry to `roles` with `start` (and `end` for past roles).
  Use `{ year: 2026, month: 11 }`, or just `{ year: 2026 }` if the month doesn't matter.
  The current role is the one without `end`; durations, "years of experience" and
  timelines are calculated from these dates automatically.
- **Skills** — edit `skills` (ordered from code up to cloud).
- **Certification** — add to `certifications` with its Credly `verifyUrl`.
- **Projects / testimonials** — add to `projects` / `testimonials`; their sections
  appear automatically once the list is non-empty.
- **Résumé** — put a PDF in `public/` and set `resumeUrl: '/backened-portfolio/resume.pdf'`.

## Adding a new design version

1. Create `src/versions/<id>/Site.tsx` with a default-exported component that takes `{ profile }`.
2. Add an entry to `VERSIONS` in `src/versions/registry.ts` (id, label, description, stylesheets).

Each version is code-split and loaded on its own page load, so versions never share
CSS and can use any styling approach.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages.

## License

© 2026 Vinay Reddy. All rights reserved.
