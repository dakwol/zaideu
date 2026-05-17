import type { TextFieldProps } from '../model/types'
import styles from './TextField.module.scss'

function TextField({
  id,
  label,
  value,
  errorMessage,
  onValueChange,
  ...inputProps
}: TextFieldProps) {
  return (
    <label className={styles.field} htmlFor={id}>
      <span className={styles.label}>{label}</span>
      <input
        id={id}
        className={styles.input}
        value={value}
        onChange={onValueChange}
        aria-invalid={Boolean(errorMessage)}
        {...inputProps}
      />
      {errorMessage ? (
        <span className={styles.errorMessage}>{errorMessage}</span>
      ) : null}
    </label>
  )
}

export { TextField }
