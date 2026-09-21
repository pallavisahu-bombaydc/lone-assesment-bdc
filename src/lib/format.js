export function formatINR(value, { compact = false } = {}) {
  if (value == null || !Number.isFinite(value)) return '—'

  if (compact) {
    if (value >= 10000000) {
      const crores = value / 10000000
      return `₹${formatCompactNumber(crores)}Cr`
    }
    if (value >= 100000) {
      const lakhs = value / 100000
      return `₹${formatCompactNumber(lakhs)}L`
    }
    if (value >= 1000) {
      const thousands = value / 1000
      return `₹${formatCompactNumber(thousands)}K`
    }
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatINRInput(value) {
  if (value == null || value === '') return ''
  if (!Number.isFinite(value)) return ''
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value)
}

export function parseDigitsToNumber(raw) {
  const digits = String(raw ?? '').replace(/[^\d]/g, '')
  if (digits === '') return null
  const value = Number(digits)
  return Number.isFinite(value) ? value : NaN
}

function formatCompactNumber(value) {
  if (Number.isInteger(value)) return String(value)
  return value.toFixed(1).replace(/\.0$/, '')
}

export function labelFor(options, id) {
  return options.find((option) => option.id === id)?.label ?? '—'
}
