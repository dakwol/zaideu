import * as React from 'react'
import { classNames } from '@/shared/lib/utils'
import styles from '../Textarea.module.scss'
const Textarea = ({ className, ...props }: React.ComponentProps<'textarea'>) => {
  return (
    <textarea data-slot="textarea" className={classNames(styles.textarea, className)} {...props} />
  )
}
export { Textarea }
