'use client';

import Link from 'next/link';
import { getSession } from '@/content/curriculum';
import { session01 } from '@/content/session-01';
import type { BuiltSessionContent } from '@/content/types';
import { isSessionUnlocked, useProgress } from '@/lib/progress';
import { SessionRunner } from './SessionRunner';
import { Button, Card, Chip, Kicker } from './ui';

const BUILT: Record<number, BuiltSessionContent> = { 1: session01 };

export function SessionView({ id }: { id: number }) {
  const meta = getSession(id);
  const { state, hydrated } = useProgress();

  if (!meta) {
    return (
      <div className="py-24 text-center">
        <p className="text-ink-soft">That session doesn&apos;t exist.</p>
        <Link href="/" className="mt-3 inline-block font-semibold text-brand hover:underline">
          Back to the course map →
        </Link>
      </div>
    );
  }

  const content = BUILT[meta.id];
  const unlocked = hydrated && isSessionUnlocked(state, meta.id);

  if (content && (unlocked || !hydrated)) {
    return <SessionRunner meta={meta} content={content} />;
  }

  // Outline / locked view
  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-24 pt-4">
      <div>
        <Kicker>
          Day {meta.day} · Session {meta.id} of 10 · {meta.minutes} minutes
        </Kicker>
        <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">{meta.title}</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{meta.subtitle}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {hydrated && !unlocked && <Chip tone="neutral">🔒 Unlocks when Day {meta.id - 1} is complete</Chip>}
          {meta.status === 'outline' && <Chip tone="gold">Outline — full content builds after Session 1 sign-off</Chip>}
        </div>
      </div>

      <Card>
        <Kicker tone="gold">By the end of this session, you will…</Kicker>
        <ul className="mt-4 space-y-3">
          {meta.outcomes.map((o) => (
            <li key={o} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand-deep">
                ✓
              </span>
              {o}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="bg-paper-deep/60">
        <div className="flex items-start gap-4">
          <span className="text-3xl">{meta.badge.emoji}</span>
          <div>
            <div className="text-sm font-bold text-ink">Badge on completion: {meta.badge.name}</div>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">
              Every session follows the same rhythm: warm-up, lesson, hands-on walkthroughs, quiz, homework — then your
              scorecard goes to your champion and the next day unlocks.
            </p>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="secondary" href="/">
          ← Course map
        </Button>
        {hydrated && !unlocked && meta.id > 1 && (
          <Button href={`/session/${meta.id - 1}/`}>Go to Day {meta.id - 1} →</Button>
        )}
      </div>
    </div>
  );
}
