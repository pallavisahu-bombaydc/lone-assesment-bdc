export const LOAN_PRODUCTS = [
  { id: 'business_msme', label: 'Business Loan / MSME Loan' },
  { id: 'lap', label: 'Loan Against Property (LAP)' },
]

export const BUSINESS_TYPES = [
  { id: 'shop_owner', label: 'Retail or trading business' },
  { id: 'manufacturer', label: 'Manufacturing unit' },
  { id: 'contractor', label: 'Contractor or builder' },
  { id: 'professional', label: 'Doctor, CA, lawyer or similar' },
  { id: 'freelancer', label: 'Freelancer or consultant' },
  { id: 'transporter', label: 'Transport or logistics' },
  { id: 'other', label: 'Other self-employed work' },
]

export const VINTAGE_OPTIONS = [
  { id: 'lt_1', label: 'Less than 1 year' },
  { id: '1_3', label: '1–3 years' },
  { id: '3_5', label: '3–5 years' },
  { id: '5_plus', label: '5+ years' },
]

export const DEMO_PERSONA = {
  name: 'Rahul',
  age: 36,
  role: 'Self-employed interior contractor',
  summary: 'Rahul, 36, interior contractor · 5+ years in business',
  businessType: 'contractor',
  vintage: '5_plus',
  loanProduct: 'business_msme',
  revenue: 350000,
  expenses: 210000,
  emi: 18000,
}

export const INITIAL_LOAN_STATE = {
  loanProduct: '',
  businessType: '',
  vintage: '',
  revenue: null,
  expenses: null,
  emi: null,
  usedDemoPersona: false,
}

function hasId(list, id) {
  return list.some((item) => item.id === id)
}

export function sanitizeProfile(profile) {
  if (!profile) return { ...INITIAL_LOAN_STATE }
  return {
    ...INITIAL_LOAN_STATE,
    ...profile,
    loanProduct: hasId(LOAN_PRODUCTS, profile.loanProduct) ? profile.loanProduct : '',
    businessType: hasId(BUSINESS_TYPES, profile.businessType) ? profile.businessType : '',
    vintage: hasId(VINTAGE_OPTIONS, profile.vintage) ? profile.vintage : '',
  }
}
