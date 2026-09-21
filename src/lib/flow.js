export function isSessionEmpty(profile) {
  return (
    !profile?.loanProduct &&
    !profile?.businessType &&
    !profile?.vintage &&
    !Number.isFinite(profile?.revenue)
  )
}

export function getCheckRedirect(profile, { requireFinancial = false } = {}) {
  if (isSessionEmpty(profile)) return '/'
  if (!profile.loanProduct || !profile.businessType || !profile.vintage) return '/check/business'
  if (requireFinancial && !(Number.isFinite(profile.revenue) && profile.revenue >= 0)) {
    return '/check/financial'
  }
  return null
}
