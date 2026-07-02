export function AuthDivider() {
  return (
    <div className="relative text-center">
      <span className="relative z-10 inline-block bg-white px-4 text-sm font-medium dark:bg-neutral-900 dark:text-neutral-400">
        OR
      </span>
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 border border-neutral-100 dark:border-neutral-800" />
    </div>
  )
}
