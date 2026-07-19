'use client';

import { SESSIONS } from '@/content/curriculum';
import { clientConfig, productConfig } from '@/config/client';
import { Button, Callout, Card, Chip, Kicker } from '@/components/ui';

const SETUP = [
  {
    title: 'Confirm the Claude plan',
    detail:
      'This course is written for the Claude Team plan (per-seat business plan; Anthropic states business content isn’t used to train models by default, and it includes Projects and Cowork). Confirm what the company is on before Day 1 — if it’s something else, tell Smash It Marketing so the course callouts match. Anthropic’s help centre: support.claude.com.',
  },
  {
    title: 'Get every learner a working login',
    detail:
      'One seat per staff member, work email addresses, signed in successfully once before Day 1. A login hiccup on the morning of Day 1 costs the room twenty minutes.',
  },
  {
    title: 'Install the Claude desktop app (or bookmark claude.ai)',
    detail:
      'Week 1 works in the browser or the desktop app. Week 2 (Cowork) uses the desktop app — installing it now saves a mid-course IT round.',
  },
  {
    title: 'Create the practice folder',
    detail:
      'One shared "AI Course Practice" folder on each machine (or a shared drive) holding only made-up practice files. Cowork sessions in Week 2 are granted THIS folder and nothing else.',
  },
  {
    title: 'Book the room and the rhythm',
    detail:
      'Ten 90-minute blocks, Monday to Friday for two weeks, same time each day — mornings work best. Everyone brings their own machine; you drive the pace.',
  },
  {
    title: 'Print the tracker and the poster',
    detail: 'Print the class tracker below and the Golden Rules poster, and put both on the wall.',
  },
];

const TIMINGS = [
  ['0:00 – 0:10', 'Welcome back', 'Recap yesterday, share one homework win from the room'],
  ['0:10 – 0:25', 'Warm-up', 'Learners open the day’s session in the app and work the warm-up'],
  ['0:25 – 0:55', 'Lesson', 'Work through the lesson parts — read aloud in turns if the room enjoys it'],
  ['0:55 – 1:20', 'Walkthroughs', 'Hands-on at each machine; you float and help; nobody rushes'],
  ['1:20 – 1:30', 'Quiz & wrap', 'Quiz, results email to you, tick the tracker, preview tomorrow'],
];

export default function ChampionPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 pb-16">
      <div className="no-print">
        <Kicker>For the person running the room</Kicker>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">Champion&apos;s guide</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-[1.75] text-ink-soft">
          The champion isn&apos;t a teacher and doesn&apos;t need to be an AI expert — one day ahead of the room is
          plenty. You book the block, keep the pace, collect the scorecards and cheer loudly. The app does the teaching.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip tone="brand">Champion: {clientConfig.championName}</Chip>
          <Chip tone="neutral">Results inbox: {clientConfig.championEmail}</Chip>
        </div>
      </div>

      <section className="no-print space-y-4">
        <h2 className="font-display text-2xl font-semibold text-ink">Before Day 1 — the setup checklist</h2>
        <div className="space-y-3">
          {SETUP.map((s, i) => (
            <Card key={s.title} className="!p-5">
              <div className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-gold">
                  {i + 1}
                </span>
                <div>
                  <div className="text-sm font-bold text-ink">{s.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.detail}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Callout tone="info" title="Smash It Marketing sets the app up for you">
          Your deployment of this course app is configured with your company name and your results email before
          hand-over. Anything you&apos;d like changed — wording, examples, the champion contact — ask{' '}
          {productConfig.supportEmail}.
        </Callout>
      </section>

      <section className="no-print space-y-4">
        <h2 className="font-display text-2xl font-semibold text-ink">How each 90-minute session runs</h2>
        <Card padded={false} className="overflow-hidden">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-line">
              {TIMINGS.map((t) => (
                <tr key={t[0]}>
                  <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs font-bold text-brand-deep">{t[0]}</td>
                  <td className="px-3 py-3.5 font-semibold text-ink">{t[1]}</td>
                  <td className="px-5 py-3.5 leading-relaxed text-ink-soft">{t[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Callout tone="gold" title="The one rule of pacing">
          The room moves at the speed of the slowest machine, not the fastest talker. Walkthroughs are ticked step by
          step — nobody gets left behind on Day 2 because Day 1 was rushed.
        </Callout>
      </section>

      <section className="no-print space-y-4">
        <h2 className="font-display text-2xl font-semibold text-ink">Results emails — what arrives and what to do</h2>
        <Card>
          <p className="text-sm leading-relaxed text-ink/85">
            At the end of each session, every learner presses one button and an email lands in{' '}
            <b>{clientConfig.championEmail}</b> with their name, quiz score, marked-exercise results (real work,
            assessed by Claude on the spot), completed steps, homework status, points and a one-line reflection. Log the quiz score in the tracker on the wall, and read the reflections — they
            tell you exactly which workflows the team wants to automate, which becomes the shortlist for Days 9 and 10.
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-soft">
            <li className="flex gap-2">
              <span className="text-grass">✓</span> Score 70%+ — tick, praise, move on.
            </li>
            <li className="flex gap-2">
              <span className="text-gold">⚑</span> Score under 70% — the email is flagged. Ten quiet minutes together
              before the next session, re-skim the lesson, retake the quiz. Best score counts; nobody &quot;fails&quot;.
            </li>
            <li className="flex gap-2">
              <span className="text-brand">↻</span> No email received — they likely skipped the finish screen; any
              completed session can re-open it and resend.
            </li>
          </ul>
        </Card>
      </section>

      <section className="no-print space-y-4">
        <h2 className="font-display text-2xl font-semibold text-ink">If someone is struggling</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ['Pair them up', 'Sit them with a confident colleague for the walkthroughs — driver and navigator, swapping halfway.'],
            ['Let them drive the redo', 'Repeat a walkthrough with THEM at the keyboard and you narrating. Watching helps; doing sticks.'],
            ['Shrink the win', 'One good conversation with Claude beats five rushed ones. Trim homework to a single task for a day or two.'],
            ['Never skip the rules', 'Whatever else gets trimmed, the Golden Rules and trust-but-verify are non-negotiable for everyone.'],
          ].map(([t, d]) => (
            <Card key={t} className="!p-5">
              <div className="text-sm font-bold text-ink">{t}</div>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{d}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Printable tracker */}
      <section className="space-y-4">
        <div className="no-print flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold text-ink">Class tracker</h2>
          <Button onClick={() => window.print()}>🖨️ Print the tracker</Button>
        </div>
        <div className="print-page overflow-x-auto rounded-card bg-card p-6 shadow-card ring-1 ring-ink/10">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-display text-lg font-semibold text-ink">
              {clientConfig.companyName} — {productConfig.productName}
            </div>
            <div className="text-xs font-semibold text-ink-faint">Quiz score per day · ⚑ = follow-up done</div>
          </div>
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr>
                <th className="border border-line bg-paper px-3 py-2 text-left font-bold text-ink">Team member</th>
                {SESSIONS.map((s) => (
                  <th key={s.id} className="border border-line bg-paper px-2 py-2 text-center font-bold text-ink">
                    D{s.day}
                  </th>
                ))}
                <th className="border border-line bg-gold-soft px-3 py-2 text-center font-bold text-gold">Cert</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, r) => (
                <tr key={r}>
                  <td className="h-9 border border-line px-3" />
                  {SESSIONS.map((s) => (
                    <td key={s.id} className="border border-line" />
                  ))}
                  <td className="border border-line bg-gold-soft/40" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
