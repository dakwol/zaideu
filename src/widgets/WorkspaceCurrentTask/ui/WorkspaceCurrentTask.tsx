'use client'

import Link from 'next/link'
import { Clock, Send, Users } from 'lucide-react'

import { formatTaskStatus } from '@/entities/task/lib/formatTaskStatus'
import { ProjectTaskStatus } from '@/entities/task/model/types'
import { Button } from '@/shared/ui/button'
import type { WorkspaceCurrentTaskProps } from '../model/types'
import styles from './WorkspaceCurrentTask.module.scss'

function WorkspaceCurrentTask({ task, project }: WorkspaceCurrentTaskProps) {
  if (!task || !project) {
    return (
      <section className={styles.emptyCard}>
        <h2>Текущая задача</h2>
        <p>Сейчас за вами нет задачи. Можно взять небольшой следующий шаг.</p>
        <Button asChild>
          <Link href="/">Найти проект</Link>
        </Button>
      </section>
    )
  }

  return (
    <section className={styles.card}>
      <div className={styles.taskContent}>
        <div className={styles.heading}>
          <p>Текущая задача</p>
          <h2>{task.title}</h2>
          <span>{project.title} · Foundation</span>
        </div>
        <div className={styles.meta}>
          <span>
            <Clock aria-hidden="true" />
            {task.estimateMinutes} минут
          </span>
          <span>{task.dueLabel}</span>
          <span>{formatTaskStatus(task.status)}</span>
        </div>
        <p className={styles.description}>{task.description}</p>
        <div className={styles.actions}>
          {task.status === ProjectTaskStatus.InProgress ? (
            <>
              <Button variant="outline" asChild>
                <Link href={task.repositoryUrl ?? `/project/${task.projectId}`}>
                  Продолжить работу
                </Link>
              </Button>
              <Button asChild>
                <Link href={`/workspace/task/${task.id}/submit`}>
                  <Send aria-hidden="true" />
                  Отправить результат
                </Link>
              </Button>
            </>
          ) : null}
          {task.status === ProjectTaskStatus.InReview ? (
            <Button disabled>Ожидает проверки</Button>
          ) : null}
          {task.status === ProjectTaskStatus.Done ? (
            <Button asChild>
              <Link href={`/project/${task.projectId}`}>Взять следующую задачу</Link>
            </Button>
          ) : null}
        </div>
      </div>

      <aside className={styles.projectState}>
        <div>
          <span className={styles.stateLabel}>Проект активен</span>
          <strong>Последнее обновление 2 часа назад</strong>
        </div>
        <div className={styles.stateRow}>
          <Users aria-hidden="true" />
          <span>2 участника сейчас в работе</span>
        </div>
        <div className={styles.stageProgress}>
          <div className={styles.stageProgressHeader}>
            <span>Foundation</span>
            <strong>2/5 задач</strong>
          </div>
          <div className={styles.progressTrack}>
            <span />
          </div>
        </div>
      </aside>
    </section>
  )
}

export { WorkspaceCurrentTask }
