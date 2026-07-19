'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { QuizQuestion } from '@/content/types';
import { Button, Card, Chip } from './ui';

export function QuizEngine({
  questions,
  onFinish,
  passMark = 0.7,
}: {
  questions: QuizQuestion[];
  onFinish: (score: number, total: number) => void;
  passMark?: number;
}) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const q = questions[idx];
  const score = answers.filter((a, i) => a === questions[i].correct).length;

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    setAnswers((prev) => [...prev, i]);
  }

  function next() {
    if (idx + 1 < questions.length) {
      setIdx(idx + 1);
      setPicked(null);
    } else {
      setDone(true);
      onFinish(score, questions.length);
    }
  }

  function retake() {
    setIdx(0);
    setPicked(null);
    setAnswers([]);
    setDone(false);
  }

  if (done) {
    const pct = score / questions.length;
    const passed = pct >= passMark;
    return (
      <Card className="text-center">
        <div className="font-display text-5xl">{passed ? '🎯' : '💪'}</div>
        <h3 className="mt-3 font-display text-3xl font-semibold text-ink">
          {score} / {questions.length}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
          {passed
            ? 'Strong work — that’s a pass. Your score goes on your Day 1 scorecard.'
            : 'Below the 70% pass mark — completely fine on Day 1. Skim the lesson again or grab your champion, then retake. Your best score counts.'}
        </p>
        <div className="mt-5 flex justify-center gap-3">
          {!passed && (
            <Button variant="secondary" onClick={retake}>
              Retake the quiz
            </Button>
          )}
          {passed && (
            <Button variant="ghost" onClick={retake}>
              Retake for a better score
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <Chip tone="brand">
          Question {idx + 1} of {questions.length}
        </Chip>
        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-5 rounded-full transition-colors ${
                i < idx
                  ? answers[i] === questions[i].correct
                    ? 'bg-grass'
                    : 'bg-coral'
                  : i === idx
                    ? 'bg-brand'
                    : 'bg-ink/10'
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div
        key={idx}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.22 }}
      >
          <h3 className="font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">{q.q}</h3>
          <div className="mt-5 grid gap-2.5">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correct;
              const isPicked = picked === i;
              let style = 'bg-card ring-ink/10 hover:ring-brand/40 hover:bg-brand-soft/30';
              if (picked !== null) {
                if (isCorrect) style = 'bg-grass-soft ring-grass/40';
                else if (isPicked) style = 'bg-coral-soft ring-coral/40';
                else style = 'bg-card ring-ink/5 opacity-50';
              }
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => pick(i)}
                  className={`flex items-start gap-3 rounded-xl p-4 text-left text-sm leading-relaxed text-ink ring-1 transition-all ${style}`}
                >
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      picked !== null && isCorrect
                        ? 'bg-grass text-white'
                        : picked !== null && isPicked
                          ? 'bg-coral text-white'
                          : 'bg-paper-deep text-ink-soft'
                    }`}
                  >
                    {picked !== null && isCorrect ? '✓' : picked !== null && isPicked ? '✕' : String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {picked !== null && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
              <div
                className={`rounded-xl p-4 text-sm leading-relaxed ring-1 ${
                  picked === q.correct ? 'bg-grass-soft/70 ring-grass/25 text-ink/80' : 'bg-gold-soft/70 ring-gold/25 text-ink/80'
                }`}
              >
                <span className="font-bold">{picked === q.correct ? 'Correct. ' : 'Not quite. '}</span>
                {q.explain}
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={next}>{idx + 1 < questions.length ? 'Next question →' : 'See my result'}</Button>
              </div>
            </motion.div>
          )}
      </motion.div>
    </Card>
  );
}
