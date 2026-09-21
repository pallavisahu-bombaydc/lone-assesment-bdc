import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { PrimaryButton, SecondaryButton } from '../components/Buttons'
import { useLoan } from '../context/LoanContext'

export function LeadCapture() {
  const navigate = useNavigate()
  const { lead, saveLead, isBusinessComplete, isFinancialComplete, t } = useLoan()
  const [form, setForm] = useState({
    name: lead.name,
    mobile: lead.mobile,
    city: lead.city,
    consent: lead.consent,
  })
  const [errors, setErrors] = useState({})
  const [thanks, setThanks] = useState(lead.submitted)

  if (!isBusinessComplete) {
    return <Navigate to="/check/business" replace />
  }

  if (!isFinancialComplete) {
    return <Navigate to="/check/financial" replace />
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = t('lead.nameRequired')
    if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) next.mobile = t('lead.mobileRequired')
    if (!form.city.trim()) next.city = t('lead.cityRequired')
    if (!form.consent) next.consent = t('lead.consentRequired')
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!validate()) return
    saveLead({
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      city: form.city.trim(),
      consent: true,
    })
    setThanks(true)
  }

  return (
    <AppShell backTo="/check/result">
      <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-gold-dark">
        {t('common.checkLabel')}
      </p>
      <h1 className="mt-3 font-serif text-[34px] leading-10 text-ink">{t('lead.title')}</h1>
      <p className="mt-3 text-[15px] leading-6 text-muted">{t('lead.help')}</p>

      <form className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" onSubmit={handleSubmit}>
        <Field
          id="name"
          label={t('lead.name')}
          value={form.name}
          onChange={(value) => updateField('name', value)}
          error={errors.name}
        />
        <Field
          id="mobile"
          label={t('lead.mobile')}
          value={form.mobile}
          inputMode="numeric"
          onChange={(value) => updateField('mobile', value.replace(/\D/g, '').slice(0, 10))}
          error={errors.mobile}
        />
        <Field
          id="city"
          label={t('lead.city')}
          value={form.city}
          onChange={(value) => updateField('city', value)}
          error={errors.city}
        />

        <div className="sm:col-span-2 lg:col-span-3">
          <label className="flex items-start gap-3 text-[14px] leading-6 text-ink">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(event) => updateField('consent', event.target.checked)}
              className="mt-1 h-4 w-4 accent-brand"
            />
            <span>{t('lead.consent')}</span>
          </label>
          {errors.consent ? <p className="mt-2 text-[13px] text-[#9a3412]">{errors.consent}</p> : null}
        </div>

        <div className="sm:col-span-2 lg:col-span-3 max-w-sm">
          <PrimaryButton type="submit">{t('lead.submit')}</PrimaryButton>
        </div>
      </form>

      {thanks ? (
        <p className="mt-4 rounded-xl border border-gold/40 bg-gold-soft px-4 py-3 text-[14px] leading-6 text-gold-dark">
          {t('lead.thanks')}
        </p>
      ) : null}

      <div className="mt-6 flex max-w-sm flex-col gap-3">
        <SecondaryButton onClick={() => navigate('/check/documents')}>
          {t('lead.goDocs')}
        </SecondaryButton>
        <button
          type="button"
          onClick={() => navigate('/check/documents')}
          className="text-[14px] font-semibold text-muted hover:text-ink"
        >
          {t('common.skip')}
        </button>
      </div>
    </AppShell>
  )
}

function Field({ id, label, value, onChange, error, inputMode = 'text' }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[14px] font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        value={value}
        inputMode={inputMode}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-xl border bg-card px-4 py-3.5 text-[16px] outline-none ${
          error
            ? 'border-[#b45309] ring-2 ring-[#b45309]/10'
            : 'border-line focus:border-gold focus:ring-2 focus:ring-gold/20'
        }`}
      />
      {error ? <p className="mt-2 text-[13px] text-[#9a3412]">{error}</p> : null}
    </div>
  )
}
