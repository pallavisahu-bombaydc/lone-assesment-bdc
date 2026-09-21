import { CheckMark } from './Icons'

export function ChoiceCard({ name, value, checked, onChange, icon: Icon, children }) {
  return (
    <label
      className={`group flex min-h-[64px] cursor-pointer items-center rounded-2xl border px-3.5 py-3.5 text-[15px] font-medium transition ${
        checked
          ? 'border-brand bg-brand-soft text-ink shadow-card -translate-y-0.5'
          : 'border-line bg-card text-ink hover:border-brand/40 hover:shadow-sm'
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
      {Icon ? (
        <span
          className={`mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
            checked ? 'bg-brand text-white' : 'bg-canvas text-brand group-hover:bg-brand-soft'
          }`}
        >
          <Icon className="h-5 w-5" />
        </span>
      ) : (
        <span
          className={`mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
            checked ? 'border-brand' : 'border-line'
          }`}
        >
          {checked ? <span className="h-2.5 w-2.5 rounded-full bg-brand" /> : null}
        </span>
      )}
      <span className="min-w-0 flex-1 leading-5">{children}</span>
      {checked ? <CheckMark className="ml-2 h-4 w-4 shrink-0 text-brand" /> : null}
    </label>
  )
}
