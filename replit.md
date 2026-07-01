# Nakama Partners

A static marketing website for Nakama Partners, a Bali property onboarding and branding studio. Single-page landing site (hero, problem, services, process, stories, contact) with a WhatsApp-based inquiry form — no backend required.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/nakama-site/` — the live website (React + Vite, static build).
- `artifacts/nakama-site/src/LandingPage.tsx` — the entire single-page site (design, copy, CSS-in-JS, form). This is the source of truth for the design.
- `artifacts/nakama-site/src/assets/` — all images.
- `artifacts/nakama-site/index.html` — loads Sora + Jost fonts, sets meta/SEO tags.
- Original design mockup (reference only): `artifacts/mockup-sandbox/src/components/mockups/nakama/LandingPage.tsx`.

## Architecture decisions

- The site is a pixel-perfect port of the approved canvas mockup — do not redesign; keep design exactly as-is.
- Fully static: no API/DB. The contact form opens WhatsApp (`wa.me/6285110808158`) with the form fields prefilled instead of POSTing to a server.
- The component uses inline styles + one injected `<style>` CSS-in-JS string. Responsive behavior comes from media queries in that string overriding inline grids with `!important` — any new responsive grid needs a class + a matching media rule (inline styles alone can't collapse on mobile).
- `index.css` is a minimal reset only; the scaffold's Tailwind theme is unused by the design.

## Product

Single-page marketing site presenting Nakama Partners' services for Bali property owners: property onboarding, branding, direct-booking websites, and guest management. Visitors submit an inquiry that hands off to WhatsApp.

## User preferences

- Production hosting: **Vercel**, deployed from the GitHub repo `NakamaPartners/Nakama-Partners_Website`.
- Canonical domain: **`nakama.partners`** (apex, **no `www`**). `www.nakama.partners` must 301-redirect to the apex. Configured via `vercel.json` redirect + the Vercel dashboard Domains setting (apex set as primary).

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
