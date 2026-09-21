import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { PrimaryButton, SecondaryButton } from '../components/Buttons'
import { useLoan } from '../context/LoanContext'
import { ANALYTICS_EVENTS, track } from '../lib/analytics'
import { formatINR } from '../lib/format'
import { getRepaymentPlans } from '../lib/repayment'
import { buildShareText } from '../lib/summary'

export function ReadinessSummary() {
  const { estimate, documents, lead, isBusinessComplete, isFinancialComplete, t } = useLoan()
  const [notice, setNotice] = useState('')

  if (!isBusinessComplete) {
    return <Navigate to="/check/business" replace />
  }

  if (!isFinancialComplete) {
    return <Navigate to="/check/financial" replace />
  }

  const allDocs = [...documents.requiredNow, ...documents.later]
  const shareText = buildShareText(t, { estimate, documents })
  const plans = estimate.ok ? getRepaymentPlans(estimate.min, estimate.max) : []

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'LoanReady', text: shareText })
        track(ANALYTICS_EVENTS.SUMMARY_SHARED, { method: 'web_share' })
        return
      } catch {
        // User cancelled or share failed; show fallbacks.
      }
    }
    setNotice('fallback')
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareText)
      setNotice(t('summary.copied'))
      track(ANALYTICS_EVENTS.SUMMARY_SHARED, { method: 'copy' })
    } catch {
      setNotice(shareText)
    }
  }

  function handlePrint() {
    track(ANALYTICS_EVENTS.SUMMARY_PRINTED)
    window.print()
  }

  return (
    <AppShell backTo="/check/result">
      <h1 className="font-serif text-[34px] leading-10 text-ink">{t('summary.title')}</h1>
      <p className="mt-3 text-[15px] leading-6 text-muted">{t('summary.subtitle')}</p>

      <div className="mt-8 space-y-4 rounded-[20px] border border-line bg-card p-5 shadow-card">
        <SummaryRow
          label={t('summary.range')}
          value={
            estimate.ok
              ? `${formatINR(estimate.min)} – ${formatINR(estimate.max)}`
              : t('confirm.noRange')
          }
        />
        {plans.map((plan) => (
          <SummaryRow
            key={plan.months}
            label={t(plan.titleKey)}
            value={`${formatINR(plan.emi)} ${t('plans.perMonth')} · ${t('plans.rateValue', { rate: String(plan.ratePercent) })} · ${t('plans.interestOfLoan', { percent: String(plan.interestPercent) })}`}
          />
        ))}
        {lead.submitted ? (
          <SummaryRow
            label={t('confirm.lead')}
            value={t('confirm.leadValue', { name: lead.name, mobile: lead.mobile, city: lead.city })}
          />
        ) : null}
        <div>
          <p className="text-[13px] text-muted">{t('summary.documents')}</p>
          <ul className="mt-2 space-y-1">
            {allDocs.map((item) => (
              <li key={item.id} className="text-[15px] font-semibold text-ink">
                {t(`doc.${item.id}.title`)}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-[13px] leading-5 text-muted">{t('summary.disclaimer')}</p>
      </div>

      <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2 print:hidden">
        <PrimaryButton onClick={handlePrint}>{t('summary.print')}</PrimaryButton>
        <SecondaryButton onClick={handleShare}>{t('summary.share')}</SecondaryButton>
        <SecondaryButton onClick={handleCopy}>{t('summary.copy')}</SecondaryButton>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => track(ANALYTICS_EVENTS.SUMMARY_SHARED, { method: 'whatsapp' })}
          className="inline-flex w-full items-center justify-center rounded-xl border border-line bg-card px-5 py-3.5 text-[15px] font-semibold text-ink hover:border-gold"
        >
          {t('summary.whatsapp')}
        </a>
      </div>

      {notice && notice !== 'fallback' ? (
        <p className="mt-4 rounded-xl bg-gold-soft px-4 py-3 text-[14px] text-gold-dark print:hidden">
          {notice}
        </p>
      ) : null}
    </AppShell>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div>
      <p className="text-[13px] text-muted">{label}</p>
      <p className="mt-1 text-[20px] font-semibold text-ink">{value}</p>
    </div>
  )
}
