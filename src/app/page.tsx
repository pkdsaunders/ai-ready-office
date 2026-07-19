'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SESSIONS, TOTAL_SESSIONS } from '@/content/curriculum';
import { clientConfig, productConfig } from '@/config/client';
import { completedCount, isSessionComplete, isSessionUnlocked, totalPoints, useProgress } from '@/lib/progress';
import { ProgressRing } from '@/components/ProgressRing';
import { Card, Chip, Kicker } from '@/components/ui';

export default function CourseMap() {
  const { state, hydrated } = useProgress();
  const done = hydrated ? completedCount(state) : 0;
  const pts = hydrated ? totalPoints(state) : 0;
  const nextSession = SESSIONS.find((s) => !isSessionComplete(state, s.id));

  return (
    <div className="space-y-10 pb-16">
      {/* Hero */}
      <section className="overflow-hidden rounded-3xl bg-navy text-cream shadow-lift">
        <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.5fr,1fr] lg:items-center">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 right-40 h-64 w-64 rounded-full bg-gold/15 blur-3xl"
          />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone="gold">{clientConfig.cohortLabel}</Chip>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-cream/80 ring-1 ring-white/15">
                {clientConfig.companyName}
              </span>
            </div>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] sm:text-6xl">
              Two weeks to an <span className="text-gold">AI-ready</span> office.
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-cream/70">
              Ten guided sessions — 90 minutes a day, Monday to Friday — that take your team from “never touched AI”
              to confidently building Claude into their daily work. No jargon, no coding, no real customer data. Ever.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-cream/60">
              <span className="rounded-full bg-white/10 px-3 py-1.5">10 × 90-minute sessions</span>
              <span className="rounded-full bg-white/10 px-3 py-1.5">Hands-on from Day 1</span>
              <span className="rounded-full bg-white/10 px-3 py-1.5">Quizzes & scorecards</span>
              <span className="rounded-full bg-white/10 px-3 py-1.5">Certificate at the end</span>
            </div>
            {nextSession && hydrated && (
              <div className="mt-8">
                <Link
                  href={`/session/${nextSession.id}/`}
                  className="inline-flex items-center gap-2 rounded-control bg-gold px-7 py-3.5 text-base font-bold text-cream shadow-[0_12px_28px_-8px_rgba(186,106,76,0.6)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {done === 0 ? 'Start Day 1 →' : `Continue — Day ${nextSession.day} →`}
                </Link>
              </div>
            )}
          </div>
          <div className="relative flex flex-col items-center gap-4">
            <div className="rounded-3xl bg-white/[0.07] p-6 ring-1 ring-white/10 backdrop-blur">
              <ProgressRing
                value={done}
                max={TOTAL_SESSIONS}
                label={`${done}/${TOTAL_SESSIONS}`}
                sublabel="sessions"
                size={150}
                dark
              />
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold">
              <span className="rounded-full bg-gold/20 px-4 py-1.5 text-gold ring-1 ring-gold/30">★ {pts} points</span>
              <span className="rounded-full bg-white/10 px-4 py-1.5 text-cream/70 ring-1 ring-white/15">
                {SESSIONS.filter((s) => isSessionComplete(state, s.id)).length > 0
                  ? `${SESSIONS.filter((s) => isSessionComplete(state, s.id)).length} badge${SESSIONS.filter((s) => isSessionComplete(state, s.id)).length === 1 ? '' : 's'}`
                  : 'First badge awaits'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Badge shelf */}
      {hydrated && done > 0 && (
        <section>
          <Kicker>Badge shelf</Kicker>
          <div className="mt-3 flex flex-wrap gap-3">
            {SESSIONS.map((s) =>
              isSessionComplete(state, s.id) ? (
                <motion.div
                  key={s.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-2.5 rounded-card bg-card px-4 py-2.5 shadow-card ring-1 ring-gold/20"
                >
                  <span className="text-2xl">{s.badge.emoji}</span>
                  <div>
                    <div className="text-xs font-bold text-ink">{s.badge.name}</div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-faint">Day {s.day}</div>
                  </div>
                </motion.div>
              ) : null,
            )}
          </div>
        </section>
      )}

      {/* Journey */}
      {[1, 2].map((week) => (
        <section key={week}>
          <div className="mb-4 flex items-baseline gap-3">
            <h2 className="font-display text-2xl font-semibold text-ink">Week {week}</h2>
            <span className="text-sm text-ink-faint">
              {week === 1 ? 'Foundations — chat, prompting, projects, documents' : 'Cowork, playbooks and your capstone'}
            </span>
          </div>
          <div className="relative space-y-3">
            {SESSIONS.filter((s) => s.week === week).map((s, i) => {
              const complete = hydrated && isSessionComplete(state, s.id);
              const unlocked = hydrated && isSessionUnlocked(state, s.id);
              const isNext = hydrated && nextSession?.id === s.id;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                >
                  <Link
                    href={`/session/${s.id}/`}
                    className={`group flex items-center gap-5 rounded-card p-5 ring-1 transition-all sm:p-6 ${
                      isNext
                        ? 'bg-card shadow-lift ring-brand/40 hover:ring-brand'
                        : complete
                          ? 'bg-grass-soft/30 shadow-card ring-grass/20 hover:ring-grass/40'
                          : unlocked
                            ? 'bg-card shadow-card ring-ink/8 hover:ring-brand/40'
                            : 'bg-paper-deep/50 ring-ink/5 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-card font-display text-xl font-bold shadow-card ${
                        complete
                          ? 'bg-grass text-cream'
                          : isNext
                            ? 'bg-brand text-cream'
                            : unlocked
                              ? 'bg-card text-ink ring-1 ring-ink/15'
                              : 'bg-paper text-ink-faint ring-1 ring-ink/10'
                      }`}
                    >
                      {complete ? '✓' : unlocked ? s.day : '🔒'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-faint">
                          Day {s.day} · {s.minutes} min
                        </span>
                        {isNext && <Chip tone="brand">Up next</Chip>}
                        {complete && <Chip tone="grass">✓ Complete</Chip>}
                        {s.status === 'outline' && <Chip tone="gold">Outline — builds after sign-off</Chip>}
                      </div>
                      <h3 className="mt-1 truncate font-display text-xl font-semibold text-ink sm:text-2xl">{s.title}</h3>
                      <p className="mt-0.5 line-clamp-2 text-sm leading-relaxed text-ink-soft">{s.subtitle}</p>
                    </div>
                    <span className="hidden text-2xl text-ink-faint transition-transform group-hover:translate-x-1 sm:block">
                      →
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
      ))}

      {/* Utility row */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            href: '/guardrails/',
            emoji: '🛡️',
            title: 'The Golden Rules',
            text: 'The five rules that keep everyone safe — printable poster for the office wall.',
          },
          {
            href: '/champion/',
            emoji: '🧭',
            title: "Champion's guide",
            text: `How ${clientConfig.championName} runs the fortnight — setup, timings, tracker and help.`,
          },
          {
            href: '/certificate/',
            emoji: '🏆',
            title: 'Certificate',
            text: 'Complete all ten sessions to unlock your printable Certificate of Completion.',
          },
        ].map((c) => (
          <Link key={c.href} href={c.href}>
            <Card className="h-full transition-all hover:shadow-lift">
              <div className="text-3xl">{c.emoji}</div>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">{c.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{c.text}</p>
            </Card>
          </Link>
        ))}
      </section>

      <p className="text-center text-xs text-ink-faint">
        {productConfig.productName} is delivered by {productConfig.byline.replace('A ', '')} · {productConfig.website}
      </p>
    </div>
  );
}
