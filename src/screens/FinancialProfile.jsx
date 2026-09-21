import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { PrimaryButton } from '../components/Buttons'
import { CurrencyInput } from '../components/CurrencyInput'
import { useLoan } from '../context/LoanContext'
import { ANALYTICS_EVENTS, track } from '../lib/analytics'
import { ArrowIcon } from '../components/Icons'
import { getCheckRedirect } from '../lib/flow'
import { formatINR } from '../lib/format'

export function FinancialProfile() {
  const navigate = useNavigate()
  const { profile, updateProfile, t } = useLoan()
  const [errors, setErrors] = useState({})

  const redirect = getCheckRedirect(profile)
  if (redirect) return <Navigate to={redirect} replace />

  function validate() {
    const next = {}

    if (profile.revenue == null) {
      next.revenue = t('financial.revenueRequired')
    } else if (!Number.isFinite(profile.revenue) || profile.revenue < 0) {
      next.revenue = t('financial.invalidAmount')
    }

    if (profile.expenses != null && (!Number.isFinite(profile.expenses) || profile.expenses < 0)) {
      next.expenses = t('financial.invalidExpenses')
    }

    if (profile.emi != null && (!Number.isFinite(profile.emi) || profile.emi < 0)) {
      next.emi = t('financial.invalidEmi')
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleNext() {
    if (!validate()) return

    track(ANALYTICS_EVENTS.FINANCIAL_PROFILE_COMPLETED, {
      hasExpenses: profile.expenses != null,
      hasEmi: profile.emi != null,
    })
    navigate('/check/result')
  }

  const expensesAboveRevenue =
    Number.isFinite(profile.revenue) &&
    Number.isFinite(profile.expenses) &&
    profile.expenses > profile.revenue

  const canShowSurplus = Number.isFinite(profile.revenue)
  const surplus = canShowSurplus
    ? profile.revenue - (profile.expenses ?? 0) - (profile.emi ?? 0)
    : null

  return (
    <AppShell step={2} showProgress backTo="/check/business">
      <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-gold-dark">
        {t('common.checkLabel')}
      </p>
      <h1 className="mt-3 font-serif text-[34px] leading-10 text-ink">{t('financial.title')}</h1>
      <p className="mt-3 text-[15px] leading-6 text-muted">{t('financial.help')}</p>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <CurrencyInput
          id="revenue"
          label={t('financial.revenue')}
          value={profile.revenue}
          onChange={(revenue) => {
            setErrors((current) => ({ ...current, revenue: '' }))
            updateProfile({ revenue })
          }}
          error={errors.revenue}
        />
        <CurrencyInput
          id="expenses"
          label={t('financial.expenses')}
          value={profile.expenses}
          onChange={(expenses) => {
            setErrors((current) => ({ ...current, expenses: '' }))
            updateProfile({ expenses })
          }}
          hint={t('financial.expensesHint')}
          error={errors.expenses}
        />
        <CurrencyInput
          id="emi"
          label={t('financial.emi')}
          value={profile.emi}
          onChange={(emi) => {
            setErrors((current) => ({ ...current, emi: '' }))
            updateProfile({ emi })
          }}
          hint={t('financial.emiHint')}
          error={errors.emi}
        />
      </div>

      {canShowSurplus ? (
        <div className="mt-5 rounded-2xl border border-brand/15 bg-gradient-to-br from-brand-soft to-card px-4 py-4 shadow-card">
          <p className="text-[13px] text-muted">{t('financial.surplus')}</p>
          <p className={`mt-1 font-serif text-[28px] leading-none ${surplus < 0 ? 'text-[#9a3412]' : 'text-ink'}`}>
            {formatINR(surplus)}
          </p>
          <p className="mt-2 text-[12px] leading-5 text-muted">{t('financial.surplusHelp')}</p>
        </div>
      ) : null}

      {expensesAboveRevenue ? (
        <p className="mt-5 rounded-xl bg-amber-soft px-4 py-3 text-[14px] leading-6 text-amber">
          {t('financial.expensesHigh')}
        </p>
      ) : null}

      <div className="mt-8">
        <PrimaryButton className="max-w-sm" onClick={handleNext}>
          {t('financial.cta')}
          <ArrowIcon />
        </PrimaryButton>
      </div>
    </AppShell>
  )
}
