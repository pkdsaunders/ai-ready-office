# The AI-Ready Office

A sellable, white-label-ready Claude training programme for small-business admin teams (5–10 staff), delivered as a champion-led course app. Two weeks, ten 90-minute sessions, quizzes, scorecards, badges and a Certificate of Completion.

**A Smash It Marketing product** · smashitmarketing.com

## What's in the box

- **Course app** (this repo) — Next.js static export, premium gamified UI, zero backend
- **10-session curriculum** — see [docs/CURRICULUM.md](docs/CURRICULUM.md) (Session 1 fully built; 2–10 outlined pending sign-off)
- **Champion's guide** — `/champion` in the app: setup checklist, session timings, class tracker (printable)
- **Golden Rules poster** — `/guardrails`: printable A4 safety poster
- **Certificate** — `/certificate`: unlocks after all 10 sessions, print-to-PDF

## How tracking works (no backend, no PII stored)

Progress, quiz scores and points live in each learner's browser (`localStorage`). At the end of each session the learner clicks one button which opens a **pre-filled email** of their scorecard addressed to the champion — nothing is transmitted automatically. First names only, and they never leave the learner's machine except in that email.

## Deploying for a client

1. Edit `src/config/client.ts` — company name, industry, champion name + email, cohort label, confirmed Claude plan.
2. `npm run build` (Node 22 — see below).
3. `npx vercel --prod` from this directory (each client gets their own Vercel project: `vercel link` first).

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
