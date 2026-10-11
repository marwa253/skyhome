import { cn } from '@/utils/cn'

interface Props {
  label?: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  className?: string
}

export default function Select({ label, value, onChange, options, className }: Props) {
  return (
    <label className={cn('block text-xs', className)}>
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label ?? 'Select'}
        className={cn('block h-11 w-full rounded-xl border border-transparent bg-stone-500/10 px-3 text-sm text-inherit outline-none focus:border-gold', label && 'mt-1')}>
        {options.map((o) => <option key={o.value} value={o.value} className="text-stone-900">{o.label}</option>)}
      </select>
    </label>
  )
}
