import type { CheckboxCardProps } from '../model/types'
import styles from './CheckboxCard.module.scss'

function CheckboxCard({
  title,
  description,
  checked,
  children,
  onCheckedChange,
}: CheckboxCardProps) {
  function handleCheckboxChange() {
    onCheckedChange(!checked)
  }

  return (
    <label className={styles.card} data-checked={checked}>
      <input
        className={styles.input}
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span className={styles.mark} aria-hidden="true" />
      <span className={styles.content}>
        <span className={styles.title}>{title}</span>
        {description ? (
          <span className={styles.description}>{description}</span>
        ) : null}
        {children}
      </span>
    </label>
  )
}

export { CheckboxCard }
