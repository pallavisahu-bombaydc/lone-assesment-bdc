import { useLoan } from '../context/LoanContext'
import { CheckMark } from './Icons'

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
    <div className="rounded-[20px] border border-line bg-card px-4 py-4 shadow-card sm:px-6">
      <div className="mb-4 flex items-center justify-between text-[13px] text-muted">
        <span>
          {t('progress.step', { step, total })}
          {labels[step - 1] ? ` · ${labels[step - 1]}` : ''}
        </span>
        <span className="font-semibold text-brand">{percent}%</span>
      </div>
      <div className="flex items-center">
        {labels.map((label, index) => {
          const current = index + 1
          const done = current < step
          const active = current === step
          return (
            <div key={label} className="flex min-w-0 flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-semibold transition ${
                    done
                      ? 'bg-brand text-white'
                      : active
                        ? 'bg-brand text-white shadow-[0_0_0_4px_#e4f0ea]'
                        : 'border border-line bg-canvas text-muted'
                  }`}
                >
                  {done ? <CheckMark className="h-4 w-4" /> : current}
                </span>
                <span
                  className={`mt-2 hidden text-center text-[11px] font-medium sm:block ${
                    active ? 'text-ink' : done ? 'text-brand' : 'text-muted/70'
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < labels.length - 1 ? (
                <div
                  className={`mx-2 h-0.5 min-w-4 flex-1 rounded-full ${current < step ? 'bg-brand' : 'bg-line'}`}
                />
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
