export function getDecision({ vintage, estimate, revenue, emi }) {
  if (vintage === 'lt_1' || estimate.reason === 'vintage_too_short') {
    return { id: 'wait', reasonKey: 'decision.waitVintage' }
  }

  if (estimate.reason === 'high_emi' || estimate.reason === 'low_surplus') {
    return { id: 'wait', reasonKey: `decision.wait_${estimate.reason}` }
  }

  if (!estimate.ok) {
    return { id: 'talk', reasonKey: 'decision.talkMissing' }
  }

  const emiRatio = revenue > 0 ? (emi ?? 0) / revenue : 0
  if ((estimate.surplus ?? 0) < 60000 || emiRatio > 0.25) {
    return { id: 'talk', reasonKey: 'decision.talkBorderline' }
  }

  return { id: 'apply', reasonKey: 'decision.applyReady' }
}
