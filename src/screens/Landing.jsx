import { useNavigate } from 'react-router-dom'
import { ArrowIcon, ClockIcon, EyeIcon, ShieldIcon } from '../components/Icons'
import { LanguageToggle } from '../components/LanguageToggle'
import { Logo } from '../components/Logo'
import { PrimaryButton } from '../components/Buttons'
import { useLoan } from '../context/LoanContext'
import { ANALYTICS_EVENTS, track } from '../lib/analytics'
import { DEMO_PERSONA } from '../lib/constants'

const TRUST = [
  { titleKey: 'landing.trust1Title', bodyKey: 'landing.trust1Body', icon: ShieldIcon },
  { titleKey: 'landing.trust2Title', bodyKey: 'landing.trust2Body', icon: EyeIcon },
  { titleKey: 'landing.trust3Title', bodyKey: 'landing.trust3Body', icon: ClockIcon },
]

const STEPS = [
  { titleKey: 'landing.step1Title', bodyKey: 'landing.step1Body' },
  { titleKey: 'landing.step2Title', bodyKey: 'landing.step2Body' },
  { titleKey: 'landing.step3Title', bodyKey: 'landing.step3Body' },
]

export function Landing() {
  const navigate = useNavigate()
  const { applyDemoPersona, reset, t, hasSavedProgress, lastPath, application } = useLoan()

  function startCheck(useDemo) {
    if (useDemo) {
      applyDemoPersona()
    } else {
      reset()
    }
    track(ANALYTICS_EVENTS.LOAN_READINESS_STARTED, {
      source: useDemo ? 'demo_persona' : 'landing_cta',
    })
    navigate('/check/business')
  }

  return (
    <div className="min-h-screen">
      <header className="relative z-10 bg-brand text-white shadow-[0_12px_32px_rgb(18_53_43_/_0.28)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Logo light />
          <div className="flex items-center gap-3">
            <LanguageToggle />
            {application.submitted ? (
              <button
                type="button"
                onClick={() => navigate('/track')}
                className="rounded-lg px-2 py-1 text-[14px] font-semibold text-white/90 hover:bg-white/10 hover:text-white"
              >
                {t('track.nav')}
              </button>
            ) : (
              <a
                href="#how-it-works"
                className="rounded-lg px-2 py-1 text-[14px] font-semibold text-white/90 hover:bg-white/10 hover:text-white"
              >
                {t('common.howItWorks')}
              </a>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-8 lg:py-20">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-brand/10 bg-brand-soft px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-gold-dark">
                {t('landing.pill')}
              </p>
              <h1 className="font-serif text-[40px] leading-[1.12] text-ink sm:text-[52px]">
                {t('landing.hero')}
              </h1>
              <p className="mt-5 max-w-xl text-[17px] leading-7 text-muted">{t('landing.support')}</p>
              <p className="mt-4 max-w-xl text-[15px] leading-6 text-ink/80">{t('landing.principle')}</p>

              <div className="mt-8 flex max-w-md flex-col gap-4">
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <PrimaryButton className="w-full sm:w-auto" onClick={() => startCheck(false)}>
                    {t('landing.cta')}
                    <ArrowIcon />
                  </PrimaryButton>
                  {hasSavedProgress ? (
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          application.submitted
                            ? '/track'
                            : lastPath && lastPath !== '/'
                              ? lastPath
                              : '/check/business',
                        )
                      }
                      className="text-[14px] font-semibold text-gold-dark hover:text-ink"
                    >
                      {application.submitted ? `${t('track.nav')} →` : `${t('landing.continueSaved')} →`}
                    </button>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={() => startCheck(true)}
                  className="flex w-full items-start gap-3 rounded-2xl border border-line bg-card p-4 text-left shadow-card transition hover:-translate-y-0.5 hover:border-brand/40"
                >
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-[15px] font-semibold text-white">
                    R
                  </span>
                  <span className="min-w-0">
                    <span className="inline-flex rounded-full bg-gold-soft px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-dark">
                      {t('landing.demoTitle')}
                    </span>
                    <span className="mt-1 block text-[15px] font-semibold text-ink">{DEMO_PERSONA.summary}</span>
                    <span className="mt-1 block text-[13px] text-muted">{t('landing.demoHelp')}</span>
                  </span>
                </button>
              </div>
            </div>

            <aside className="relative rounded-[24px] border border-line bg-card p-6 shadow-lift lg:rotate-1 lg:transition lg:hover:rotate-0">
              <div className="absolute -top-3 right-6 hidden rounded-full bg-brand px-3 py-1 text-[11px] font-semibold text-white shadow-card sm:block">
                {t('landing.example')}
              </div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gold-dark sm:hidden">
                  {t('landing.example')}
                </p>
                <span className="ml-auto rounded-full bg-gold-soft px-2.5 py-1 text-[11px] font-semibold text-gold-dark">
                  {t('landing.notApproval')}
                </span>
              </div>
              <p className="mt-6 text-[14px] leading-6 text-muted">{t('landing.exampleBody')}</p>
              <p className="mt-4 font-serif text-[34px] leading-none text-ink">₹5,00,000 – ₹8,00,000</p>
              <div className="mt-5">
                <div className="relative h-2 rounded-full bg-brand-soft">
                  <div className="absolute inset-y-0 left-[14%] right-[10%] rounded-full bg-brand" />
                </div>
                <div className="mt-2 flex justify-between text-[12px] font-medium text-muted">
                  <span>₹5L</span>
                  <span>₹8L</span>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-canvas px-3 py-3">
                  <p className="text-[12px] text-muted">{t('landing.estimatedEmi')}</p>
                  <p className="mt-1 text-[15px] font-semibold text-ink">₹12,400 – ₹19,800</p>
                </div>
                <div className="rounded-xl bg-canvas px-3 py-3">
                  <p className="text-[12px] text-muted">{t('landing.timeNeeded')}</p>
                  <p className="mt-1 text-[15px] font-semibold text-ink">{t('landing.about3min')}</p>
                </div>
              </div>
              <p className="mt-5 text-[12px] leading-5 text-muted">{t('landing.sampleOnly')}</p>
            </aside>
          </div>
        </section>

        <section className="border-y border-line bg-card/80">
          <div className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
            {TRUST.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.titleKey} className="rounded-2xl border border-line/70 bg-canvas/70 p-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon />
                  </span>
                  <h2 className="mt-3 text-[15px] font-semibold text-ink">{t(item.titleKey)}</h2>
                  <p className="mt-2 text-[14px] leading-6 text-muted">{t(item.bodyKey)}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-gold-dark">
            {t('common.howItWorks')}
          </p>
          <h2 className="mt-3 font-serif text-[34px] leading-10 text-ink">{t('landing.howTitle')}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {STEPS.map((step, index) => (
              <article
                key={step.titleKey}
                className="rounded-[20px] border border-line bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <p className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[13px] font-semibold text-white">
                  {index + 1}
                </p>
                <h3 className="mt-3 text-[17px] font-semibold text-ink">{t(step.titleKey)}</h3>
                <p className="mt-2 text-[14px] leading-6 text-muted">{t(step.bodyKey)}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-[13px] leading-5 text-muted">{t('landing.howDisclaimer')}</p>
        </section>
      </main>

      <footer className="border-t border-line bg-brand px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[14px] font-semibold">LoanReady</p>
          <p className="text-[13px] leading-5 text-white/70">{t('landing.footer')}</p>
        </div>
      </footer>
    </div>
  )
}
