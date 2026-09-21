export function ChoiceCard({ name, value, checked, onChange, children }) {
  return (
    <label
      className={`flex min-h-[56px] cursor-pointer items-center rounded-2xl border px-4 py-4 text-[15px] font-medium transition ${
        checked
          ? 'border-ink bg-brand-soft text-ink shadow-[inset_0_0_0_1px_#111111]'
          : 'border-line bg-card text-ink hover:border-gold/50'
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={`mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          checked ? 'border-gold' : 'border-line'
        }`}
      >
        {checked ? <span className="h-2.5 w-2.5 rounded-full bg-brand" /> : null}
      </span>
      {children}
    </label>
  )
}
