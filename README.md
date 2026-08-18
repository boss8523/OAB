# Oromia Agriculture Bureau — Digital Agriculture Platform

Frontend foundation for the **Oromia Agriculture Digital Platform** (Milestone 1).

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Lightweight custom i18n (Afaan Oromo, Amharic, English)
- CSS + IntersectionObserver motion primitives

## Scripts

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
```

## Architecture

- `src/app` — providers, router, navigation config
- `src/components/ui` — design-system primitives
- `src/components/motion` — performance-safe animation primitives
- `src/layouts` — `PublicLayout` and `PortalLayout`
- `src/pages` — public + portal route surfaces
- `src/i18n` — centralized translations
- `src/styles` — semantic design tokens (light/dark)

## Milestone scope

This milestone delivers design system, application shell, layouts, motion foundation, multilingual structure, and route scaffolding only. Domain modules (farmer registry, market, GIS, auth backends, etc.) belong to later milestones.
