'use client'
import * as React from 'react'
import { OTPInput, OTPInputContext } from 'input-otp'
import { MinusIcon } from 'lucide-react'
import { classNames } from '@/shared/lib/utils'
import styles from '../InputOtp.module.scss'
const InputOTP = ({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) => {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={classNames(styles.container, containerClassName)}
      className={classNames(styles.input, className)}
      {...props}
    />
  )
}
const InputOTPGroup = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div data-slot="input-otp-group" className={classNames(styles.group, className)} {...props} />
  )
}
const InputOTPSlot = ({
  index,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  index: number
}) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}
  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={classNames(styles.slot, className)}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className={styles.caretWrap}>
          <div className={styles.caret} />
        </div>
      )}
    </div>
  )
}
const InputOTPSeparator = ({ ...props }: React.ComponentProps<'div'>) => {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  )
}
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
