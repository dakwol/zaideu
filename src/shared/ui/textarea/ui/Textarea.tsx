import * as React from 'react'

import { cn } from '@/shared/lib/utils'
import styles from '../Textarea.module.scss'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(styles.textarea, className)}
      {...props}
    />
  )
}

export { Textarea }

