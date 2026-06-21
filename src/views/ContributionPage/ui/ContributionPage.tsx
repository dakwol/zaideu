'use client'
import { notFound } from 'next/navigation'
import { getTaskById } from '@/entities/task/lib/taskStore'
import { ContributionFlow } from '@/features/take-task/ui/ContributionFlow'
import { AppHeader } from '@/widgets/AppHeader'
import styles from './ContributionPage.module.scss'
interface ContributionPageProps {
  params: {
    id: string
    taskId: string
  }
}
const ContributionPage = ({ params }: ContributionPageProps) => {
  const task = getTaskById(params.taskId)
  if (!task || task.projectId !== params.id) {
    notFound()
  }
  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <ContributionFlow task={task} />
      </main>
    </div>
  )
}
export { ContributionPage }
