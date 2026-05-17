import type { ChangeEventHandler, InputHTMLAttributes } from 'react'

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string
  value: string
  errorMessage?: string
  onValueChange: ChangeEventHandler<HTMLInputElement>
}
