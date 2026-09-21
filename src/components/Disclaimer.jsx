export function Disclaimer({ children, className = '' }) {
  return (
    <p className={`text-[13px] leading-5 text-muted ${className}`}>
      {children}
    </p>
  )
}
