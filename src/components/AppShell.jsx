import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLoan } from '../context/LoanContext'
import { DEMO_PERSONA } from '../lib/constants'
import { isSessionEmpty } from '../lib/flow'
import { LanguageToggle } from './LanguageToggle'
import { Logo } from './Logo'
import { ProgressBar } from './ProgressBar'
import { TextButton } from './Buttons'

export function AppShell({
  children,
  step,
  total = 4,
  showProgress = false,
  backTo,
  backLabel,
  showRestart = true,
  wide = false,
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const { reset, profile, t, setLastPath, application } = useLoan()

  useEffect(() => {
    if (location.pathname === '/' || isSessionEmpty(profile)) return
    setLastPath(location.pathname)
  }, [location.pathname, profile, setLastPath])

  function handleRestart() {
    reset()
    navigate('/', { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 bg-brand text-white shadow-[0_12px_32px_rgb(18_53_43_/_0.28)] print:hidden">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Logo light />
          <div className="flex items-center gap-3">
            <LanguageToggle />
            {application.submitted ? (
              <TextButton onClick={() => navigate('/track')}>{t('track.nav')}</TextButton>
            ) : null}
            {showRestart ? (
              <TextButton onClick={handleRestart}>{t('common.startOver')}</TextButton>
            ) : null}
          </div>
        </div>
      </header>

      <main className={`mx-auto w-full flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 ${wide ? 'max-w-7xl' : 'max-w-6xl'}`}>
        {profile.usedDemoPersona ? (
          <p className="mb-4 inline-flex rounded-full bg-gold-soft px-3 py-1 text-[12px] font-semibold text-gold-dark">
            {t('common.viewingAs', { name: DEMO_PERSONA.name })}
          </p>
        ) : null}

        {backTo ? (
          <button
            type="button"
            onClick={() => navigate(backTo)}
            className="mb-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-muted transition hover:text-ink print:hidden"
          >
            <span aria-hidden="true">←</span> {backLabel || t('common.back')}
          </button>
        ) : null}

        {showProgress ? (
          <div className="mb-8">
            <ProgressBar step={step} total={total} />
          </div>
        ) : null}

        {children}
      </main>
    </div>
  )
}
