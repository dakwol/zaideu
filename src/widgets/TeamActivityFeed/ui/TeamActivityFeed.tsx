import type { TeamActivityFeedProps } from '../model/types'
import styles from './TeamActivityFeed.module.scss'
const TeamActivityFeed = ({ items }: TeamActivityFeedProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h2>Проект живёт</h2>
        <p>Короткие сигналы движения команды.</p>
      </div>
      <div className={styles.list}>
        {items.map(activityItem => (
          <article className={styles.item} key={activityItem.id}>
            <span />
            <p>{activityItem.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
export { TeamActivityFeed }
