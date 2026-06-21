'use client'
import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getTasksByProjectId } from '@/entities/task/lib/taskStore'
import type { ProjectTask } from '@/entities/task/model/types'
import { ProjectContributors } from '@/widgets/ProjectContributors'
import { ProjectCurrentStage } from '@/widgets/ProjectCurrentStage'
import { ProjectHero } from '@/widgets/ProjectHero'
import { ProjectJournal } from '@/widgets/ProjectJournal'
import { ProjectRecommendedTasks } from '@/widgets/ProjectRecommendedTasks'
import { ProjectRecoveryBlock } from '@/widgets/ProjectRecoveryBlock'
import { ProjectReviewBlock } from '@/widgets/ProjectReviewBlock'
import { ProjectStageTasks } from '@/widgets/ProjectStageTasks'
import { TeamActivityFeed } from '@/widgets/TeamActivityFeed'
import { AppHeader } from '@/widgets/AppHeader'
import { getJournalEntriesByProjectId, getProjectById } from '@/shared/lib/mock-data'
import styles from './ProjectDetailPage.module.scss'
interface ProjectPageProps {
  params: {
    id: string
  }
}
const projectActivityItems = [
  { id: '1', text: 'Алекс завершил настройку репозитория' },
  { id: '2', text: 'Мария обновила onboarding' },
  { id: '3', text: 'Иван отправил результат на проверку' },
]
const ProjectDetailPage = ({ params }: ProjectPageProps) => {
  const project = getProjectById(params.id)
  const [projectTasks, setProjectTasks] = useState<ProjectTask[]>(() =>
    getTasksByProjectId(params.id)
  )
  useEffect(() => {
    setProjectTasks(getTasksByProjectId(params.id))
  }, [params.id])
  if (!project) {
    notFound()
  }
  const currentStage = project.stages.find(stage => !stage.completed)
  const journalEntries = getJournalEntriesByProjectId(project.id)
  const handleTaskUpdate = () => {
    setProjectTasks(getTasksByProjectId(params.id))
  }
  return (
    <div className={styles.page}>
      <AppHeader />

      <main className={styles.main}>
        <Link href="/" className={styles.backLink}>
          <ArrowLeft aria-hidden="true" />К проектам
        </Link>

        <ProjectHero project={project} />

        <div className={styles.workingGrid}>
          <div className={styles.leftColumn}>
            <ProjectRecommendedTasks projectId={project.id} />
            <ProjectCurrentStage stage={currentStage} tasks={projectTasks} />
            <ProjectStageTasks tasks={projectTasks} />
          </div>

          <aside className={styles.rightColumn}>
            <article className={styles.aboutCard}>
              <h2>О проекте</h2>
              <p>
                Здесь видно, куда движется проект, кто уже делает вклад и какой маленький следующий
                шаг можно взять без долгого онбординга.
              </p>
            </article>
            <ProjectRecoveryBlock project={project} />
            <ProjectReviewBlock tasks={projectTasks} onTaskUpdate={handleTaskUpdate} />
            <TeamActivityFeed items={projectActivityItems} />
            <ProjectJournal entries={journalEntries} />
            <ProjectContributors contributors={project.participants} tasks={projectTasks} />
          </aside>
        </div>
      </main>
    </div>
  )
}
export { ProjectDetailPage }
