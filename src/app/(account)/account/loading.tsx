export default function AccountLoading() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-48 rounded-3xl bg-neutral-200 dark:bg-neutral-800" />
      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <div className="hidden h-96 rounded-3xl bg-neutral-200 lg:block dark:bg-neutral-800" />
        <div className="h-96 rounded-3xl bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  )
}
