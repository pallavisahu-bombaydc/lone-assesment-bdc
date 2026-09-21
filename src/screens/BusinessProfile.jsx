import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { PrimaryButton } from '../components/Buttons'
import { ChoiceCard } from '../components/ChoiceCard'
import { useLoan } from '../context/LoanContext'
import { ANALYTICS_EVENTS, track } from '../lib/analytics'
import { BUSINESS_TYPES, LOAN_PRODUCTS, VINTAGE_OPTIONS } from '../lib/constants'

export function BusinessProfile() {
  const navigate = useNavigate()
  const { profile, updateProfile, t } = useLoan()
  const [error, setError] = useState('')

  function handleNext() {
    if (!profile.loanProduct || !profile.businessType || !profile.vintage) {
      setError(t('business.error'))
      return
    }

    track(ANALYTICS_EVENTS.BUSINESS_PROFILE_COMPLETED, {
      loanProduct: profile.loanProduct,
      businessType: profile.businessType,
      vintage: profile.vintage,
    })
    navigate('/check/financial')
  }

  return (
    <AppShell step={1} showProgress backTo="/" backLabel={t('common.backHome')}>
      <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-gold-dark">
        {t('common.checkLabel')}
      </p>
      <h1 className="mt-3 font-serif text-[34px] leading-10 text-ink">{t('business.title')}</h1>
      <p className="mt-3 text-[15px] leading-6 text-muted">{t('business.help')}</p>

      <fieldset className="mt-8">
        <legend className="mb-1 text-[14px] font-medium text-ink">{t('business.product')}</legend>
        <p className="mb-3 text-[13px] leading-5 text-muted">{t('business.productHelp')}</p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {LOAN_PRODUCTS.map((option) => (
            <ChoiceCard
              key={option.id}
              name="loanProduct"
              value={option.id}
              checked={profile.loanProduct === option.id}
              onChange={() => {
                setError('')
                updateProfile({ loanProduct: option.id })
              }}
            >
              {t(`product.${option.id}`)}
            </ChoiceCard>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="mb-1 text-[14px] font-medium text-ink">{t('business.type')}</legend>
        <p className="mb-3 text-[13px] leading-5 text-muted">{t('business.typeHelp')}</p>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {BUSINESS_TYPES.map((option) => (
            <ChoiceCard
              key={option.id}
              name="businessType"
              value={option.id}
              checked={profile.businessType === option.id}
              onChange={() => {
                setError('')
                updateProfile({ businessType: option.id })
              }}
            >
              {t(`type.${option.id}`)}
            </ChoiceCard>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="mb-3 text-[14px] font-medium text-ink">{t('business.vintage')}</legend>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {VINTAGE_OPTIONS.map((option) => (
            <ChoiceCard
              key={option.id}
              name="vintage"
              value={option.id}
              checked={profile.vintage === option.id}
              onChange={() => {
                setError('')
                updateProfile({ vintage: option.id })
              }}
            >
              {t(`vintage.${option.id}`)}
            </ChoiceCard>
          ))}
        </div>
      </fieldset>

      {error ? <p className="mt-5 text-[14px] text-[#9a3412]">{error}</p> : null}

      <div className="mt-8">
        <PrimaryButton className="max-w-sm" onClick={handleNext}>
          {t('common.continue')}
        </PrimaryButton>
      </div>
    </AppShell>
  )
}
