import { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { AskAssistantButton } from '../components/AssistantPanel'
import { Disclaimer } from '../components/Disclaimer'
import { AlertIcon, CalendarIcon, CheckIcon, PercentIcon, RupeeIcon } from '../components/Icons'
import { ScoreRing } from '../components/ScoreRing'
import { useLoan } from '../context/LoanContext'
import { ANALYTICS_EVENTS, track } from '../lib/analytics'
import { getDecision } from '../lib/decision'
import { estimateEligibility, getReadinessScore } from '../lib/eligibility'
import { formatINR } from '../lib/format'
import { DEMO_RATE_PERCENT, examplePrincipal, getRepaymentPlans } from '../lib/repayment'

const STATUS_STYLES = {
  ready: 'bg-ok-soft text-ok',
  required: 'bg-warn-soft text-warn',
  later: 'bg-canvas text-muted',
  needed: 'bg-bad-soft text-bad',
}

const DECISION_STYLES = {
  apply: 'border-ok/40 bg-ok-soft shadow-card',
  wait: 'border-warn/40 bg-warn-soft shadow-card',
  talk: 'border-line bg-brand-soft shadow-card',
}

const DECISION_BADGE = {
  apply: 'bg-ok text-white',
  wait: 'bg-warn text-white',
  talk: 'bg-brand text-white',
}

const DECISIONS = [
  { id: 'apply', titleKey: 'decision.applyTitle', bodyKey: 'decision.applyBody', ctaKey: 'decision.applyCta', to: '/check/documents' },
  { id: 'wait', titleKey: 'decision.waitTitle', bodyKey: 'decision.waitBody', ctaKey: 'decision.waitCta', to: '/check/documents' },
  { id: 'talk', titleKey: 'decision.talkTitle', bodyKey: 'decision.talkBody', ctaKey: 'decision.talkCta', to: '/check/lead' },
]

export function IndicativeResult() {
  const navigate = useNavigate()
  const { profile, readiness, isBusinessComplete, isFinancialComplete, setUserIntent, t } = useLoan()
  const [showLogic, setShowLogic] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [whatIfRevenue, setWhatIfRevenue] = useState(profile.revenue ?? 0)
  const [whatIfEmi, setWhatIfEmi] = useState(profile.emi ?? 0)
  const [chosenAmount, setChosenAmount] = useState(0)

  useEffect(() => {
    setWhatIfRevenue(profile.revenue ?? 0)
    setWhatIfEmi(profile.emi ?? 0)
  }, [profile.revenue, profile.emi])

  const estimate = useMemo(
    () =>
      estimateEligibility({
        vintage: profile.vintage,
        revenue: whatIfRevenue,
        expenses: profile.expenses,
        emi: whatIfEmi,
      }),
    [profile.vintage, profile.expenses, whatIfRevenue, whatIfEmi],
  )

  const decision = getDecision({
    vintage: profile.vintage,
    estimate,
    revenue: whatIfRevenue,
    emi: whatIfEmi,
  })

  useEffect(() => {
    if (isBusinessComplete && isFinancialComplete) {
      track(ANALYTICS_EVENTS.READINESS_RESULT_VIEWED, {
        hasEstimate: estimate.ok,
        reason: estimate.reason ?? 'ok',
        decision: decision.id,
      })
      track(ANALYTICS_EVENTS.DECISION_VIEWED, { decision: decision.id })
    }
  }, [isBusinessComplete, isFinancialComplete, estimate.ok, estimate.reason, decision.id])

  useEffect(() => {
    if (!estimate.ok) return
    setChosenAmount((current) => {
      const fallback = examplePrincipal(estimate.min, estimate.max)
      if (!current) return fallback
      return Math.min(estimate.max, Math.max(estimate.min, current))
    })
  }, [estimate.ok, estimate.min, estimate.max])

  if (!isBusinessComplete) {
    return <Navigate to="/check/business" replace />
  }

  if (!isFinancialComplete) {
    return <Navigate to="/check/financial" replace />
  }

  const readinessScore = getReadinessScore({
    vintage: profile.vintage,
    revenue: whatIfRevenue,
    expenses: profile.expenses,
    emi: whatIfEmi,
    estimateOk: estimate.ok,
  })

  const whatIfChanged = whatIfRevenue !== (profile.revenue ?? 0) || whatIfEmi !== (profile.emi ?? 0)
  const revenueMax = Math.max((profile.revenue ?? 0) * 2, 500000)
  const emiMax = Math.max(profile.revenue ?? 100000, 100000)
  const qualifyKey = estimate.ok
    ? decision.id === 'apply'
      ? 'result.qualifyYes'
      : 'result.qualifyTight'
    : 'result.qualifyNotYet'
  const qualifyStyle = estimate.ok
    ? decision.id === 'apply'
      ? 'bg-ok-soft text-ok'
      : 'bg-warn-soft text-warn'
    : 'bg-bad-soft text-bad'
  const plans = estimate.ok ? getRepaymentPlans(estimate.min, estimate.max, chosenAmount) : []
  const midAmount = estimate.ok ? examplePrincipal(estimate.min, estimate.max) : 0
  const amountStep =
    estimate.ok && estimate.max - estimate.min >= 200000
      ? 50000
      : 10000

  function handleWhatIf(kind, value) {
    if (kind === 'revenue') setWhatIfRevenue(value)
    if (kind === 'emi') setWhatIfEmi(value)
    track(ANALYTICS_EVENTS.WHATIF_ADJUSTED, { kind, value })
  }

  return (
    <AppShell step={3} showProgress backTo="/check/financial">
      <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-gold-dark">
        {t('common.checkLabel')}
      </p>
      <div className="mt-3 flex items-center gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-ink">
          <RupeeIcon className="h-5 w-5" />
        </span>
        <h1 className="font-serif text-[34px] leading-10 text-ink">{t('result.title')}</h1>
      </div>

      <div className="mt-6 rounded-[20px] border border-line bg-card p-5 shadow-card sm:p-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <ScoreRing score={readinessScore.score} label={t(readinessScore.labelKey)} />
          <div className="min-w-0 flex-1">
            <p className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold ${qualifyStyle}`}>
              {estimate.ok && decision.id === 'apply' ? (
                <CheckIcon className="h-3.5 w-3.5" />
              ) : (
                <AlertIcon className="h-3.5 w-3.5" />
              )}
              {t(qualifyKey)}
            </p>
            {estimate.ok ? (
              <>
                <p className="mt-3 text-[15px] leading-6 text-muted">{t('result.rangeIntro')}</p>
                <p className="mt-4 font-serif text-[32px] leading-none tracking-tight text-ink sm:text-[38px]">
                  {formatINR(estimate.min)} – {formatINR(estimate.max)}
                </p>
                <p className="mt-3 text-[14px] leading-6 text-muted">{t('result.rangeNote')}</p>
                <div className="mt-5 rounded-xl bg-canvas px-4 py-3">
                  <p className="text-[12px] text-muted">{t('result.surplus')}</p>
                  <p className="mt-1 text-[16px] font-semibold text-ink">
                    {formatINR(estimate.surplus)}
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="mt-3 font-serif text-[26px] leading-8 text-ink">{t('result.needMore')}</p>
                {estimate.reason ? (
                  <p className="mt-4 text-[15px] leading-6 text-muted">
                    {t(`estimate.${estimate.reason}`)}
                  </p>
                ) : null}
                <p className="mt-4 text-[14px] leading-6 text-muted">{t('result.notANo')}</p>
              </>
            )}
          </div>
        </div>
        <Disclaimer className="mt-5">{t('result.disclaimer')}</Disclaimer>
      </div>

      {estimate.ok && plans.length ? (
        <section className="mt-6 rounded-[20px] border border-line bg-card p-5 shadow-card">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-ink">
              <CalendarIcon className="h-5 w-5" />
            </span>
            <h2 className="text-[16px] font-semibold text-ink">{t('plans.title')}</h2>
          </div>
          <p className="mt-2 text-[14px] leading-6 text-muted">
            {t('plans.chooseHelp', {
              min: formatINR(estimate.min),
              max: formatINR(estimate.max),
              rate: String(DEMO_RATE_PERCENT),
            })}
          </p>
          <div className="mt-4 rounded-xl bg-canvas px-4 py-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-[14px] font-medium text-ink">{t('plans.chooseLabel')}</p>
              <p className="font-serif text-[22px] leading-none text-ink">{formatINR(chosenAmount || midAmount)}</p>
            </div>
            {estimate.max > estimate.min ? (
              <input
                type="range"
                min={estimate.min}
                max={estimate.max}
                step={amountStep}
                value={Math.min(estimate.max, Math.max(estimate.min, chosenAmount || midAmount))}
                onChange={(event) => setChosenAmount(Number(event.target.value))}
                className="w-full accent-brand"
              />
            ) : null}
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { id: 'min', label: t('plans.chooseMin'), value: estimate.min },
                { id: 'mid', label: t('plans.chooseMid'), value: midAmount },
                { id: 'max', label: t('plans.chooseMax'), value: estimate.max },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setChosenAmount(option.value)}
                  className={`rounded-full px-3 py-1.5 text-[13px] font-semibold ${
                    (chosenAmount || midAmount) === option.value
                      ? 'bg-brand text-white'
                      : 'border border-line bg-card text-ink hover:border-gold'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-3 text-[14px] leading-6 text-muted">
            {t('plans.help', { amount: formatINR(plans[0]?.principal ?? chosenAmount), rate: String(DEMO_RATE_PERCENT) })}
          </p>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {plans.map((plan) => {
              const tight = Number.isFinite(estimate.surplus) && plan.emi > estimate.surplus
              return (
                <article
                  key={plan.months}
                  className={`rounded-[20px] border p-4 ${
                    plan.months === 24 ? 'border-gold bg-gold-soft/70 shadow-card' : 'border-line bg-canvas'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-[12px] font-semibold text-white">
                        {plan.years}Y
                      </span>
                      <h3 className="text-[15px] font-semibold text-ink">{t(plan.titleKey)}</h3>
                    </div>
                    <span className="rounded-full bg-card px-2.5 py-1 text-[11px] font-semibold text-gold-dark">
                      {t(plan.tagKey)}
                    </span>
                  </div>
                  <p className="mt-4 font-serif text-[28px] leading-none text-ink">{formatINR(plan.emi)}</p>
                  <p className="mt-1 text-[13px] text-muted">{t('plans.perMonth')}</p>
                  <dl className="mt-4 space-y-2 text-[14px]">
                    <div className="flex items-center justify-between gap-3">
                      <dt className="flex items-center gap-1.5 text-muted">
                        <PercentIcon className="h-3.5 w-3.5" />
                        {t('plans.rate')}
                      </dt>
                      <dd className="font-semibold text-ink">
                        {t('plans.rateValue', { rate: String(plan.ratePercent) })}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <dt className="text-muted">{t('plans.interest')}</dt>
                      <dd className="text-right font-semibold text-ink">
                        {formatINR(plan.interest)}
                        <span className="mt-0.5 block text-[12px] font-medium text-gold-dark">
                          {t('plans.interestOfLoan', { percent: String(plan.interestPercent) })}
                        </span>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-muted">{t('plans.total')}</dt>
                      <dd className="font-semibold text-ink">{formatINR(plan.total)}</dd>
                    </div>
                  </dl>
                  {tight ? (
                    <p className="mt-3 text-[12px] leading-5 text-amber">{t('plans.tight')}</p>
                  ) : null}
                </article>
              )
            })}
          </div>
          <p className="mt-4 text-[13px] leading-5 text-muted">{t('plans.disclaimer')}</p>
        </section>
      ) : null}

      <section className="mt-6">
        <h2 className="text-[16px] font-semibold text-ink">{t('decision.title')}</h2>
        <p className="mt-2 text-[14px] leading-6 text-muted">{t(decision.reasonKey)}</p>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {[
            DECISIONS.find((item) => item.id === decision.id),
            ...DECISIONS.filter((item) => item.id !== decision.id),
          ].map((item) => {
            const suggested = item.id === decision.id
            return (
              <article
                key={item.id}
                className={`rounded-[20px] border p-4 ${
                  suggested ? `${DECISION_STYLES[item.id]} lg:col-span-2` : 'border-line bg-card'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[16px] font-semibold text-ink">{t(item.titleKey)}</h3>
                  {suggested ? (
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${DECISION_BADGE[item.id]}`}>
                      {t('decision.suggested')}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-[14px] leading-6 text-muted">{t(item.bodyKey)}</p>
                <button
                  type="button"
                  onClick={() => {
                    setUserIntent(item.id)
                    navigate(item.to)
                  }}
                  className="mt-3 text-[14px] font-semibold text-gold-dark hover:text-ink"
                >
                  {t(item.ctaKey)} →
                </button>
              </article>
            )
          })}
        </div>
      </section>

      <button
        type="button"
        onClick={() => setShowMore((open) => !open)}
        className="mt-6 text-[14px] font-semibold text-gold-dark"
      >
        {showMore ? t('result.showLess') : t('result.showMore')}
      </button>

      {showMore ? (
        <>
          <section className="mt-6 rounded-[20px] border border-line bg-card p-5 shadow-card">
            <h2 className="text-[16px] font-semibold text-ink">{t('whatif.title')}</h2>
            <p className="mt-2 text-[14px] leading-6 text-muted">{t('whatif.help')}</p>
            <SliderRow
              label={t('whatif.revenue')}
              value={whatIfRevenue}
              min={0}
              max={revenueMax}
              step={5000}
              onChange={(value) => handleWhatIf('revenue', value)}
            />
            <SliderRow
              label={t('whatif.emi')}
              value={whatIfEmi}
              min={0}
              max={emiMax}
              step={1000}
              onChange={(value) => handleWhatIf('emi', value)}
            />
            {whatIfChanged ? (
              <button
                type="button"
                onClick={() => {
                  setWhatIfRevenue(profile.revenue ?? 0)
                  setWhatIfEmi(profile.emi ?? 0)
                }}
                className="mt-3 text-[14px] font-semibold text-gold-dark"
              >
                {t('whatif.reset')}
              </button>
            ) : null}
          </section>

          <section className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[14px] font-semibold text-ink">{t('result.inputs')}</h2>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/check/business')}
                  className="text-[13px] font-semibold text-gold-dark hover:text-ink"
                >
                  {t('result.editBusiness')}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/check/financial')}
                  className="text-[13px] font-semibold text-gold-dark hover:text-ink"
                >
                  {t('result.editIncome')}
                </button>
              </div>
            </div>
            <dl className="mt-3 divide-y divide-line rounded-[20px] border border-line bg-card">
              {profile.loanProduct ? (
                <InputRow label={t('result.product')} value={t(`product.${profile.loanProduct}`)} />
              ) : null}
              <InputRow label={t('result.vintage')} value={t(`vintage.${profile.vintage}`)} />
              <InputRow
                label={t('result.revenue')}
                value={formatINR(profile.revenue, { compact: true })}
              />
              <InputRow label={t('result.existingEmi')} value={formatINR(profile.emi ?? 0, { compact: true })} />
            </dl>
          </section>

          <section className="mt-6">
            <h2 className="text-[14px] font-semibold text-ink">{t('result.readiness')}</h2>
            <ul className="mt-3 space-y-2">
              {readiness.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-line bg-card px-4 py-3"
                >
                  <span className="text-[15px] text-ink">{t(`readiness.${item.id}`)}</span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${STATUS_STYLES[item.status]}`}
                  >
                    {t(`result.status.${item.status}`)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowLogic((open) => !open)}
              className="text-[14px] font-semibold text-gold-dark"
            >
              {t('result.how')}
            </button>
            {showLogic ? (
              <p className="mt-3 rounded-xl bg-canvas px-4 py-3 text-[14px] leading-6 text-muted">
                {t('result.explainer')}
              </p>
            ) : null}
          </div>
        </>
      ) : null}

      <div className="mt-5">
        <AskAssistantButton context="result" questionId="repayment_plans" />
      </div>

      <button
        type="button"
        onClick={() => navigate('/summary')}
        className="mt-3 text-[14px] font-semibold text-gold-dark"
      >
        {t('result.shareSummary')}
      </button>
    </AppShell>
  )
}

function SliderRow({ label, value, min, max, step, onChange }) {
  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="text-[14px] font-medium text-ink">{label}</label>
        <span className="text-[14px] font-semibold text-ink">{formatINR(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-brand"
      />
    </div>
  )
}

function InputRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <dt className="text-[14px] text-muted">{label}</dt>
      <dd className="text-[14px] font-semibold text-ink">{value}</dd>
    </div>
  )
}
