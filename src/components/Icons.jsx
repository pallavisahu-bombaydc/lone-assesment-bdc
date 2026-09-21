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

export function CheckMark({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 10.4 8.2 13.6 15 6.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

export function ArrowIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11M11.5 5.5 16 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function ChatIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 5.2A2.2 2.2 0 0 1 6.2 3h7.6A2.2 2.2 0 0 1 16 5.2v6.1A2.2 2.2 0 0 1 13.8 13.5H8.2L4 16.2V5.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ShopIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 8.2 5.2 4.5h9.6L16 8.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4 8.2h12v7.3H4V8.2Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.2 15.5V11h3.6v4.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function FactoryIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3.5 16.5V8.5l4 2.5V8.5l4 2.5V6.2h5v10.3H3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7.2 16.5v-2.2h2.4v2.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function HammerIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M11.2 4.2 16 9l-2 2-4.8-4.8 2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8.4 8.8 4.2 16.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function BriefcaseIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3.2" y="6.5" width="13.6" height="9.2" rx="1.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.2 6.5V5.4A1.4 1.4 0 0 1 8.6 4h2.8a1.4 1.4 0 0 1 1.4 1.4v1.1M3.2 10.2h13.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function UserIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="7.2" r="2.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.8 16c.7-2.6 2.6-4 5.2-4s4.5 1.4 5.2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function TruckIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 7.2h8.2v6.6H3V7.2Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11.2 9.2h3.2L16.5 12v1.8h-5.3V9.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="6.2" cy="14.6" r="1.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="14.2" cy="14.6" r="1.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export function GridIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="5.2" height="5.2" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11.3" y="3.5" width="5.2" height="5.2" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3.5" y="11.3" width="5.2" height="5.2" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11.3" y="11.3" width="5.2" height="5.2" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function BuildingIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.2 16.5V6.2L10 3.8l5.8 2.4v10.3H4.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 16.5v-3.2h4v3.2M7.5 8.2h.01M10 8.2h.01M12.5 8.2h.01M7.5 11h.01M10 11h.01M12.5 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function HomeIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3.8 9.2 10 4.2l6.2 5V16a1 1 0 0 1-1 1H4.8a1 1 0 0 1-1-1V9.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 17v-4.2h4V17" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
