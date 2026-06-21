'use client'
import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'
import { classNames } from '@/shared/lib/utils'
import styles from '../Checkbox.module.scss'
const Checkbox = ({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) => {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={classNames(styles.checkbox, className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className={styles.indicator}>
        <CheckIcon className={styles.icon} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
export { Checkbox }
