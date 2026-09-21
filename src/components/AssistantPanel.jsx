import { useLoan } from '../context/LoanContext'
import { getAssistantQuestions } from '../lib/assistant'

export function AssistantPanel() {
  const {
    assistantOpen,
    assistantContext,
    assistantQuestionId,
    setAssistantQuestionId,
    closeAssistant,
    t,
  } = useLoan()

  if (!assistantOpen) return null

  const questions = getAssistantQuestions(assistantContext)

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center print:hidden sm:items-stretch sm:justify-end">
      <button
        type="button"
        aria-label={t('assistant.close')}
        className="absolute inset-0 bg-brand/40"
        onClick={closeAssistant}
      />

      <aside className="relative flex max-h-[88vh] w-full flex-col rounded-t-[20px] border border-line bg-card shadow-card sm:h-full sm:max-h-none sm:w-[400px] sm:rounded-none sm:border-l">
        <div className="border-b border-line bg-brand px-5 py-4 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
                {t('assistant.title')}
              </p>
              <h2 className="mt-1 font-serif text-[22px] leading-7">{t('assistant.heading')}</h2>
            </div>
            <button
              type="button"
              onClick={closeAssistant}
              className="rounded-lg px-2 py-1 text-[14px] font-medium text-white/80 hover:bg-white/10 hover:text-white"
            >
              {t('assistant.close')}
            </button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <p className="shrink-0 px-5 pt-5 text-[14px] leading-6 text-muted">{t('assistant.intro')}</p>

          {assistantQuestionId ? (
            <div className="shrink-0 border-b border-line bg-card px-5 py-4">
              <div className="rounded-2xl rounded-tl-sm border border-gold/30 bg-gold-soft p-4">
                <p className="text-[13px] font-semibold text-ink">
                  {t(`assistant.${assistantQuestionId}.q`)}
                </p>
                <p className="mt-2 text-[14px] leading-6 text-muted">
                  {t(`assistant.${assistantQuestionId}.a`)}
                </p>
              </div>
            </div>
          ) : null}

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
            <div className="flex flex-col gap-2">
              {questions.map((item) => {
                const active = item.id === assistantQuestionId
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAssistantQuestionId(item.id)}
                    className={`rounded-xl border px-3.5 py-3 text-left text-[14px] leading-5 transition ${
                      active
                        ? 'border-gold bg-gold-soft text-ink'
                        : 'border-line bg-canvas text-ink hover:border-gold/40'
                    }`}
                  >
                    {t(`assistant.${item.id}.q`)}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-line px-5 py-4">
          <p className="text-[12px] leading-5 text-muted">{t('assistant.disclaimer')}</p>
        </div>
      </aside>
    </div>
  )
}

export function AskAssistantButton({ context, questionId, children }) {
  const { openAssistant, t } = useLoan()

  return (
    <button
      type="button"
      onClick={() => openAssistant(context, questionId)}
      className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-2 text-[13px] font-semibold text-gold-dark transition hover:border-gold hover:bg-gold-soft"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children || t('common.askAssistant')}
    </button>
  )
}
