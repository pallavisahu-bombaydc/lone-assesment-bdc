export function PrimaryButton({ children, className = '', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_20px_rgb(27_77_62_/_0.28)] transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_12px_28px_rgb(27_77_62_/_0.32)] active:translate-y-0 disabled:cursor-not-allowed disabled:bg-brand/40 disabled:shadow-none disabled:hover:translate-y-0 ${className}`}
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
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-card px-5 py-3.5 text-[15px] font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-gold hover:bg-gold-soft/70 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 ${className}`}
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
      className={`rounded-lg px-2 py-1 text-[14px] font-semibold text-white/90 transition hover:bg-white/10 hover:text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
