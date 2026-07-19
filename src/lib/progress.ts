'use client';

import { useCallback, useEffect, useState } from 'react';

export interface SessionProgress {
  selfAssessment?: number[]; // 1–4 per item
  walkthroughSteps?: Record<string, boolean[]>;
  quiz?: { score: number; total: number; attempts: number };
  homework?: boolean[];
  reflection?: string;
  stage?: number; // resume point within the session
  completedAt?: string;
}

export interface ProgressState {
  name: string | null;
  sessions: Record<number, SessionProgress>;
}

const KEY = 'aro-progress-v1';
const EMPTY: ProgressState = { name: null, sessions: {} };

function load(): ProgressState {
  if (typeof window === 'undefined') return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

/** Points: 5/walkthrough step, 10/correct quiz answer, 10/homework task, 10 self-assessment, 50 completion bonus */
export function sessionPoints(p: SessionProgress | undefined): number {
  if (!p) return 0;
  let pts = 0;
  if (p.selfAssessment?.length) pts += 10;
  if (p.walkthroughSteps)
    for (const steps of Object.values(p.walkthroughSteps)) pts += steps.filter(Boolean).length * 5;
  if (p.quiz) pts += p.quiz.score * 10;
  if (p.homework) pts += p.homework.filter(Boolean).length * 10;
  if (p.completedAt) pts += 50;
  return pts;
}

export function totalPoints(s: ProgressState): number {
  return Object.values(s.sessions).reduce((sum, p) => sum + sessionPoints(p), 0);
}

export function completedCount(s: ProgressState): number {
  return Object.values(s.sessions).filter((p) => p.completedAt).length;
}

export function isSessionComplete(s: ProgressState, id: number): boolean {
  return Boolean(s.sessions[id]?.completedAt);
}

/** Session 1 always unlocked; each later session unlocks when the previous is complete. */
export function isSessionUnlocked(s: ProgressState, id: number): boolean {
  if (id <= 1) return true;
  return isSessionComplete(s, id - 1);
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(EMPTY);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(load());
    setHydrated(true);
    const onChange = () => setState(load());
    window.addEventListener('aro-progress', onChange);
    return () => window.removeEventListener('aro-progress', onChange);
  }, []);

  const update = useCallback((fn: (prev: ProgressState) => ProgressState) => {
    setState((prev) => {
      const next = fn(prev);
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
        queueMicrotask(() => window.dispatchEvent(new Event('aro-progress')));
      } catch {
        /* private browsing — keep in memory */
      }
      return next;
    });
  }, []);

  const updateSession = useCallback(
    (id: number, fn: (prev: SessionProgress) => SessionProgress) => {
      update((prev) => ({
        ...prev,
        sessions: { ...prev.sessions, [id]: fn(prev.sessions[id] ?? {}) },
      }));
    },
    [update],
  );

  return { state, hydrated, update, updateSession };
}
