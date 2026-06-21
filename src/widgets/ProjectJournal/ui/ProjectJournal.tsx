import type { ProjectJournalProps } from '../model/types'
import styles from './ProjectJournal.module.scss'
const ProjectJournal = ({ entries }: ProjectJournalProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h2>Журнал проекта</h2>
        <p>Короткая история того, что команда уже сделала.</p>
      </div>
      {entries.length > 0 ? (
        <div className={styles.list}>
          {entries.map(journalEntry => (
            <article className={styles.entry} key={journalEntry.id}>
              <div className={styles.entryHeader}>
                <h3>{journalEntry.whatWasDone}</h3>
                <span>
                  by {journalEntry.user.name} · {formatJournalDate(journalEntry.timestamp)}
                </span>
              </div>
              <div className={styles.entryBlock}>
                <strong>Результат:</strong>
                <p>{journalEntry.result}</p>
              </div>
              <div className={styles.entryBlock}>
                <strong>Следующий шаг:</strong>
                <p>{journalEntry.nextStep}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className={styles.emptyText}>
          Пока нет записей. Завершите первую задачу, чтобы зафиксировать движение.
        </p>
      )}
    </section>
  )
}
const formatJournalDate = (date: Date): string => {
  const differenceMs = Date.now() - date.getTime()
  const differenceDays = Math.floor(differenceMs / 86400000)
  if (differenceDays <= 0) {
    return 'сегодня'
  }
  if (differenceDays === 1) {
    return 'вчера'
  }
  return `${differenceDays} дн. назад`
}
export { ProjectJournal }
