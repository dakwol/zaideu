import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { ProjectTaskStatus } from '@/entities/task/model/types'
import { Button } from '@/shared/ui/button'
import type { WorkspaceSuggestedTasksProps } from '../model/types'
import styles from './WorkspaceSuggestedTasks.module.scss'
const WorkspaceSuggestedTasks = ({ items }: WorkspaceSuggestedTasksProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h2>Что можно сделать дальше</h2>
        <p>Небольшие задачи, которые помогут проектам не останавливаться.</p>
      </div>
      <div className={styles.list}>
        {items.map(({ task, project }) => (
          <article className={styles.card} key={task.id}>
            <div className={styles.cardContent}>
              <span className={styles.projectName}>{project?.title ?? 'Проект'}</span>
              <h3>{task.title}</h3>
              <div className={styles.meta}>
                <span>
                  <Clock aria-hidden="true" />
                  {task.estimateMinutes} минут
                </span>
                <span>{task.role}</span>
                <span>{getTaskHealthText(task.status, task.assigneeName)}</span>
              </div>
            </div>
            <TaskAction
              assigneeName={task.assigneeName}
              projectId={task.projectId}
              status={task.status}
              taskId={task.id}
            />
          </article>
        ))}
      </div>
    </section>
  )
}
interface TaskActionProps {
  assigneeName?: string
  projectId: string
  status: ProjectTaskStatus
  taskId: string
}
const TaskAction = ({ assigneeName, projectId, status, taskId }: TaskActionProps) => {
  if (status === ProjectTaskStatus.Available) {
    return (
      <Button size="sm" asChild>
        <Link href={`/project/${projectId}/contribute/${taskId}`}>
          Взять задачу
          <ArrowRight aria-hidden="true" />
        </Link>
      </Button>
    )
  }
  if (status === ProjectTaskStatus.InProgress) {
    return (
      <div className={styles.busyState}>
        <span>{assigneeName ?? 'Участник'} уже работает</span>
        <Button size="sm" variant="outline" asChild>
          <Link href={`/project/${projectId}`}>Можно помочь здесь</Link>
        </Button>
      </div>
    )
  }
  return (
    <Button size="sm" variant="outline" asChild>
      <Link href={`/project/${projectId}`}>Открыть проект</Link>
    </Button>
  )
}
const getTaskHealthText = (status: ProjectTaskStatus, assigneeName?: string): string => {
  if (status === ProjectTaskStatus.InProgress) {
    return `${assigneeName ?? 'Кто-то'} уже работает`
  }
  if (status === ProjectTaskStatus.InReview) {
    return 'На проверке'
  }
  if (status === ProjectTaskStatus.Done) {
    return 'Готово'
  }
  return 'Можно взять'
}
export { WorkspaceSuggestedTasks }
