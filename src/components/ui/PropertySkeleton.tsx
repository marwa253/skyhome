export default function PropertySkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-stone-200 dark:border-stone-800" aria-hidden>
      <div className="skeleton aspect-[4/3] animate-shimmer" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-5 w-2/3 animate-shimmer rounded" />
        <div className="skeleton h-4 w-1/3 animate-shimmer rounded" />
        <div className="skeleton h-11 animate-shimmer rounded-xl" />
      </div>
    </div>
  )
}
