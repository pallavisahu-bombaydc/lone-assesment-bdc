import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { AskAssistantButton } from '../components/AssistantPanel'
import { PrimaryButton, SecondaryButton } from '../components/Buttons'
import { DocumentIcon } from '../components/Icons'
import { useLoan } from '../context/LoanContext'
import { ANALYTICS_EVENTS, track } from '../lib/analytics'

const PHASE_KEYS = {
  today: 'docs.today',
  this_week: 'docs.thisWeek',
  apply: 'docs.whenApply',
}

export function DocumentChecklist() {
  const navigate = useNavigate()
  const {
    documents,
    documentChecks,
    documentFiles,
    toggleDocument,
    attachDocument,
    removeDocumentFile,
    documentDone,
    documentTotal,
    attachedCount,
    application,
    submitApplication,
    isBusinessComplete,
    isFinancialComplete,
    t,
  } = useLoan()

  useEffect(() => {
    if (isBusinessComplete && isFinancialComplete) {
      track(ANALYTICS_EVENTS.DOCUMENT_CHECKLIST_VIEWED, {
        requiredCount: documents.requiredNow.length,
        laterCount: documents.later.length,
        readyCount: documentDone,
      })
    }
  }, [isBusinessComplete, isFinancialComplete, documents.requiredNow.length, documents.later.length, documentDone])

  if (!isBusinessComplete) {
    return <Navigate to="/check/business" replace />
  }

  if (!isFinancialComplete) {
    return <Navigate to="/check/financial" replace />
  }

  function handleSubmit() {
    submitApplication()
    navigate('/track')
  }

  return (
    <AppShell step={4} showProgress backTo="/check/result">
      <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-gold-dark">
        {t('common.checkLabel')}
      </p>
      <h1 className="mt-3 font-serif text-[34px] leading-10 text-ink">{t('docs.title')}</h1>
      <p className="mt-3 text-[15px] leading-6 text-muted">{t('docs.help')}</p>
      <p className="mt-2 text-[14px] leading-6 text-muted">{t('docs.prepHelp')}</p>
      <p className="mt-2 text-[14px] leading-6 text-muted">{t('docs.attachHelp')}</p>
      <p className="mt-3 text-[14px] font-semibold text-gold-dark">
        {t('docs.progress', { done: documentDone, total: documentTotal })}
        {attachedCount ? ` · ${t('docs.attachedCount', { count: attachedCount })}` : ''}
      </p>

      <div className="mt-4">
        <AskAssistantButton context="documents" questionId="bank_statements" />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
        <DocumentGroup
          title={t('docs.requiredNow')}
          tag={t('docs.tagRequired')}
          required
          items={documents.requiredNow}
          checks={documentChecks}
          files={documentFiles}
          onToggle={toggleDocument}
          onAttach={attachDocument}
          onRemove={removeDocumentFile}
          t={t}
        />
        <DocumentGroup
          title={t('docs.later')}
          tag={t('docs.tagLater')}
          items={documents.later}
          checks={documentChecks}
          files={documentFiles}
          onToggle={toggleDocument}
          onAttach={attachDocument}
          onRemove={removeDocumentFile}
          t={t}
        />
      </div>

      <p className="mt-6 rounded-xl bg-canvas px-4 py-3 text-[14px] leading-6 text-muted">
        {t('docs.gstAlt')}
      </p>

      <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
        {application.submitted ? (
          <PrimaryButton onClick={() => navigate('/track')}>{t('track.nav')}</PrimaryButton>
        ) : (
          <PrimaryButton onClick={handleSubmit}>{t('docs.submitDemo')}</PrimaryButton>
        )}
        <SecondaryButton onClick={() => navigate('/next-steps')}>{t('common.continue')}</SecondaryButton>
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

function DocumentGroup({
  title,
  tag,
  items,
  required = false,
  checks,
  files,
  onToggle,
  onAttach,
  onRemove,
  t,
}) {
  return (
    <section className="mt-0">
      <h2 className="text-[14px] font-semibold text-ink">{title}</h2>
      <ul className="mt-3 space-y-3">
        {items.map((item) => {
          const checked = Boolean(checks[item.id])
          const file = files[item.id]
          return (
            <li key={item.id} className="rounded-[20px] border border-line bg-card p-4 shadow-card">
              <label className="flex cursor-pointer gap-3">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(item.id)}
                  className="mt-1 h-4 w-4 accent-brand"
                />
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-soft text-gold-dark">
                  <DocumentIcon />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-[16px] font-semibold text-ink">{t(`doc.${item.id}.title`)}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        required ? 'bg-warn-soft text-warn' : 'bg-canvas text-muted'
                      }`}
                    >
                      {tag}
                    </span>
                    {item.phase && PHASE_KEYS[item.phase] ? (
                      <span className="rounded-full bg-canvas px-2 py-0.5 text-[11px] font-semibold text-muted">
                        {t(PHASE_KEYS[item.phase])}
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-2 block text-[13px] font-medium text-muted">{t('docs.why')}</span>
                  <span className="mt-1 block text-[14px] leading-6 text-muted">{t(`doc.${item.id}.why`)}</span>
                  <span className="mt-2 block text-[12px] font-medium text-gold-dark">{t('docs.haveThis')}</span>
                </span>
              </label>
              <div className="mt-3 flex flex-wrap items-center gap-3 pl-[52px]">
                <label className="inline-flex cursor-pointer items-center rounded-lg border border-line bg-canvas px-3 py-1.5 text-[13px] font-semibold text-ink hover:border-gold">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.webp"
                    className="sr-only"
                    onChange={(event) => {
                      const nextFile = event.target.files?.[0]
                      if (nextFile) onAttach(item.id, nextFile)
                      event.target.value = ''
                    }}
                  />
                  {t('docs.attach')}
                </label>
                {file ? (
                  <span className="min-w-0 text-[13px] text-muted">
                    {file.name}
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      className="ml-2 font-semibold text-gold-dark hover:text-ink"
                    >
                      {t('docs.removeFile')}
                    </button>
                  </span>
                ) : (
                  <span className="text-[12px] text-muted">{t('docs.noFile')}</span>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
