import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { Disclaimer } from '../components/Disclaimer'
import { useLoan } from '../context/LoanContext'
import { formatINR } from '../lib/format'
import { TRACK_INTERVAL_MS, TRACK_LAST_STEP, TRACK_STEPS, getStepState } from '../lib/tracking'

const OUTCOME_STYLES = {
  offer: 'border-ok/40 bg-ok-soft',
  more_docs: 'border-warn/40 bg-warn-soft',
  not_eligible: 'border-bad/40 bg-bad-soft',
}

export function ApplicationTracker() {
  const {
    application,
    documentFiles,
    estimate,
    advanceApplication,
    isBusinessComplete,
    isFinancialComplete,
    t,
  } = useLoan()

  useEffect(() => {
    if (!application.submitted || application.stepIndex >= TRACK_LAST_STEP) return undefined
    const timer = window.setInterval(() => {
      advanceApplication()
    }, TRACK_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [application.submitted, application.stepIndex, advanceApplication])

  if (!isBusinessComplete) {
    return <Navigate to="/check/business" replace />
  }

  if (!isFinancialComplete) {
    return <Navigate to="/check/financial" replace />
  }

  if (!application.submitted) {
    return <Navigate to="/check/documents" replace />
  }

  const decided = application.stepIndex >= TRACK_LAST_STEP && application.outcome
  const files = Object.values(documentFiles)
  const outcome = application.outcome

  return (
    <AppShell backTo="/" backLabel={t('common.backHome')}>
      <p className="inline-flex rounded-full bg-gold-soft px-3 py-1 text-[12px] font-semibold text-gold-dark">
        {t('track.demoBadge')}
      </p>
      <h1 className="mt-3 font-serif text-[34px] leading-10 text-ink">{t('track.title')}</h1>
      <p className="mt-3 text-[15px] leading-6 text-muted">{t('track.help')}</p>

      {decided ? (
        <div className={`mt-6 rounded-[20px] border p-5 ${OUTCOME_STYLES[outcome] ?? 'border-line bg-card'}`}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gold-dark">
            {t('track.resultLabel')}
          </p>
          <p className="mt-2 font-serif text-[26px] leading-8 text-ink">{t(`track.outcome.${outcome}`)}</p>
          <p className="mt-2 text-[14px] leading-6 text-muted">{t(`track.outcomeHelp.${outcome}`)}</p>
          {outcome === 'offer' && estimate.ok ? (
            <p className="mt-4 text-[16px] font-semibold text-ink">
              {t('track.offerRange', { range: `${formatINR(estimate.min)} – ${formatINR(estimate.max)}` })}
            </p>
          ) : null}
        </div>
      ) : (
        <p className="mt-6 text-[14px] font-semibold text-gold-dark">{t('track.liveHint')}</p>
      )}

      <ol className="relative mt-8">
        {TRACK_STEPS.map((step, index) => {
          const state = getStepState(application.stepIndex, index)
          return (
            <li key={step.id} className="relative flex gap-4 pb-6 last:pb-0">
              {index < TRACK_STEPS.length - 1 ? (
                <span className="absolute top-10 bottom-0 left-[15px] w-px bg-line" />
              ) : null}
              <span
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold ${
                  state === 'done'
                    ? 'bg-ok text-white'
                    : state === 'current'
                      ? 'bg-brand text-white'
                      : 'bg-line text-muted'
                }`}
              >
                {state === 'done' ? '✓' : index + 1}
              </span>
              <div
                className={`min-w-0 flex-1 rounded-[20px] border p-4 ${
                  state === 'done'
                    ? 'border-ok/30 bg-ok-soft'
                    : state === 'current'
                      ? 'border-ink bg-card shadow-card'
                      : 'border-line bg-card'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-[16px] font-semibold text-ink">{t(step.titleKey)}</h2>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      state === 'done'
                        ? 'bg-ok text-white'
                        : state === 'current'
                          ? 'bg-brand text-white'
                          : 'bg-canvas text-muted'
                    }`}
                  >
                    {t(`track.state.${state}`)}
                  </span>
                </div>
                <p className="mt-1 text-[14px] leading-6 text-muted">{t(step.bodyKey)}</p>
              </div>
            </li>
          )
        })}
      </ol>

      {files.length ? (
        <section className="mt-6 rounded-[20px] border border-line bg-card p-5">
          <h2 className="text-[14px] font-semibold text-ink">{t('track.files')}</h2>
          <ul className="mt-3 space-y-2">
            {Object.entries(documentFiles).map(([id, file]) => (
              <li key={id} className="text-[14px] text-muted">
                {file.name}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[12px] leading-5 text-muted">{t('track.filesNote')}</p>
        </section>
      ) : (
        <p className="mt-6 text-[14px] leading-6 text-muted">{t('track.noFiles')}</p>
      )}

      <Disclaimer className="mt-5">{t('track.disclaimer')}</Disclaimer>
    </AppShell>
  )
}
