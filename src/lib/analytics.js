/**
 * Mock product analytics for the LoanReady prototype.
 *
 * Key business metrics these events support:
 * 1. Loan Readiness Check Completion Rate
 *    loan_readiness_started → financial_profile_completed → readiness_result_viewed
 * 2. Qualified Lead Rate
 *    lead_captured / readiness_result_viewed where an indicative range could be shown
 * 3. Application Start Rate
 *    application_started / readiness_result_viewed
 * 4. Document Completion Rate
 *    document_toggled / document_checklist_viewed
 *
 * This prototype only logs events locally. No data is sent to a server.
 */
export const ANALYTICS_EVENTS = {
  LOAN_READINESS_STARTED: 'loan_readiness_started',
  BUSINESS_PROFILE_COMPLETED: 'business_profile_completed',
  FINANCIAL_PROFILE_COMPLETED: 'financial_profile_completed',
  READINESS_RESULT_VIEWED: 'readiness_result_viewed',
  DOCUMENT_CHECKLIST_VIEWED: 'document_checklist_viewed',
  APPLICATION_STARTED: 'application_started',
  LANGUAGE_CHANGED: 'language_changed',
  LEAD_CAPTURED: 'lead_captured',
  SUMMARY_SHARED: 'summary_shared',
  SUMMARY_PRINTED: 'summary_printed',
  DECISION_VIEWED: 'decision_viewed',
  WHATIF_ADJUSTED: 'whatif_adjusted',
  DOCUMENT_TOGGLED: 'document_toggled',
  DOCUMENT_ATTACHED: 'document_attached',
  APPLICATION_SUBMITTED: 'application_submitted',
  APPLICATION_STATUS_CHANGED: 'application_status_changed',
}

export function track(event, payload = {}) {
  console.info('[LoanReady analytics]', event, payload)
}
