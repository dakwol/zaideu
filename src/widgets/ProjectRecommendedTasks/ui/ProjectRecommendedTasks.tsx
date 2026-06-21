'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Clock, Search } from 'lucide-react'
import { formatTaskStatus } from '@/entities/task/lib/formatTaskStatus'
import { getRecommendedTasks } from '@/entities/task/lib/getRecommendedTasks'
import { getRelatedTasks } from '@/entities/task/lib/getRelatedTasks'
import { getTasksByProjectId } from '@/entities/task/lib/taskStore'
import { ProjectTaskStatus, type ProjectTask } from '@/entities/task/model/types'
import { Button } from '@/shared/ui/button'
import type { ProjectRecommendedTasksProps } from '../model/types'
import styles from './ProjectRecommendedTasks.module.scss'
const ProjectRecommendedTasks = ({ projectId }: ProjectRecommendedTasksProps) => {
  const [projectTasks, setProjectTasks] = useState<ProjectTask[]>(() =>
    getTasksByProjectId(projectId)
  )
  useEffect(() => {
    setProjectTasks(getTasksByProjectId(projectId))
  }, [projectId])
  const recommendedTasks = getRecommendedTasks(projectTasks)
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h2>Как можно помочь прямо сейчас</h2>
        <p>Выберите небольшую задачу и начните вклад без долгого онбординга.</p>
      </div>

      <div className={styles.taskGrid}>
        {recommendedTasks.map(projectTask => (
          <RecommendedTaskCard
            key={projectTask.id}
            projectTasks={projectTasks}
            task={projectTask}
          />
        ))}
      </div>
    </section>
  )
}
interface RecommendedTaskCardProps {
  task: ProjectTask
  projectTasks: ProjectTask[]
}
const RecommendedTaskCard = ({ task, projectTasks }: RecommendedTaskCardProps) => {
  const relatedTasks = getRelatedTasks(projectTasks, task)
  return (
    <article className={styles.taskCard}>
      <div className={styles.taskHeader}>
        <span className={styles.statusBadge}>{formatTaskStatus(task.status)}</span>
        <h3>{task.title}</h3>
      </div>
      <div className={styles.taskMeta}>
        <span>{task.role}</span>
        <span>
          <Clock aria-hidden="true" />
          {task.estimateMinutes} минут
        </span>
      </div>
      <p>{task.description}</p>
      <TaskAction task={task} relatedTasks={relatedTasks} />
    </article>
  )
}
const TaskAction = ({ task, relatedTasks }: { task: ProjectTask; relatedTasks: ProjectTask[] }) => {
  if (task.status === ProjectTaskStatus.Available) {
    return (
      <Button size="sm" asChild>
        <Link href={`/project/${task.projectId}/contribute/${task.id}`}>Взять задачу</Link>
      </Button>
    )
  }
  if (task.status === ProjectTaskStatus.InProgress) {
    return (
      <div className={styles.ownershipBlock}>
        <p>{task.assigneeName ?? 'Участник'} уже работает над этой задачей</p>
        {relatedTasks.length > 0 ? (
          <div className={styles.relatedTasks}>
            <span>Можно помочь здесь:</span>
            {relatedTasks.map(relatedTask => (
              <Link
                key={relatedTask.id}
                href={`/project/${relatedTask.projectId}/contribute/${relatedTask.id}`}
              >
                {relatedTask.title}
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.relatedActions}>
            <Button size="sm" variant="outline">
              <Search aria-hidden="true" />
              Посмотреть похожие задачи
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link href={`/project/${task.projectId}`}>Подключиться</Link>
            </Button>
          </div>
        )}
      </div>
    )
  }
  if (task.status === ProjectTaskStatus.InReview) {
    return <p className={styles.stateText}>На проверке</p>
  }
  return <p className={styles.stateText}>Готово</p>
}
export { ProjectRecommendedTasks }
