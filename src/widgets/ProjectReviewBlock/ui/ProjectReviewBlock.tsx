import { ProjectTaskStatus } from '@/entities/task/model/types'
import { TaskReviewCard } from '@/features/review-task/ui/TaskReviewCard'
import type { ProjectReviewBlockProps } from '../model/types'
import styles from './ProjectReviewBlock.module.scss'
const ProjectReviewBlock = ({ tasks, onTaskUpdate }: ProjectReviewBlockProps) => {
  const reviewTasks = tasks.filter(task => task.status === ProjectTaskStatus.InReview)
  if (reviewTasks.length === 0) {
    return null
  }
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h2>Работа на проверке</h2>
      </div>
      <div className={styles.list}>
        {reviewTasks.map(task => (
          <TaskReviewCard key={task.id} task={task} onTaskUpdate={onTaskUpdate} />
        ))}
      </div>
    </section>
  )
}
export { ProjectReviewBlock }
