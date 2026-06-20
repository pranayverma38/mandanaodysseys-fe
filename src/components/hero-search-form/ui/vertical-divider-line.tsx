import clsx from 'clsx'

export const VerticalDividerLine = ({ className }: { className?: string }) => {
  return <div className={clsx('-z-20 h-8 self-center border-l', className)} />
}
