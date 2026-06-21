'use client'
import { useState } from 'react'
import { Check, RotateCcw } from 'lucide-react'
import { acceptProjectTask, requestProjectTaskChanges } from '@/entities/task/lib/taskStore'
import type { ProjectTask } from '@/entities/task/model/types'
import { Button } from '@/shared/ui/button'
import styles from './TaskReviewCard.module.scss'
interface TaskReviewCardProps {
  task: ProjectTask
  onTaskUpdate: (task: ProjectTask) => void
}
const TaskReviewCard = ({ task, onTaskUpdate }: TaskReviewCardProps) => {
  const [successMessage, setSuccessMessage] = useState('')
  const handleAcceptClick = () => {
    const nextTask = acceptProjectTask(task)
    setSuccessMessage('Задача завершена. Пользователь стал участником проекта.')
    onTaskUpdate(nextTask)
  }
  const handleRequestChangesClick = () => {
    const nextTask = requestProjectTaskChanges(task)
    setSuccessMessage('Попросили изменения. Задача вернулась в работу.')
    onTaskUpdate(nextTask)
  }
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <p>Работа на проверке</p>
        <h3>{task.title}</h3>
      </div>
      <div className={styles.body}>
        <span>{task.assigneeName ?? 'Участник'} отправил результат</span>
        {task.resultUrl ? (
          <a href={task.resultUrl} target="_blank" rel="noreferrer">
            {task.resultUrl}
          </a>
        ) : null}
        {task.resultComment ? <p>{task.resultComment}</p> : null}
      </div>
      {successMessage ? <p className={styles.successMessage}>{successMessage}</p> : null}
      <div className={styles.actions}>
        <Button type="button" size="sm" onClick={handleAcceptClick}>
          <Check aria-hidden="true" />
          Принять
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={handleRequestChangesClick}>
          <RotateCcw aria-hidden="true" />
          Попросить изменения
        </Button>
      </div>
    </article>
  )
}
export { TaskReviewCard }
