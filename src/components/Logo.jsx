import { Link } from 'react-router-dom'

export function Logo({ to = '/', light = false }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2.5 no-underline">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold ${
          light ? 'bg-white text-brand' : 'bg-brand text-white'
        }`}
      >
        L
      </span>
      <span className={`text-[17px] font-semibold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
        LoanReady
      </span>
    </Link>
  )
}
