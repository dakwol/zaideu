import type { AuthCardProps } from '../model/types'
import styles from './AuthCard.module.scss'
const AuthWordmark = () => {
  return (
    <div className={styles.wordmark} aria-label="За Идею">
      <span>за</span>
      <span>идею_</span>
    </div>
  )
}
const AuthCard = ({ title, subtitle, children, footer }: AuthCardProps) => {
  return (
    <section className={styles.card}>
      <AuthWordmark />
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      {children}
      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </section>
  )
}
export { AuthCard }
