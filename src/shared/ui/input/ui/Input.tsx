import * as React from 'react'
import { classNames } from '@/shared/lib/utils'
import styles from '../Input.module.scss'
const Input = ({ className, type, ...props }: React.ComponentProps<'input'>) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={classNames(styles.input, className)}
      {...props}
    />
  )
}
export { Input }
