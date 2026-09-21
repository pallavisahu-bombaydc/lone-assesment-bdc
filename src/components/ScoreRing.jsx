export function ScoreRing({ score, label }) {
  const size = 112
  const stroke = 8
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="flex w-[132px] shrink-0 flex-col items-center">
      <div className="relative h-[112px] w-[112px]">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#d9d3c9"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1b4d3e"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-serif text-[28px] leading-none text-ink">{score}</p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
            / 100
          </p>
        </div>
      </div>
      <p className="mt-2 text-center text-[12px] font-medium text-muted">{label}</p>
    </div>
  )
}
