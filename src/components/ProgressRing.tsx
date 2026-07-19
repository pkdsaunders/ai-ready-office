'use client';

export function ProgressRing({
  value,
  max,
  size = 120,
  stroke = 10,
  label,
  sublabel,
  dark = false,
}: {
  value: number;
  max: number;
  size?: number;
  stroke?: number;
  label: string;
  sublabel?: string;
  dark?: boolean;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = max > 0 ? Math.min(1, value / max) : 0;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={dark ? 'rgba(255,255,255,0.14)' : 'rgba(20,32,51,0.08)'}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          style={{ transition: 'stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)' }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className={`font-display text-2xl font-semibold ${dark ? 'text-white' : 'text-ink'}`}>{label}</span>
        {sublabel ? (
          <span
            className={`text-[10px] font-semibold uppercase tracking-wider ${dark ? 'text-white/50' : 'text-ink-faint'}`}
          >
            {sublabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}
