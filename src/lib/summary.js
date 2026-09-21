import { formatINR } from './format'
import { getRepaymentPlans } from './repayment'

export function buildShareText(t, { estimate, documents }) {
  const range = estimate.ok
    ? `${formatINR(estimate.min)} – ${formatINR(estimate.max)}`
    : t('confirm.noRange')
  const docs = [...documents.requiredNow, ...documents.later]
    .map((item) => t(`doc.${item.id}.title`))
    .join(', ')
  const twoYear = estimate.ok ? getRepaymentPlans(estimate.min, estimate.max).find((plan) => plan.months === 24) : null
  const emi24 = twoYear ? formatINR(twoYear.emi) : t('confirm.noRange')

  return t('summary.shareText', { range, docs, emi24 })
}
