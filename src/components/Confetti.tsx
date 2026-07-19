'use client';

import { useEffect, useState } from 'react';

interface Piece {
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotate: number;
  round: boolean;
}

const COLORS = ['#2563EB', '#D97706', '#15803D', '#F59E0B', '#93C5FD', '#0E1A2E'];

export function Confetti({ count = 90 }: { count?: number }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    setPieces(
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2.6 + Math.random() * 2,
        color: COLORS[i % COLORS.length],
        size: 6 + Math.random() * 7,
        rotate: Math.random() * 360,
        round: Math.random() > 0.6,
      })),
    );
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece absolute top-[-4%]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.round ? p.size : p.size * 0.45,
            background: p.color,
            borderRadius: p.round ? '50%' : '2px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
