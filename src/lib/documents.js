const GST_REVENUE_THRESHOLD = 100000

export function getDocumentChecklist({ vintage, revenue }) {
  const requiredNow = [
    {
      id: 'pan',
      title: 'PAN',
      why: 'Used to verify identity and business information.',
      phase: 'today',
    },
    {
      id: 'bank_statements',
      title: 'Bank statements — Last 6 months',
      why: 'Helps understand business cash flow.',
      phase: 'this_week',
    },
  ]

  const later = [
    {
      id: 'itr',
      title: 'Income tax returns',
      why: 'Helps verify reported income over a longer period.',
      phase: 'apply',
    },
    {
      id: 'business_proof',
      title: 'Address or business proof',
      why: 'Confirms where the business operates.',
      phase: 'apply',
    },
  ]

  const gstNow = Number.isFinite(revenue) && revenue >= GST_REVENUE_THRESHOLD

  const gstItem = {
    id: 'gst',
    title: 'GST returns',
    why: 'Helps verify reported business turnover.',
    phase: 'apply',
  }

  if (vintage === 'lt_1') {
    requiredNow.push({
      id: 'commencement',
      title: 'Proof of business commencement',
      why: 'Helps confirm that the business has started operating.',
      phase: 'today',
    })
    if (gstNow) {
      later.unshift(gstItem)
    }
  } else if (gstNow) {
    requiredNow.push(gstItem)
  } else {
    later.unshift(gstItem)
  }

  return { requiredNow, later }
}

export function getPrepPlan(documents) {
  const all = [...documents.requiredNow, ...documents.later]
  return {
    today: all.filter((item) => item.phase === 'today'),
    thisWeek: all.filter((item) => item.phase === 'this_week'),
    apply: all.filter((item) => item.phase === 'apply'),
  }
}

export function getReadinessItems({
  businessType,
  vintage,
  revenue,
  expenses,
  emi,
  documents,
  documentChecks = {},
}) {
  const incomeReady =
    Number.isFinite(revenue) &&
    revenue >= 0 &&
    (expenses == null || (Number.isFinite(expenses) && expenses >= 0)) &&
    (emi == null || (Number.isFinite(emi) && emi >= 0))

  const gstRequiredNow = documents.requiredNow.some((item) => item.id === 'gst')
  const bankReady = Boolean(documentChecks.bank_statements)
  const gstReady = Boolean(documentChecks.gst)

  return [
    {
      id: 'business',
      label: 'Business details',
      status: businessType && vintage ? 'ready' : 'needed',
    },
    {
      id: 'income',
      label: 'Income details',
      status: incomeReady ? 'ready' : 'needed',
    },
    {
      id: 'bank',
      label: 'Bank statements',
      status: bankReady ? 'ready' : 'needed',
    },
    {
      id: 'gst',
      label: 'GST documents',
      status: gstReady ? 'ready' : gstRequiredNow ? 'needed' : 'later',
    },
  ]
}
