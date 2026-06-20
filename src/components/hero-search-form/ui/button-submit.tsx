import { Search01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import { FC } from 'react'

const styles = {
  base: 'absolute z-10 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full focus:outline-hidden cursor-pointer',
  default: 'size-16 end-2 xl:end-3 bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200',
  small: 'size-14 end-2 bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200',
  minimal:
    'end-1 top-1/2 size-9 border border-white/40 bg-white/15 text-white hover:bg-white/25',
}

interface Props {
  className?: string
  fieldStyle: 'default' | 'small' | 'minimal'
}

export const ButtonSubmit: FC<Props> = ({ className, fieldStyle = 'default' }) => {
  return (
    <button type="submit" className={clsx(styles.base, styles[fieldStyle], className)}>
      <HugeiconsIcon icon={Search01Icon} size={fieldStyle === 'minimal' ? 18 : 24} />
    </button>
  )
}
