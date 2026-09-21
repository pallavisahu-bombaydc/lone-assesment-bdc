import { useLoan } from '../context/LoanContext'

export function LanguageToggle() {
  const { language, setLanguage } = useLoan()

  return (
    <div className="flex overflow-hidden rounded-full border border-white/20 text-[12px] font-semibold">
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 ${language === 'en' ? 'bg-white text-brand' : 'text-white/80 hover:text-white'}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('hi')}
        className={`px-2.5 py-1 ${language === 'hi' ? 'bg-white text-brand' : 'text-white/80 hover:text-white'}`}
      >
        हिं
      </button>
    </div>
  )
}
