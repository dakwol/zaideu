'use client'
import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { classNames } from '@/shared/lib/utils'
import styles from '../Switch.module.scss'
const Switch = ({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) => {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={classNames(styles.switch, className)}
      {...props}
    >
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className={styles.thumb} />
    </SwitchPrimitive.Root>
  )
}
export { Switch }
