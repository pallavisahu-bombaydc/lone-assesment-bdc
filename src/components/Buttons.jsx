export function PrimaryButton({ children, className = '', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex w-full items-center justify-center rounded-xl bg-brand px-5 py-3.5 text-[15px] font-semibold text-white shadow-[0_1px_0_rgb(0_0_0_/_0.2)] transition hover:bg-brand-dark hover:shadow-[0_0_0_2px_#111111] disabled:cursor-not-allowed disabled:bg-brand/40 disabled:shadow-none ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function SecondaryButton({ children, className = '', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex w-full items-center justify-center rounded-xl border border-line bg-card px-5 py-3.5 text-[15px] font-semibold text-ink transition hover:border-gold hover:bg-gold-soft/70 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function TextButton({ children, className = '', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`text-[14px] font-semibold text-white transition hover:text-gold-soft ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
