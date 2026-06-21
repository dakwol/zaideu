import type { StepHeaderProps } from '../model/types'
import styles from './StepHeader.module.scss'
const StepHeader = ({ eyebrow, title, subtitle }: StepHeaderProps) => {
  return (
    <header className={styles.header}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <div className={styles.copy}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </header>
  )
}
export { StepHeader }
