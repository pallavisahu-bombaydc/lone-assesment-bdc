import { formatINRInput, parseDigitsToNumber } from '../lib/format'

export function CurrencyInput({
  id,
  label,
  value,
  onChange,
  hint,
  error,
  placeholder = '0',
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[14px] font-medium text-ink">
        {label}
      </label>
      <div
        className={`flex items-center rounded-2xl border bg-card px-4 shadow-sm ${
          error ? 'border-[#b45309] ring-2 ring-[#b45309]/10' : 'border-line focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20'
        }`}
      >
        <span className="pr-2 text-[16px] font-semibold text-muted">₹</span>
        <input
          id={id}
          inputMode="numeric"
          autoComplete="off"
          placeholder={placeholder}
          value={formatINRInput(value)}
          onChange={(event) => onChange(parseDigitsToNumber(event.target.value))}
          className="w-full bg-transparent py-3.5 text-[16px] text-ink outline-none placeholder:text-muted/60"
        />
      </div>
      {error ? <p className="mt-2 text-[13px] text-[#9a3412]">{error}</p> : null}
      {!error && hint ? <p className="mt-2 text-[13px] leading-5 text-muted">{hint}</p> : null}
    </div>
  )
}
