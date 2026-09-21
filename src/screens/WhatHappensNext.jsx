import { Navigate, useNavigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { PrimaryButton } from '../components/Buttons'
import { useLoan } from '../context/LoanContext'
import { getDecision } from '../lib/decision'

const TIMELINE = [
  { titleKey: 'next.s1Title', bodyKey: 'next.s1Body' },
  { titleKey: 'next.s2Title', bodyKey: 'next.s2Body' },
  { titleKey: 'next.s3Title', bodyKey: 'next.s3Body' },
  { titleKey: 'next.s4Title', bodyKey: 'next.s4Body' },
  { titleKey: 'next.s5Title', bodyKey: 'next.s5Body' },
]

export function WhatHappensNext() {
  const navigate = useNavigate()
  const { isBusinessComplete, isFinancialComplete, application, estimate, profile, userIntent, t } =
    useLoan()

  if (!isBusinessComplete) {
    return <Navigate to="/check/business" replace />
  }

  if (!isFinancialComplete) {
    return <Navigate to="/check/financial" replace />
  }

  const canApply =
    userIntent === 'apply' ||
    (!userIntent &&
      getDecision({
        vintage: profile.vintage,
        estimate,
        revenue: profile.revenue,
        emi: profile.emi,
      }).id === 'apply')

  return (
    <AppShell backTo="/check/documents" backLabel={t('common.backDocuments')}>
      <h1 className="font-serif text-[34px] leading-10 text-ink">{t('next.title')}</h1>
      <p className="mt-3 text-[15px] leading-6 text-muted">{t('next.help')}</p>

      <ol className="relative mt-8 space-y-0">
        {TIMELINE.map((step, index) => (
          <li key={step.titleKey} className="relative flex gap-4 pb-6 last:pb-0">
            {index < TIMELINE.length - 1 ? (
              <span className="absolute top-10 bottom-0 left-[15px] w-px bg-line" />
            ) : null}
            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-[13px] font-semibold text-white">
              {index + 1}
            </span>
            <div className="rounded-[20px] border border-line bg-card p-4 shadow-card">
              <h2 className="text-[16px] font-semibold text-ink">{t(step.titleKey)}</h2>
              <p className="mt-1 text-[14px] leading-6 text-muted">{t(step.bodyKey)}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8">
        {application.submitted ? (
          <PrimaryButton className="max-w-sm" onClick={() => navigate('/track')}>
            {t('track.nav')}
          </PrimaryButton>
        ) : canApply ? (
          <PrimaryButton className="max-w-sm" onClick={() => navigate('/check/documents')}>
            {t('docs.submitDemo')}
          </PrimaryButton>
        ) : (
          <PrimaryButton className="max-w-sm" onClick={() => navigate('/check/result')}>
            {t('docs.backResult')}
          </PrimaryButton>
        )}
      </div>
    </AppShell>
  )
}
