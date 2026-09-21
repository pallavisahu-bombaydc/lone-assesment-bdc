export const ASSISTANT_DISCLAIMER =
  'Loan Assistant provides general guidance. It does not make lending decisions.'

export const ASSISTANT_QUESTIONS = [
  {
    id: 'variable_income',
    contexts: ['financial'],
    question: 'My income changes every month. What should I enter?',
    answer:
      'If your income varies, use your average monthly business revenue from recent months rather than your highest month. This gives a more representative picture of your business income.',
  },
  {
    id: 'what_is_emi',
    contexts: ['financial', 'result'],
    question: 'What are existing monthly EMI obligations?',
    answer:
      'This is the total you already pay each month towards other loans, such as a business loan, vehicle loan or personal loan. If you do not have any, enter 0.',
  },
  {
    id: 'indicative_range',
    contexts: ['result', 'financial'],
    question: 'What does an indicative loan range mean?',
    answer:
      'An indicative range is an estimate based on the details you entered in this check. It is not an offer or approval. Final eligibility and terms depend on verification and the lender’s criteria.',
  },
  {
    id: 'bank_statements',
    contexts: ['documents', 'financial'],
    question: 'Why do you need bank statements?',
    answer:
      'Bank statements from the last 6 months help understand business cash flow — money coming in and going out. You do not need to upload them during this readiness check.',
  },
  {
    id: 'gst_returns',
    contexts: ['documents'],
    question: 'Why might GST returns be needed?',
    answer:
      'GST returns help verify reported business turnover. Whether they are needed now depends on your business type and typical monthly revenue. This check only tells you what may be required.',
  },
  {
    id: 'am_i_approved',
    contexts: ['result', 'next-steps', 'documents'],
    question: 'Does this mean I am approved?',
    answer:
      'No. Loan Assistant cannot approve or reject a loan, and this check is not a credit decision. It only helps you understand an estimated range, documents and next steps before you apply.',
  },
  {
    id: 'after_apply',
    contexts: ['next-steps', 'result'],
    question: 'What happens after I apply?',
    answer:
      'If you continue to an application, the typical path is submission, document verification, credit assessment, then an offer if eligible, and disbursement after required checks. Timing depends on the lender and your documents.',
  },
  {
    id: 'repayment_plans',
    contexts: ['result'],
    question: 'Why do 1-year and 3-year EMIs look different?',
    answer:
      'These are demo examples only. A shorter tenure usually means a higher monthly EMI and less total interest. A longer tenure lowers the monthly EMI but you pay more interest overall. Final rate and tenure are not decided in this check.',
  },
  {
    id: 'live_track',
    contexts: ['track', 'next-steps', 'documents'],
    question: 'Is this live tracking of a real application?',
    answer:
      'No. This tracker is a demo on your device. Status changes here are simulated. A real product would connect to the lender’s application system. This check cannot pass or fail a live loan.',
  },
]

export function getAssistantQuestions(context) {
  const ranked = [...ASSISTANT_QUESTIONS].sort((a, b) => {
    const aMatch = a.contexts.includes(context) ? 0 : 1
    const bMatch = b.contexts.includes(context) ? 0 : 1
    return aMatch - bMatch
  })
  return ranked
}

export function getAssistantAnswer(questionId) {
  return ASSISTANT_QUESTIONS.find((item) => item.id === questionId) ?? null
}
