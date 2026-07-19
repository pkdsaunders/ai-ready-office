# The AI-Ready Office

A sellable, white-label-ready Claude training programme for small-business admin teams (5–10 staff), delivered as a champion-led course app. Two weeks, ten 90-minute sessions, quizzes, scorecards, badges and a Certificate of Completion.

**A Smash It Marketing product** · smashitmarketing.com

## What's in the box

- **Course app** (this repo) — Next.js static export, premium gamified UI, zero backend
- **10-session curriculum** — see [docs/CURRICULUM.md](docs/CURRICULUM.md) (Session 1 fully built; 2–10 outlined pending sign-off)
- **Champion's guide** — `/champion` in the app: setup checklist, session timings, class tracker (printable)
- **Golden Rules poster** — `/guardrails`: printable A4 safety poster
- **Certificate** — `/certificate`: unlocks after all 10 sessions, print-to-PDF

## How tracking works (no database, no PII stored)

Progress, quiz scores and points live in each learner's browser (`localStorage`). At the end of each session the learner clicks one button which opens a **pre-filled email** of their scorecard addressed to the champion — nothing is transmitted automatically. First names only.

## Marked exercises (LLM-assessed submissions)

Each session includes **marked exercises**: the learner pastes their actual work (an email they produced, a brief they wrote) and `/api/assess` grades it with Claude (`claude-opus-4-8`) against a server-side rubric — score /100, two strengths, one improvement, plus a Golden-Rules check that flags anything resembling real personal data. Stateless: nothing is stored server-side; best score + feedback persist in the learner's browser and feed the champion email. Requires `ANTHROPIC_API_KEY` (Vercel → Project → Settings → Environment Variables, then redeploy). Without it the app still works — the panel shows "assessor not configured".

## Design system

Mirrors the smashitmarketing.com brand (HOP §3): cream canvas `#EEE0CC`, warm ink `#241C17`, oxblood `#7B2525` CTAs/dark zones, terracotta `#BA6A4C` accents, sage `#607456` success, Newsreader display + Geist Sans body, 12px card / 8px control radii. Tokens live in `tailwind.config.ts`.

## Access gate

Every deployment is locked behind a **cohort access code** (`src/config/access.ts`, or the `COHORT_ACCESS_CODE` env var). Staff enter it once at `/unlock`; a 30-day httpOnly cookie keeps them in. Middleware gates every page AND `/api/assess` (the assess route double-checks the cookie itself), so the paid model call is never reachable from the open internet. Demo deployment code: `SAMPLE-2026`.

## Deploying for a client

1. Edit `src/config/client.ts` — company name, industry, champion name + email, cohort label, confirmed Claude plan.
2. Set the cohort access code in `src/config/access.ts` (or `COHORT_ACCESS_CODE` in Vercel).
3. `npm run build` (Node 22 — see below).
4. `npx vercel --prod` from this directory (each client gets their own Vercel project: `vercel link` first).
5. Set `ANTHROPIC_API_KEY` on the Vercel project (one shared Smash It key is fine — usage is a few cents per learner per session; set a monthly spend cap in the Anthropic Console regardless).

## Development

```bash
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"   # Node 22
npm install
npm run dev        # local preview
npm run build      # static export to out/
```

## Guard rails (product-level, non-negotiable)

- No Claude Code content anywhere in the course.
- No real customer data or passwords in any exercise — made-up examples only.
- Client's own website privacy policy/terms are explicitly reaffirmed in the Golden Rules.
- All activity is office-only, on work accounts.
- Champion confirms the Claude plan before Day 1 (course baseline: Claude Team).
- All Anthropic product claims sourced from claude.com / support.claude.com; the app is `noindex`.
