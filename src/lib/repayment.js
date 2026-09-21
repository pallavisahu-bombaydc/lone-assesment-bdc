export const DEMO_ANNUAL_RATE = 0.18
export const DEMO_RATE_PERCENT = Math.round(DEMO_ANNUAL_RATE * 100)

export const TENURE_PLANS = [
  { months: 12, years: 1, titleKey: 'plans.y1', tagKey: 'plans.lessInterest' },
  { months: 24, years: 2, titleKey: 'plans.y2', tagKey: 'plans.balanced' },
  { months: 36, years: 3, titleKey: 'plans.y3', tagKey: 'plans.lowerEmi' },
]

export function examplePrincipal(min, max) {
  const mid = ((min ?? 0) + (max ?? 0)) / 2
  return Math.max(50000, Math.round(mid / 50000) * 50000)
}

export function calculatePlan(principal, months, annualRate = DEMO_ANNUAL_RATE) {
  if (!Number.isFinite(principal) || principal <= 0 || !months) {
    return {
      months,
      principal: 0,
      emi: 0,
      interest: 0,
      total: 0,
      annualRate,
      ratePercent: Math.round(annualRate * 100),
      interestPercent: 0,
    }
  }

  const monthlyRate = annualRate / 12
  let emi
  if (monthlyRate === 0) {
    emi = principal / months
  } else {
    const factor = (1 + monthlyRate) ** months
    emi = (principal * monthlyRate * factor) / (factor - 1)
  }

  const roundedEmi = roundTo(emi, 100)
  const total = roundedEmi * months
  const interest = Math.max(0, total - principal)
  const interestPercent = principal > 0 ? Math.round((interest / principal) * 1000) / 10 : 0

  return {
    months,
    principal,
    emi: roundedEmi,
    interest,
    total,
    annualRate,
    ratePercent: Math.round(annualRate * 100),
    interestPercent,
  }
}

export function getRepaymentPlans(min, max, principal) {
  const low = Number.isFinite(min) ? min : 0
  const high = Number.isFinite(max) ? max : low
  const fallback = examplePrincipal(low, high)
  const amount = Number.isFinite(principal)
    ? Math.min(high, Math.max(low, principal))
    : fallback
  return TENURE_PLANS.map((plan) => ({
    ...plan,
    ...calculatePlan(amount, plan.months),
  }))
}

function roundTo(value, step) {
  return Math.round(value / step) * step
}
