export const LOAN_CHECK_SCENARIOS = [
  { id: 'none' },
  { id: 'honest' },
  { id: 'mismatch' },
  { id: 'multi_property' },
]

export function resolveLoanCheckScenario(scenario, { loanProduct, declaredEmi } = {}) {
  if (LOAN_CHECK_SCENARIOS.some((item) => item.id === scenario)) return scenario
  if (loanProduct === 'lap') return 'multi_property'
  if ((declaredEmi ?? 0) > 0) return 'honest'
  return 'none'
}

export function getExistingLoanDemo({ scenario, loanProduct, declaredEmi }) {
  const resolved = resolveLoanCheckScenario(scenario, { loanProduct, declaredEmi })
  const declared = Number.isFinite(declaredEmi) ? declaredEmi : 0

  if (resolved === 'none') {
    return {
      id: 'none',
      alignment: declared === 0 ? 'no_loans' : 'declared_only',
      declaredEmi: declared,
      sampleEmi: 0,
      loans: [],
      properties: [],
    }
  }

  if (resolved === 'mismatch') {
    const loans = [
      { id: 'L-2041', typeKey: 'personal', lenderKey: 'bankA', emi: 12000 },
      { id: 'L-1188', typeKey: 'vehicle', lenderKey: 'nbfcB', emi: 6000 },
    ]
    const sampleEmi = 18000
    return {
      id: 'mismatch',
      alignment: emiClose(declared, sampleEmi) ? 'match' : 'needs_check',
      declaredEmi: declared,
      sampleEmi,
      loans,
      properties: [],
    }
  }

  if (resolved === 'honest') {
    const sampleEmi = declared > 0 ? declared : 18000
    const first = roundEmi(sampleEmi * 0.65) || sampleEmi
    const second = Math.max(0, sampleEmi - first)
    const loans = [{ id: 'L-3310', typeKey: 'business', lenderKey: 'nbfcC', emi: first }]
    if (second > 0) {
      loans.push({ id: 'L-4412', typeKey: 'vehicle', lenderKey: 'bankA', emi: second })
    }
    return {
      id: 'honest',
      alignment: 'existing_ok',
      declaredEmi: declared,
      sampleEmi,
      loans,
      properties: [],
    }
  }

  const properties = [
    { id: 'PROP-101', cityKey: 'pune', status: 'clear', lenderKey: null, emi: 0 },
    { id: 'PROP-204', cityKey: 'nashik', status: 'charged', lenderKey: 'housing', emi: 14000 },
    { id: 'PROP-318', cityKey: 'nagpur', status: 'charged', lenderKey: 'nbfcC', emi: 9000 },
    { id: 'PROP-440', cityKey: 'kolhapur', status: 'clear', lenderKey: null, emi: 0 },
  ]
  const sampleEmi = properties.reduce((sum, item) => sum + item.emi, 0)

  return {
    id: 'multi_property',
    alignment: declared === 0 ? 'needs_check' : emiClose(declared, sampleEmi) ? 'existing_ok' : 'partial',
    declaredEmi: declared,
    sampleEmi,
    loans: properties
      .filter((item) => item.status === 'charged')
      .map((item) => ({
        id: item.id,
        typeKey: 'housing',
        lenderKey: item.lenderKey,
        emi: item.emi,
      })),
    properties,
  }
}

function emiClose(declared, sample) {
  return Math.abs(declared - sample) <= 500
}

function roundEmi(value) {
  return Math.round(value / 500) * 500
}
