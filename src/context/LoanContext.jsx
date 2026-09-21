import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ANALYTICS_EVENTS, track } from '../lib/analytics'
import { DEMO_PERSONA, INITIAL_LOAN_STATE, sanitizeProfile } from '../lib/constants'
import { getDocumentChecklist, getPrepPlan, getReadinessItems } from '../lib/documents'
import { estimateEligibility } from '../lib/eligibility'
import { getStoredLanguage, storeLanguage, translate } from '../lib/i18n'
import { clearProgress, loadProgress, saveProgress } from '../lib/storage'
import { EMPTY_APPLICATION, TRACK_LAST_STEP, getDemoOutcome } from '../lib/tracking'

const EMPTY_LEAD = {
  name: '',
  mobile: '',
  city: '',
  consent: false,
  submitted: false,
}

const savedProgress = loadProgress()

const LoanContext = createContext(null)

export function LoanProvider({ children }) {
  const [profile, setProfile] = useState(
    sanitizeProfile(savedProgress?.profile ?? INITIAL_LOAN_STATE),
  )
  const [lead, setLead] = useState(savedProgress?.lead ?? EMPTY_LEAD)
  const [documentChecks, setDocumentChecks] = useState(savedProgress?.documentChecks ?? {})
  const [documentFiles, setDocumentFiles] = useState(savedProgress?.documentFiles ?? {})
  const [lastPath, setLastPath] = useState(savedProgress?.lastPath ?? '/')
  const [language, setLanguageState] = useState(getStoredLanguage)
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [assistantContext, setAssistantContext] = useState('financial')
  const [assistantQuestionId, setAssistantQuestionId] = useState('variable_income')
  const [applicationStarted, setApplicationStarted] = useState(
    savedProgress?.applicationStarted ?? false,
  )
  const [application, setApplication] = useState(savedProgress?.application ?? EMPTY_APPLICATION)
  const [userIntent, setUserIntentState] = useState(
    ['apply', 'wait', 'talk'].includes(savedProgress?.userIntent) ? savedProgress.userIntent : null,
  )

  useEffect(() => {
    document.documentElement.lang = language === 'hi' ? 'hi' : 'en'
  }, [language])

  useEffect(() => {
    saveProgress({
      profile,
      lead,
      documentChecks,
      documentFiles,
      lastPath,
      applicationStarted,
      application,
      userIntent,
    })
  }, [profile, lead, documentChecks, documentFiles, lastPath, applicationStarted, application, userIntent])

  const estimate = useMemo(
    () =>
      estimateEligibility({
        vintage: profile.vintage,
        revenue: profile.revenue,
        expenses: profile.expenses,
        emi: profile.emi,
      }),
    [profile.vintage, profile.revenue, profile.expenses, profile.emi],
  )

  const documents = useMemo(
    () =>
      getDocumentChecklist({
        vintage: profile.vintage,
        revenue: profile.revenue,
      }),
    [profile.vintage, profile.revenue],
  )

  const prepPlan = useMemo(() => getPrepPlan(documents), [documents])

  const readiness = useMemo(
    () =>
      getReadinessItems({
        ...profile,
        documents,
        documentChecks,
      }),
    [profile, documents, documentChecks],
  )

  const allDocumentIds = [...documents.requiredNow, ...documents.later].map((item) => item.id)
  const documentTotal = allDocumentIds.length
  const documentDone = allDocumentIds.filter((id) => documentChecks[id]).length
  const attachedCount = Object.keys(documentFiles).length
  const hasSavedProgress = Boolean(
    profile.businessType || Number.isFinite(profile.revenue) || application.submitted,
  )

  const value = useMemo(
    () => ({
      profile,
      lead,
      language,
      estimate,
      documents,
      prepPlan,
      readiness,
      documentChecks,
      documentFiles,
      lastPath,
      assistantOpen,
      assistantContext,
      assistantQuestionId,
      applicationStarted,
      application,
      userIntent,
      hasSavedProgress,
      documentTotal,
      documentDone,
      attachedCount,
      isBusinessComplete: Boolean(profile.loanProduct && profile.businessType && profile.vintage),
      isFinancialComplete: Number.isFinite(profile.revenue) && profile.revenue >= 0,
      t(key, vars) {
        return translate(language, key, vars)
      },
      setLanguage(next) {
        setLanguageState(next)
        storeLanguage(next)
        track(ANALYTICS_EVENTS.LANGUAGE_CHANGED, { language: next })
      },
      setLastPath,
      updateProfile(partial) {
        setProfile((current) => ({ ...current, ...partial }))
      },
      toggleDocument(id) {
        setDocumentChecks((current) => {
          const next = { ...current, [id]: !current[id] }
          track(ANALYTICS_EVENTS.DOCUMENT_TOGGLED, {
            id,
            checked: next[id],
          })
          return next
        })
      },
      attachDocument(id, file) {
        if (!file) return
        setDocumentFiles((current) => ({
          ...current,
          [id]: { name: file.name, size: file.size },
        }))
        setDocumentChecks((current) => ({ ...current, [id]: true }))
        track(ANALYTICS_EVENTS.DOCUMENT_ATTACHED, { id, name: file.name })
      },
      removeDocumentFile(id) {
        setDocumentFiles((current) => {
          const next = { ...current }
          delete next[id]
          return next
        })
      },
      saveLead(nextLead) {
        setLead({ ...nextLead, submitted: true })
        track(ANALYTICS_EVENTS.LEAD_CAPTURED, {
          city: nextLead.city,
          hasEstimate: estimate.ok,
        })
      },
      applyDemoPersona() {
        setProfile({
          businessType: DEMO_PERSONA.businessType,
          vintage: DEMO_PERSONA.vintage,
          loanProduct: DEMO_PERSONA.loanProduct,
          revenue: DEMO_PERSONA.revenue,
          expenses: DEMO_PERSONA.expenses,
          emi: DEMO_PERSONA.emi,
          usedDemoPersona: true,
        })
        setLastPath('/check/business')
      },
      reset() {
        setProfile(INITIAL_LOAN_STATE)
        setLead(EMPTY_LEAD)
        setDocumentChecks({})
        setDocumentFiles({})
        setLastPath('/')
        setAssistantOpen(false)
        setApplicationStarted(false)
        setApplication(EMPTY_APPLICATION)
        setUserIntentState(null)
        clearProgress()
      },
      setUserIntent(next) {
        setUserIntentState(['apply', 'wait', 'talk'].includes(next) ? next : null)
      },
      openAssistant(context, questionId) {
        setAssistantContext(context)
        if (questionId) setAssistantQuestionId(questionId)
        setAssistantOpen(true)
      },
      closeAssistant() {
        setAssistantOpen(false)
      },
      setAssistantQuestionId,
      markApplicationStarted() {
        if (!applicationStarted) {
          track(ANALYTICS_EVENTS.APPLICATION_STARTED, {
            hasEstimate: estimate.ok,
          })
        }
        setApplicationStarted(true)
      },
      submitApplication() {
        const pendingOutcome = getDemoOutcome({
          vintage: profile.vintage,
          estimate,
          revenue: profile.revenue,
          emi: profile.emi,
        })
        setApplicationStarted(true)
        setApplication({
          submitted: true,
          submittedAt: Date.now(),
          stepIndex: 0,
          outcome: null,
          pendingOutcome,
        })
        track(ANALYTICS_EVENTS.APPLICATION_SUBMITTED, {
          pendingOutcome,
          fileCount: Object.keys(documentFiles).length,
          hasEstimate: estimate.ok,
        })
      },
      advanceApplication() {
        setApplication((current) => {
          if (!current.submitted || current.stepIndex >= TRACK_LAST_STEP) return current
          const stepIndex = current.stepIndex + 1
          const outcome = stepIndex >= TRACK_LAST_STEP ? current.pendingOutcome : current.outcome
          track(ANALYTICS_EVENTS.APPLICATION_STATUS_CHANGED, {
            stepIndex,
            outcome,
          })
          return { ...current, stepIndex, outcome }
        })
      },
      replayTracking() {
        setApplication((current) => {
          if (!current.submitted) return current
          return {
            ...current,
            stepIndex: 0,
            outcome: null,
            submittedAt: Date.now(),
          }
        })
      },
    }),
    [
      profile,
      lead,
      language,
      estimate,
      documents,
      prepPlan,
      readiness,
      documentChecks,
      documentFiles,
      lastPath,
      applicationStarted,
      application,
      userIntent,
      hasSavedProgress,
      documentTotal,
      documentDone,
      attachedCount,
      assistantOpen,
      assistantContext,
      assistantQuestionId,
    ],
  )

  return <LoanContext.Provider value={value}>{children}</LoanContext.Provider>
}

export function useLoan() {
  const context = useContext(LoanContext)
  if (!context) {
    throw new Error('useLoan must be used within LoanProvider')
  }
  return context
}
