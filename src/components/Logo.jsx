import { Link } from 'react-router-dom'

function Mark({ light }) {
  return (
    <span
      className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-sm ${
        light ? 'bg-white text-brand' : 'bg-brand text-white'
      }`}
    >
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M10 3.2c2.6 2.2 4.8 3.4 6.5 6.1-1.2 3.6-3.8 5.6-6.5 7.5-2.7-1.9-5.3-3.9-6.5-7.5C5.2 6.6 7.4 5.4 10 3.2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M7.6 10.3 9.4 12l3.4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  )
}

export function Logo({ to = '/', light = false }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2.5 no-underline">
      <Mark light={light} />
      <span className={`text-[17px] font-semibold tracking-[-0.02em] ${light ? 'text-white' : 'text-ink'}`}>
        LoanReady
      </span>
    </Link>
  )
}
