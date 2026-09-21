import { Navigate, useNavigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { PrimaryButton, SecondaryButton } from '../components/Buttons'
import { CheckIcon } from '../components/Icons'
import { Disclaimer } from '../components/Disclaimer'
import { useLoan } from '../context/LoanContext'
import { formatINR } from '../lib/format'

export function ApplicationConfirmation() {
  const navigate = useNavigate()
  const {
    estimate,
    documents,
    lead,
    applicationStarted,
    application,
    documentFiles,
    markApplicationStarted,
    submitApplication,
    isBusinessComplete,
    isFinancialComplete,
    t,
  } = useLoan()

  if (!isBusinessComplete) {
    return <Navigate to="/check/business" replace />
  }

  if (!isFinancialComplete) {
    return <Navigate to="/check/financial" replace />
  }

  const documentCount = documents.requiredNow.length + documents.later.length
  const attachedCount = Object.keys(documentFiles).length

  function handleContinue() {
    if (application.submitted) {
      navigate('/track')
      return
    }
    markApplicationStarted()
    submitApplication()
    navigate('/track')
  }

  return (
    <AppShell backTo="/next-steps" backLabel={t('common.backNextSteps')}>
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-soft text-gold-dark">
        <CheckIcon className="h-6 w-6" />
      </div>
      <h1 className="font-serif text-[34px] leading-10 text-ink">{t('confirm.title')}</h1>
      <p className="mt-3 text-[15px] leading-6 text-muted">{t('confirm.help')}</p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <SummaryCard
          label={t('confirm.range')}
          value={
            estimate.ok
              ? `${formatINR(estimate.min)} – ${formatINR(estimate.max)}`
              : t('confirm.noRange')
          }
        />
        <SummaryCard label={t('confirm.docs')} value={t('confirm.docsValue', { count: documentCount })} />
        <SummaryCard
          label={t('confirm.status')}
          value={
            application.submitted
              ? t('confirm.statusSubmitted')
              : applicationStarted
                ? t('confirm.statusStarted')
                : t('confirm.statusPending')
          }
        />
        <SummaryCard
          label={t('confirm.attached')}
          value={t('confirm.attachedValue', { count: attachedCount })}
        />
        <SummaryCard
          label={t('confirm.lead')}
          value={
            lead.submitted
              ? t('confirm.leadValue', { name: lead.name, mobile: lead.mobile, city: lead.city })
              : t('confirm.noLead')
          }
        />
      </div>

      <Disclaimer className="mt-5">{t('confirm.privacy')}</Disclaimer>

      <div className="mt-8 flex max-w-sm flex-col gap-3">
        <PrimaryButton onClick={handleContinue}>
          {application.submitted ? t('track.nav') : t('confirm.cta')}
        </PrimaryButton>
        <SecondaryButton onClick={() => navigate('/summary')}>{t('result.shareSummary')}</SecondaryButton>
      </div>
    </AppShell>
  )
}

function SummaryCard({ label, value }) {
  return (
    <div className="rounded-[20px] border border-line bg-card px-5 py-4 shadow-card">
      <p className="text-[13px] text-muted">{label}</p>
      <p className="mt-1 text-[16px] font-semibold text-ink">{value}</p>
    </div>
  )
}
