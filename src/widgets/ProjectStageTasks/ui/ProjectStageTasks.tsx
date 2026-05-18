import Link from 'next/link'
import { Clock } from 'lucide-react'

import { formatTaskStatus } from '@/entities/task/lib/formatTaskStatus'
import { ProjectTaskStatus, type ProjectTask } from '@/entities/task/model/types'
import { Button } from '@/shared/ui/button'
import type { ProjectStageTasksProps } from '../model/types'
import styles from './ProjectStageTasks.module.scss'

const taskGroups: Array<{ title: string; status: ProjectTaskStatus }> = [
  { title: 'Можно взять', status: ProjectTaskStatus.Available },
  { title: 'Уже в работе', status: ProjectTaskStatus.InProgress },
  { title: 'На проверке', status: ProjectTaskStatus.InReview },
  { title: 'Готово', status: ProjectTaskStatus.Done },
]

function ProjectStageTasks({ tasks }: ProjectStageTasksProps) {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h2>Задачи этапа</h2>
        <p>Только ближайшие задачи текущего этапа, без большого backlog.</p>
      </div>
      <div className={styles.groups}>
        {taskGroups.map((taskGroup) => {
          const groupTasks = tasks.filter((task) => task.status === taskGroup.status)

          if (groupTasks.length === 0) {
            return null
          }

          return (
            <div className={styles.group} key={taskGroup.status}>
              <h3>{taskGroup.title}</h3>
              <div className={styles.list}>
                {groupTasks.map((task) => (
                  <StageTaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function StageTaskCard({ task }: { task: ProjectTask }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardMain}>
        <span className={styles.status}>{formatTaskStatus(task.status)}</span>
        <h4>{task.title}</h4>
        <div className={styles.meta}>
          <span>{task.role}</span>
          <span>
            <Clock aria-hidden="true" />
            {task.estimateMinutes} минут
          </span>
          {task.assigneeName ? <span>{task.assigneeName}</span> : null}
        </div>
        <p>{task.description}</p>
      </div>
      <TaskCardAction task={task} />
    </article>
  )
}

function TaskCardAction({ task }: { task: ProjectTask }) {
  if (task.status === ProjectTaskStatus.Available) {
    return (
      <Button size="sm" asChild>
        <Link href={`/project/${task.projectId}/contribute/${task.id}`}>
          Взять задачу
        </Link>
      </Button>
    )
  }

  if (task.status === ProjectTaskStatus.InProgress) {
    return (
      <div className={styles.actionText}>
        <span>{task.assigneeName ?? 'Участник'} работает над задачей</span>
        <Button size="sm" variant="outline" asChild>
          <Link href={`/project/${task.projectId}`}>Можно помочь рядом</Link>
        </Button>
      </div>
    )
  }

  if (task.status === ProjectTaskStatus.InReview) {
    return <span className={styles.actionTextOnly}>Результат отправлен на проверку</span>
  }

  return <span className={styles.actionTextOnly}>Завершено</span>
}

export { ProjectStageTasks }
