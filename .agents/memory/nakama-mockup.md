---
name: Nakama Partners landing mockup
description: Strict brand/design constraints for the Nakama landing page mockup, easy to violate in future edits
---

# Nakama Partners landing mockup

File: `artifacts/mockup-sandbox/src/components/mockups/nakama/LandingPage.tsx`
Preview: `/preview/nakama/LandingPage` (real URL `/__mockup/preview/nakama/LandingPage`), artifact dir `mockup-sandbox`.

## Strict brand rules (do not break)
- NO emojis anywhere.
- NO pill / fully-rounded buttons — buttons are sharp rectangles (see `.btn-primary`, `.btn-ghost`).
- NO floating decorative cards; device mockups (browser/phone/tablet frames) are OK.
- NO the word "villa" — use "property" / "home".
- NO em dashes in copy — use commas or "to" (e.g. "12 to 16 August").
- NO overclaims — keep copy grounded.
- Palette: white/off-white background (`C.bg`), dark green accents `C.sienna #2A6044`, `C.siennaL #3D8A62`, `C.siennaD #1E4533`.

**Why:** these were explicit, repeated user constraints for this mockup; violating them means rework.

## Contact form + email
- Form section (`id="contact"`) is before the footer — Name, Phone, Email, Needs (select), Message (400 char).
- POSTs to `POST /api/inquiry` on the api-server (route: `artifacts/api-server/src/routes/inquiry.ts`).
- Sends email via Resend HTTP API. Requires `RESEND_API_KEY` env var. Without it, inquiry is logged only (graceful fallback).
- Recipients: `contact@nakama.partners`, CC: `kevinasuteja@gmail.com`, `renaldoliao@gmail.com`.
- **Why:** Resend requires a verified sending domain. From address must match a domain verified in Resend dashboard. If delivery fails, check domain verification first.

## Conventions
- Color constants + CSS-in-JS string live near top of file (~line 19-30 constants, CSS string follows).
- Typography classes: `.display` (Sora), `.label` (Jost uppercase tracked). Fonts Sora + Jost.
- Full-screen modals (e.g. `WorkShowcase`) should: lock body scroll, close on Escape, trap focus, restore focus on close, and set `role="dialog"` + `aria-modal` + `aria-labelledby`. z-index 300 sits above nav (100).
- wa.me contact link: `https://wa.me/6285110808158`.
- Verify with `pnpm --filter @workspace/mockup-sandbox run typecheck` (not build).
