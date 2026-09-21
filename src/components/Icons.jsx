export function ShieldIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 2.5 16 5v5.2c0 3.7-2.4 6.1-6 7.3-3.6-1.2-6-3.6-6-7.3V5l6-2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M7.5 10.2 9.2 12l3.5-3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function DocumentIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M6 3.5h5.2L15 7.3V16a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 5 16V5a1.5 1.5 0 0 1 1-1.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M11 3.5V8h4.2M7.5 11h5M7.5 13.5h3.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function EyeIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M2.5 10s2.8-5 7.5-5 7.5 5 7.5 5-2.8 5-7.5 5-7.5-5-7.5-5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="10" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function ClockIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6.5V10l2.5 1.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function CheckIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.8 10.2 9 12.4l4.3-4.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function RupeeIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="13" height="13" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 7.2h6M7 9.6h6M10.6 7.2c1.4 0 2.4.8 2.4 2.1 0 1.4-1.1 2.3-2.6 2.3H8.8L13 14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CalendarIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="13" height="11.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 8.5h13M7 3.5v3M13 3.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function PercentIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13" cy="13" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14.2 5.8 5.8 14.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function AlertIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 3.8 17 16H3L10 3.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 8.2v3.3M10 13.8h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
