'use client'
import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { classNames } from '@/shared/lib/utils'
import styles from '../Label.module.scss'
const Label = ({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) => {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={classNames(styles.label, className)}
      {...props}
    />
  )
}
export { Label }
