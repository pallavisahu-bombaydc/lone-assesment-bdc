import { useLoan } from '../context/LoanContext'

export function ProgressBar({ step, total = 4 }) {
  const { t } = useLoan()
  const labels = [
    t('progress.business'),
    t('progress.income'),
    t('progress.result'),
    t('progress.documents'),
  ]
  const percent = Math.min(100, Math.round((step / total) * 100))

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between text-[13px] text-muted">
        <span>
          {t('progress.step', { step, total })}
          {labels[step - 1] ? ` · ${labels[step - 1]}` : ''}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-brand transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="grid grid-cols-4 gap-1 text-center text-[11px] font-medium sm:text-[12px]">
        {labels.map((label, index) => {
          const current = index + 1
          const done = current < step
          const active = current === step
          return (
            <span
              key={label}
              className={active ? 'text-ink' : done ? 'text-gold-dark' : 'text-muted/70'}
            >
              {label}
            </span>
          )
        })}
      </div>
    </div>
  )
}
