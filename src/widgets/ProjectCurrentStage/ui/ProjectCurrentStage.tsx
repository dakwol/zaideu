import { ProgressBar } from '@/shared/ui/progress-bar'
import { ProjectTaskStatus } from '@/entities/task/model/types'
import type { ProjectCurrentStageProps } from '../model/types'
import styles from './ProjectCurrentStage.module.scss'
const ProjectCurrentStage = ({ stage, tasks }: ProjectCurrentStageProps) => {
  const totalTasksCount = tasks.length
  const completedTasksCount = tasks.filter(task => task.status === ProjectTaskStatus.Done).length
  const activeContributorsCount = new Set(
    tasks
      .filter(task => task.status === ProjectTaskStatus.InProgress)
      .map(task => task.assigneeId)
      .filter(Boolean)
  ).size
  const progressPercent =
    totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h2>Текущий этап</h2>
      </div>
      <article className={styles.card}>
        <div className={styles.stageTitleRow}>
          <div>
            <h3>{stage?.title ?? 'Foundation'}</h3>
            <p>Команда готовит основу проекта и onboarding для новых участников.</p>
          </div>
          <span>7 дней</span>
        </div>
        <ProgressBar value={progressPercent} size="md" />
        <div className={styles.stats}>
          <span>
            {completedTasksCount} из {totalTasksCount} задач завершены
          </span>
          <span>{Math.max(totalTasksCount - completedTasksCount, 0)} задач осталось</span>
          <span>{activeContributorsCount || 2} участника сейчас работают над задачами</span>
        </div>
        <p className={styles.rule}>Этапы короткие, не больше 7 дней.</p>
      </article>
    </section>
  )
}
export { ProjectCurrentStage }
