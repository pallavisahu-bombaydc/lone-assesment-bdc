import { ShieldIcon } from './Icons'
import { useLoan } from '../context/LoanContext'
import { ANALYTICS_EVENTS, track } from '../lib/analytics'
import { LOAN_CHECK_SCENARIOS, getExistingLoanDemo } from '../lib/existingLoans'
import { formatINR } from '../lib/format'

const ALIGNMENT_STYLES = {
  no_loans: 'bg-ok-soft text-ok',
  match: 'bg-ok-soft text-ok',
  existing_ok: 'bg-ok-soft text-ok',
  declared_only: 'bg-warn-soft text-warn',
  partial: 'bg-warn-soft text-warn',
  needs_check: 'bg-warn-soft text-warn',
}

export function ExistingLoanCheck({ compact = false }) {
  const { profile, updateProfile, t } = useLoan()
  const demo = getExistingLoanDemo({
    scenario: profile.loanCheckScenario,
    loanProduct: profile.loanProduct,
    declaredEmi: profile.emi,
  })

  function selectScenario(id) {
    updateProfile({ loanCheckScenario: id })
    track(ANALYTICS_EVENTS.LOAN_CHECK_SCENARIO_VIEWED, { scenario: id })
  }

  return (
    <section
      className={`rounded-[20px] border border-line p-5 ${
        compact ? 'bg-canvas shadow-none' : 'bg-card shadow-card'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-ink">
          <ShieldIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gold-dark">
            {t('loans.demoBadge')}
          </p>
          <h2 className="mt-1 text-[16px] font-semibold text-ink">{t('loans.title')}</h2>
          <p className="mt-2 text-[14px] leading-6 text-muted">{t('loans.help')}</p>
        </div>
      </div>

      {compact ? null : (
        <div className="mt-4 flex flex-wrap gap-2">
          {LOAN_CHECK_SCENARIOS.map((item) => {
            const selected = demo.id === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectScenario(item.id)}
                className={`rounded-full border px-3 py-1.5 text-[12px] font-semibold ${
                  selected
                    ? 'border-ink bg-brand text-white'
                    : 'border-line bg-canvas text-ink hover:border-ink'
                }`}
              >
                {t(`loans.scenario.${item.id}`)}
              </button>
            )
          })}
        </div>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <CompareCard
          label={t('loans.declared')}
          value={formatINR(demo.declaredEmi)}
          hint={t('loans.declaredHint')}
        />
        <CompareCard
          label={t('loans.sample')}
          value={formatINR(demo.sampleEmi)}
          hint={t('loans.sampleHint')}
        />
      </div>

      <p
        className={`mt-4 inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${ALIGNMENT_STYLES[demo.alignment]}`}
      >
        {t(`loans.align.${demo.alignment}`)}
      </p>
      <p className="mt-2 text-[14px] leading-6 text-muted">{t(`loans.body.${demo.id}`)}</p>

      {compact ? null : demo.loans.length ? (
        <ul className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line">
          {demo.loans.map((loan) => (
            <li key={loan.id} className="flex items-center justify-between gap-3 bg-canvas px-4 py-3">
              <div>
                <p className="text-[14px] font-semibold text-ink">{t(`loans.type.${loan.typeKey}`)}</p>
                <p className="text-[12px] text-muted">
                  {t(`loans.lender.${loan.lenderKey}`)} · {loan.id}
                </p>
              </div>
              <p className="text-[14px] font-semibold text-ink">{formatINR(loan.emi)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 rounded-xl bg-canvas px-4 py-3 text-[14px] leading-6 text-muted">
          {t('loans.noSampleLoans')}
        </p>
      )}

      {!compact && demo.properties.length ? (
        <div className="mt-4">
          <h3 className="text-[14px] font-semibold text-ink">{t('loans.propertiesTitle')}</h3>
          <p className="mt-1 text-[13px] leading-5 text-muted">{t('loans.propertiesHelp')}</p>
          <ul className="mt-3 space-y-2">
            {demo.properties.map((property) => (
              <li
                key={property.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3"
              >
                <div>
                  <p className="text-[14px] font-semibold text-ink">
                    {property.id} · {t(`loans.city.${property.cityKey}`)}
                  </p>
                  <p className="text-[12px] text-muted">
                    {property.status === 'charged'
                      ? t('loans.charged', { lender: t(`loans.lender.${property.lenderKey}`) })
                      : t('loans.clear')}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    property.status === 'charged' ? 'bg-warn-soft text-warn' : 'bg-ok-soft text-ok'
                  }`}
                >
                  {t(`loans.property.${property.status}`)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[13px] leading-5 text-muted">{t('loans.sameAssetNote')}</p>
        </div>
      ) : null}

      <p className="mt-4 text-[12px] leading-5 text-muted">{t('loans.disclaimer')}</p>
    </section>
  )
}

function CompareCard({ label, value, hint }) {
  return (
    <div className="rounded-xl border border-line bg-card px-4 py-3">
      <p className="text-[12px] text-muted">{label}</p>
      <p className="mt-1 font-serif text-[24px] leading-none text-ink">{value}</p>
      <p className="mt-2 text-[12px] leading-5 text-muted">{hint}</p>
    </div>
  )
}
