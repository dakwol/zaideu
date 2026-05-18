'use client'

import { notFound } from 'next/navigation'

import { getTaskById } from '@/entities/task/lib/taskStore'
import { SubmitTaskForm } from '@/features/submit-task/ui/SubmitTaskForm'
import { AppHeader } from '@/widgets/AppHeader'
import styles from './SubmitTaskPage.module.scss'

interface SubmitTaskPageProps {
  params: {
    taskId: string
  }
}

function SubmitTaskPage({ params }: SubmitTaskPageProps) {
  const task = getTaskById(params.taskId)

  if (!task) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className={styles.main}>
        <SubmitTaskForm task={task} />
      </main>
    </div>
  )
}

export { SubmitTaskPage }
