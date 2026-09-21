const VINTAGE_FACTORS = {
  '1_3': 4,
  '3_5': 5.2,
  '5_plus': 6.56,
}

const MIN_SURPLUS = 25000
const HIGH_EMI_RATIO = 0.5
const EMI_RATE = 0.0248

export function estimateEligibility({ vintage, revenue, expenses, emi }) {
  if (revenue == null || revenue === '') {
    return cannotEstimate('missing_revenue', [
      'Average monthly business revenue is needed to estimate a range.',
    ])
  }

  if (!Number.isFinite(revenue) || revenue < 0) {
    return cannotEstimate('invalid_revenue', [
      'Enter a valid monthly revenue amount, using numbers only.',
    ])
  }

  if (expenses != null && (!Number.isFinite(expenses) || expenses < 0)) {
    return cannotEstimate('invalid_expenses', [
      'Enter a valid monthly expenses amount, or leave it as 0.',
    ])
  }

  if (emi != null && (!Number.isFinite(emi) || emi < 0)) {
    return cannotEstimate('invalid_emi', [
      'Enter a valid monthly EMI amount, or leave it as 0 if you have none.',
    ])
  }

  if (!vintage) {
    return cannotEstimate('missing_vintage', [
      'Business vintage helps us understand how established the business is.',
    ])
  }

  if (vintage === 'lt_1') {
    return cannotEstimate('vintage_too_short', [
      'Businesses less than 1 year old usually need a little more operating history before we can show an indicative range.',
    ])
  }

  const safeExpenses = expenses ?? 0
  const safeEmi = emi ?? 0
  const surplus = revenue - safeExpenses - safeEmi

  if (revenue > 0 && safeEmi / revenue > HIGH_EMI_RATIO) {
    return cannotEstimate('high_emi', [
      'Existing EMI obligations are high compared with monthly revenue, so this demo cannot show a reliable range.',
    ])
  }

  if (surplus < MIN_SURPLUS) {
    return cannotEstimate('low_surplus', [
      'After expenses and existing EMIs, monthly surplus is too low for this demo to show an indicative range.',
    ])
  }

  const factor = VINTAGE_FACTORS[vintage]
  if (!factor) {
    return cannotEstimate('missing_vintage', [
      'Business vintage helps us understand how established the business is.',
    ])
  }

  const rawMax = surplus * factor
  const max = roundTo(rawMax, 50000)
  const min = roundTo(max * 0.6, 50000)

  if (max < 50000 || min < 50000) {
    return cannotEstimate('low_surplus', [
      'The calculated estimate is too small to show a useful indicative range.',
    ])
  }

  return {
    ok: true,
    min,
    max,
    emiLow: roundTo(min * EMI_RATE, 100),
    emiHigh: roundTo(max * EMI_RATE, 100),
    surplus,
    demoOnly: true,
  }
}

export function getEstimateExplainer() {
  return 'This prototype uses simplified demo logic based on business vintage, average monthly surplus (revenue minus expenses and existing EMIs), and basic affordability checks. A real lending decision would use the lender’s approved underwriting and verification process.'
}

export function getReadinessScore({ vintage, revenue, expenses, emi, estimateOk }) {
  if (vintage === 'lt_1') {
    return { score: 28, labelKey: 'score.needs_history' }
  }

  if (!estimateOk) {
    const safeRevenue = Number.isFinite(revenue) ? revenue : 0
    const safeEmi = emi ?? 0
    if (safeRevenue > 0 && safeEmi / safeRevenue > HIGH_EMI_RATIO) {
      return { score: 34, labelKey: 'score.high_emi' }
    }
    return { score: 32, labelKey: 'score.need_info' }
  }

  const vintageBase = { '1_3': 58, '3_5': 70, '5_plus': 78 }
  let score = vintageBase[vintage] ?? 50
  const surplus = (revenue ?? 0) - (expenses ?? 0) - (emi ?? 0)
  score += Math.min(14, Math.floor(Math.max(surplus, 0) / 20000))

  const emiRatio = revenue > 0 ? (emi ?? 0) / revenue : 0
  if (emiRatio > 0.25) score -= 6

  return {
    score: Math.max(40, Math.min(92, score)),
    labelKey: 'score.indicative',
  }
}

function cannotEstimate(reason, missing) {
  return {
    ok: false,
    reason,
    missing,
    min: null,
    max: null,
    emiLow: null,
    emiHigh: null,
  }
}

function roundTo(value, step) {
  return Math.round(value / step) * step
}
