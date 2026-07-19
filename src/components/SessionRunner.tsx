'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { SessionMeta } from '@/content/curriculum';
import type { BuiltSessionContent, Block } from '@/content/types';
import { clientConfig } from '@/config/client';
import { sessionPoints, useProgress } from '@/lib/progress';
import { Button, Callout, Card, Chip, Kicker, PromptCard } from './ui';
import { Mockup } from './mockups';
import { Walkthrough } from './Walkthrough';
import { QuizEngine } from './QuizEngine';
import { Confetti } from './Confetti';

const STAGES = ['Warm-up', 'Learn', 'Practise', 'Quiz', 'Homework', 'Finish'] as const;

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'p':
      return <p className="text-[15px] leading-[1.75] text-ink/85">{block.text}</p>;
    case 'list':
      return (
        <ul className="space-y-2">
          {block.items.map((it) => (
            <li key={it} className="flex gap-2.5 text-[15px] leading-relaxed text-ink/85">
              <span className="mt-[3px] text-brand">•</span>
              {it}
            </li>
          ))}
        </ul>
      );
    case 'goodbad':
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-grass-soft/50 p-5 ring-1 ring-grass/15">
            <div className="mb-3 text-sm font-bold text-grass">✓ {block.goodTitle}</div>
            <ul className="space-y-2">
              {block.good.map((g) => (
                <li key={g} className="text-sm leading-relaxed text-ink/80">
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-coral-soft/50 p-5 ring-1 ring-coral/15">
            <div className="mb-3 text-sm font-bold text-coral">! {block.badTitle}</div>
            <ul className="space-y-2">
              {block.bad.map((b) => (
                <li key={b} className="text-sm leading-relaxed text-ink/80">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    case 'callout':
      return (
        <Callout tone={block.tone} title={block.title}>
          {block.text}
        </Callout>
      );
    case 'rules':
      return (
        <div className="grid gap-3">
          {block.rules.map((r, i) => (
            <div key={r.title} className="flex gap-4 rounded-xl bg-card p-4 ring-1 ring-ink/8 shadow-card">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-paper text-xl ring-1 ring-ink/8">
                {r.icon}
              </span>
              <div>
                <div className="text-sm font-bold text-ink">
                  <span className="mr-1.5 text-gold">{i + 1}.</span>
                  {r.title}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case 'figure':
      return (
        <figure>
          <Mockup id={block.mockup} />
          <figcaption className="mt-2 text-center text-xs text-ink-faint">{block.caption}</figcaption>
        </figure>
      );
    case 'prompt':
      return <PromptCard label={block.label} text={block.text} />;
  }
}

export function SessionRunner({ meta, content }: { meta: SessionMeta; content: BuiltSessionContent }) {
  const { state, hydrated, update, updateSession } = useProgress();
  const sp = state.sessions[meta.id] ?? {};
  const [stage, setStage] = useState(0);
  const [sectionIdx, setSectionIdx] = useState(0);
  const [nameDraft, setNameDraft] = useState('');
  const [resumed, setResumed] = useState(false);

  // Resume where they left off (completed sessions open at Finish/review)
  useEffect(() => {
    if (hydrated && !resumed) {
      const saved = state.sessions[meta.id];
      if (saved?.completedAt) setStage(STAGES.length - 1);
      else if (saved?.stage) setStage(saved.stage);
      setResumed(true);
    }
  }, [hydrated, resumed, state.sessions, meta.id]);

  function go(next: number) {
    setStage(next);
    updateSession(meta.id, (p) => ({ ...p, stage: next }));
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const points = sessionPoints(sp);
  const quizPass = sp.quiz ? sp.quiz.score / sp.quiz.total >= 0.7 : false;

  // ----- stage guards -----
  const saDone = (sp.selfAssessment?.filter((v) => v > 0).length ?? 0) === content.selfAssessment.items.length && Boolean(state.name);
  const practiceDone = content.walkthroughs.every(
    (w) => (sp.walkthroughSteps?.[w.id]?.filter(Boolean).length ?? 0) === w.steps.length,
  );
  const quizDone = Boolean(sp.quiz);

  // ----- finish side-effect -----
  useEffect(() => {
    if (stage === STAGES.length - 1 && resumed && !sp.completedAt) {
      updateSession(meta.id, (p) => ({ ...p, completedAt: new Date().toISOString() }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, resumed]);

  const mailto = useMemo(() => {
    const steps = content.walkthroughs.reduce(
      (n, w) => n + (sp.walkthroughSteps?.[w.id]?.filter(Boolean).length ?? 0),
      0,
    );
    const totalSteps = content.walkthroughs.reduce((n, w) => n + w.steps.length, 0);
    const hw = sp.homework?.filter(Boolean).length ?? 0;
    const sa = (sp.selfAssessment ?? [])
      .map((v, i) => `  • ${content.selfAssessment.items[i]}: ${v}/4`)
      .join('\n');
    const lines = [
      `AI-Ready Office — Session ${meta.id} (${meta.title}) results`,
      `Name: ${state.name ?? 'Not set'}`,
      '',
      `Quiz: ${sp.quiz ? `${sp.quiz.score}/${sp.quiz.total} (attempts: ${sp.quiz.attempts})` : 'not taken'}${sp.quiz && !quizPass ? '  ⚑ below 70% — some help would be great' : ''}`,
      `Walkthrough steps: ${steps}/${totalSteps}`,
      `Homework: ${hw}/${content.homework.tasks.length} ticked${hw < content.homework.tasks.length ? ' (finishing before next session)' : ''}`,
      `Points today: ${points}`,
      '',
      'Self-assessment (1 = not yet, 4 = very much):',
      sa,
      '',
      `Reflection: ${sp.reflection?.trim() || '—'}`,
      '',
      'Sent from the AI-Ready Office course app.',
    ];
    return `mailto:${clientConfig.championEmail}?subject=${encodeURIComponent(
      `AI-Ready Office — Day ${meta.day} — ${state.name ?? 'unnamed'}`,
    )}&body=${encodeURIComponent(lines.join('\n'))}`;
  }, [sp, state.name, content, meta, points, quizPass]);

  if (!hydrated || !resumed)
    return <div className="py-24 text-center text-sm text-ink-faint">Loading your session…</div>;

  return (
    <div>
      {/* stage rail */}
      <div className="sticky top-0 z-40 -mx-4 mb-8 border-b border-line bg-paper/85 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-1.5 overflow-x-auto">
            {STAGES.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => i < stage && go(i)}
                className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                  i === stage
                    ? 'bg-navy text-white'
                    : i < stage
                      ? 'bg-grass-soft text-grass'
                      : 'bg-ink/5 text-ink-faint'
                }`}
              >
                {i < stage ? '✓ ' : ''}
                {s}
              </button>
            ))}
          </div>
          <Chip tone="gold">★ {points} pts</Chip>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-8 pb-24">
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-8"
        >
            {/* ---------- WARM-UP ---------- */}
            {stage === 0 && (
              <>
                <div>
                  <Kicker>Day {meta.day} · Session {meta.id} of 10 · {meta.minutes} minutes</Kicker>
                  <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                    {meta.title}
                  </h1>
                  <p className="mt-4 max-w-2xl text-[15px] leading-[1.75] text-ink-soft">{content.welcome}</p>
                </div>

                {content.heroImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-ink/8"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={content.heroImage.src} alt={content.heroImage.alt} className="w-full" />
                  </motion.div>
                )}

                <Card>
                  <Kicker tone="gold">First things first</Kicker>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-ink">What&apos;s your first name?</h2>
                  <p className="mt-1 text-sm text-ink-soft">
                    It goes on your scorecards and your certificate. It stays in this browser — nothing is uploaded anywhere.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <input
                      value={state.name ?? nameDraft}
                      onChange={(e) => {
                        setNameDraft(e.target.value);
                        update((prev) => ({ ...prev, name: e.target.value || null }));
                      }}
                      placeholder="e.g. Sam"
                      className="w-56 rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/15 outline-none placeholder:font-normal placeholder:text-ink-faint focus:ring-2 focus:ring-brand"
                    />
                    {state.name ? <Chip tone="grass">✓ G&apos;day, {state.name}</Chip> : null}
                  </div>
                </Card>

                <Card>
                  <Kicker>Quick self-assessment · no wrong answers</Kicker>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-ink">Where are you starting from?</h2>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-soft">{content.selfAssessment.intro}</p>
                  <div className="mt-6 space-y-5">
                    {content.selfAssessment.items.map((item, i) => {
                      const val = sp.selfAssessment?.[i] ?? 0;
                      return (
                        <div key={i} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <span className="max-w-sm text-sm font-medium text-ink/85">{item}</span>
                          <div className="flex items-center gap-1.5">
                            <span className="mr-1 text-[10px] font-semibold uppercase text-ink-faint">Not yet</span>
                            {[1, 2, 3, 4].map((v) => (
                              <button
                                key={v}
                                type="button"
                                onClick={() =>
                                  updateSession(meta.id, (p) => {
                                    const arr = [...(p.selfAssessment ?? Array(content.selfAssessment.items.length).fill(0))];
                                    arr[i] = v;
                                    return { ...p, selfAssessment: arr };
                                  })
                                }
                                className={`h-9 w-9 rounded-full text-sm font-bold ring-1 transition-all ${
                                  val === v
                                    ? 'bg-brand text-white ring-brand scale-105'
                                    : 'bg-card text-ink-soft ring-ink/15 hover:ring-brand/50'
                                }`}
                              >
                                {v}
                              </button>
                            ))}
                            <span className="ml-1 text-[10px] font-semibold uppercase text-ink-faint">Very</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                <div className="flex justify-end">
                  <Button size="lg" disabled={!saDone} onClick={() => go(1)}>
                    Start the lesson →
                  </Button>
                </div>
                {!saDone && (
                  <p className="text-right text-xs text-ink-faint">Pop your name in and rate all five to continue.</p>
                )}
              </>
            )}

            {/* ---------- LEARN ---------- */}
            {stage === 1 && (
              <>
                <div className="flex items-center justify-between">
                  <Kicker>Lesson · part {sectionIdx + 1} of {content.sections.length}</Kicker>
                  <div className="flex gap-1.5">
                    {content.sections.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSectionIdx(i)}
                        aria-label={`Lesson part ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                          i === sectionIdx ? 'w-8 bg-brand' : i < sectionIdx ? 'w-4 bg-brand/40' : 'w-4 bg-ink/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {(() => {
                  const s = content.sections[sectionIdx];
                  return (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      <div>
                        <Kicker tone="gold">{s.kicker}</Kicker>
                        <h2 className="mt-1 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                          {s.title}
                        </h2>
                      </div>
                      <div className="space-y-5">
                        {s.blocks.map((b, i) => (
                          <BlockView key={i} block={b} />
                        ))}
                      </div>
                      <div className="rounded-xl bg-navy p-4 text-sm text-white/90">
                        <span className="mr-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                          Key point
                        </span>
                        {s.keyPoint}
                      </div>
                    </motion.div>
                  );
                })()}

                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={() => (sectionIdx === 0 ? go(0) : setSectionIdx(sectionIdx - 1))}
                  >
                    ← Back
                  </Button>
                  {sectionIdx + 1 < content.sections.length ? (
                    <Button onClick={() => setSectionIdx(sectionIdx + 1)}>Got it — next →</Button>
                  ) : (
                    <Button size="lg" onClick={() => go(2)}>
                      Time to try it yourself →
                    </Button>
                  )}
                </div>
              </>
            )}

            {/* ---------- PRACTISE ---------- */}
            {stage === 2 && (
              <>
                <div>
                  <Kicker>Hands on · tick every step</Kicker>
                  <h2 className="mt-1 font-display text-3xl font-semibold text-ink sm:text-4xl">
                    Do this, then that
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
                    Work through both walkthroughs at your own machine. Made-up details only — and if anything doesn&apos;t
                    look like the pictures, wave your champion over.
                  </p>
                </div>
                {content.walkthroughs.map((w) => (
                  <Walkthrough
                    key={w.id}
                    def={w}
                    checked={sp.walkthroughSteps?.[w.id] ?? Array(w.steps.length).fill(false)}
                    onToggle={(i) =>
                      updateSession(meta.id, (p) => {
                        const map = { ...(p.walkthroughSteps ?? {}) };
                        const arr = [...(map[w.id] ?? Array(w.steps.length).fill(false))];
                        arr[i] = !arr[i];
                        map[w.id] = arr;
                        return { ...p, walkthroughSteps: map };
                      })
                    }
                  />
                ))}
                <div className="flex items-center justify-between">
                  <Button variant="ghost" onClick={() => go(1)}>
                    ← Back to the lesson
                  </Button>
                  <Button size="lg" disabled={!practiceDone} onClick={() => go(3)}>
                    All done — quiz time →
                  </Button>
                </div>
                {!practiceDone && (
                  <p className="text-right text-xs text-ink-faint">Tick every step in both walkthroughs to continue.</p>
                )}
              </>
            )}

            {/* ---------- QUIZ ---------- */}
            {stage === 3 && (
              <>
                <div>
                  <Kicker>Quick quiz · {content.quiz.length} questions · 70% to pass</Kicker>
                  <h2 className="mt-1 font-display text-3xl font-semibold text-ink sm:text-4xl">Show what stuck</h2>
                  <p className="mt-2 text-sm text-ink-soft">
                    Instant feedback on every answer. Miss the pass mark? Retake it — your best score counts.
                  </p>
                </div>
                <QuizEngine
                  questions={content.quiz}
                  onFinish={(score, total) =>
                    updateSession(meta.id, (p) => ({
                      ...p,
                      quiz: {
                        score: Math.max(score, p.quiz?.score ?? 0),
                        total,
                        attempts: (p.quiz?.attempts ?? 0) + 1,
                      },
                    }))
                  }
                />
                <div className="flex items-center justify-between">
                  <Button variant="ghost" onClick={() => go(2)}>
                    ← Back
                  </Button>
                  <Button size="lg" disabled={!quizDone} onClick={() => go(4)}>
                    Continue →
                  </Button>
                </div>
              </>
            )}

            {/* ---------- HOMEWORK ---------- */}
            {stage === 4 && (
              <>
                <div>
                  <Kicker>Homework · about {content.homework.estMinutes} minutes · before next session</Kicker>
                  <h2 className="mt-1 font-display text-3xl font-semibold text-ink sm:text-4xl">Keep the streak going</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{content.homework.intro}</p>
                </div>
                <Card>
                  <div className="space-y-4">
                    {content.homework.tasks.map((t, i) => {
                      const done = sp.homework?.[i] ?? false;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() =>
                            updateSession(meta.id, (p) => {
                              const arr = [...(p.homework ?? Array(content.homework.tasks.length).fill(false))];
                              arr[i] = !arr[i];
                              return { ...p, homework: arr };
                            })
                          }
                          className={`flex w-full gap-4 rounded-xl p-4 text-left ring-1 transition-all ${
                            done ? 'bg-grass-soft/50 ring-grass/25' : 'bg-card ring-ink/10 hover:ring-brand/40'
                          }`}
                        >
                          <span
                            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold ring-2 ${
                              done ? 'bg-grass text-white ring-grass' : 'bg-card text-transparent ring-ink/20'
                            }`}
                          >
                            ✓
                          </span>
                          <span>
                            <span className={`block text-sm font-bold ${done ? 'text-ink/60' : 'text-ink'}`}>{t.title}</span>
                            <span className="mt-0.5 block text-sm leading-relaxed text-ink-soft">{t.detail}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-5 rounded-xl bg-coral-soft/60 px-4 py-3 text-xs font-semibold text-coral ring-1 ring-coral/15">
                    Example data only — no real customer details, ever. Jane Citizen has you covered.
                  </div>
                </Card>
                <Card>
                  <Kicker tone="gold">One-line reflection · goes to your champion</Kicker>
                  <label className="mt-2 block text-sm font-semibold text-ink">{content.homework.reflectionPrompt}</label>
                  <textarea
                    value={sp.reflection ?? ''}
                    onChange={(e) => updateSession(meta.id, (p) => ({ ...p, reflection: e.target.value }))}
                    rows={2}
                    placeholder="Finish the sentence in your own words…"
                    className="mt-3 w-full rounded-xl bg-paper p-4 text-sm leading-relaxed text-ink ring-1 ring-ink/15 outline-none placeholder:text-ink-faint focus:ring-2 focus:ring-brand"
                  />
                </Card>
                <div className="flex items-center justify-between">
                  <Button variant="ghost" onClick={() => go(3)}>
                    ← Back
                  </Button>
                  <Button size="lg" variant="gold" onClick={() => go(5)}>
                    Finish Day {meta.day} 🎉
                  </Button>
                </div>
                <p className="text-right text-xs text-ink-faint">
                  Homework can be ticked off later — your ticks are saved.
                </p>
              </>
            )}

            {/* ---------- FINISH ---------- */}
            {stage === 5 && (
              <>
                <Confetti />
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.15 }}
                    className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-gold to-[#F59E0B] text-5xl shadow-lift ring-8 ring-gold-soft"
                  >
                    {meta.badge.emoji}
                  </motion.div>
                  <Kicker tone="gold">Badge earned · {meta.badge.name}</Kicker>
                  <h2 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
                    Day {meta.day} done{state.name ? `, ${state.name}` : ''}!
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
                    You&apos;ve met your new teammate, learned the Golden Rules and held your first real conversations.
                    {meta.id < 10 ? ' Same time tomorrow.' : ''}
                  </p>
                </div>

                <Card>
                  <Kicker>Your Day {meta.day} scorecard</Kicker>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { label: 'Quiz', value: sp.quiz ? `${sp.quiz.score}/${sp.quiz.total}` : '—' },
                      {
                        label: 'Steps',
                        value: `${content.walkthroughs.reduce((n, w) => n + (sp.walkthroughSteps?.[w.id]?.filter(Boolean).length ?? 0), 0)}/${content.walkthroughs.reduce((n, w) => n + w.steps.length, 0)}`,
                      },
                      { label: 'Homework', value: `${sp.homework?.filter(Boolean).length ?? 0}/${content.homework.tasks.length}` },
                      { label: 'Points', value: `★ ${points}` },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl bg-paper p-4 text-center ring-1 ring-ink/8">
                        <div className="font-display text-2xl font-semibold text-ink">{s.value}</div>
                        <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  {sp.quiz && !quizPass && (
                    <div className="mt-4 rounded-xl bg-gold-soft/70 p-4 text-sm leading-relaxed text-ink/80 ring-1 ring-gold/20">
                      <b>No stress.</b> Day 1 covers a lot. Grab ten minutes with {clientConfig.championName} before
                      tomorrow, skim the lesson once more, and retake the quiz — your best score is the one that counts.
                    </div>
                  )}
                </Card>

                <Card className="text-center">
                  <h3 className="font-display text-2xl font-semibold text-ink">Send your results to {clientConfig.championName}</h3>
                  <p className="mx-auto mt-1 max-w-md text-sm text-ink-soft">
                    One click opens a pre-filled email with your scorecard — nothing is sent automatically, you press send.
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-3">
                    <Button size="lg" href={mailto}>
                      ✉️ Email my Day {meta.day} results
                    </Button>
                    <Button size="lg" variant="secondary" href="/">
                      Back to the course map
                    </Button>
                  </div>
                  <p className="mt-4 text-xs text-ink-faint">
                    Still ticking off homework tonight? Come back to this page — your scorecard updates.
                  </p>
                </Card>

                <div className="text-center">
                  <Link href="/" className="text-sm font-semibold text-brand hover:underline">
                    {meta.id < 10 ? `Next up — Day ${meta.day + 1}: unlocked on the course map →` : 'See your certificate →'}
                  </Link>
                </div>
              </>
            )}
        </motion.div>
      </div>
    </div>
  );
}
