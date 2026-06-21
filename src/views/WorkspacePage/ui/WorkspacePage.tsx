'use client'
import { useEffect, useMemo, useState } from 'react'
import { currentUserId, getWorkspaceState } from '@/entities/task/lib/taskStore'
import { ProjectTaskStatus, type TaskWorkspaceState } from '@/entities/task/model/types'
import { ProjectsNeedHelp } from '@/widgets/ProjectsNeedHelp'
import { WorkspaceSuggestedTasks } from '@/widgets/WorkspaceSuggestedTasks'
import { WorkspaceCurrentTask } from '@/widgets/WorkspaceCurrentTask'
import { TeamActivityFeed } from '@/widgets/TeamActivityFeed'
import { AppHeader } from '@/widgets/AppHeader'
import { mockProjects } from '@/shared/lib/mock-data'
import styles from './WorkspacePage.module.scss'
const teamActivityItems = [
  { id: '1', text: 'Алекс завершил задачу по авторизации' },
  { id: '2', text: 'Мария обновила onboarding' },
  { id: '3', text: 'Иван отправил результат на проверку' },
]
const WorkspacePage = () => {
  const [workspaceState, setWorkspaceState] = useState<TaskWorkspaceState>(() =>
    getWorkspaceState()
  )
  useEffect(() => {
    setWorkspaceState(getWorkspaceState())
  }, [])
  const currentTask = useMemo(
    () =>
      workspaceState.tasks.find(
        projectTask =>
          projectTask.assigneeId === currentUserId &&
          (projectTask.status === ProjectTaskStatus.InProgress ||
            projectTask.status === ProjectTaskStatus.InReview)
      ),
    [workspaceState.tasks]
  )
  const currentProject = currentTask
    ? mockProjects.find(project => project.id === currentTask.projectId)
    : undefined
  const suggestedNextTasks = workspaceState.tasks
    .filter(projectTask =>
      [ProjectTaskStatus.Available, ProjectTaskStatus.InProgress].includes(projectTask.status)
    )
    .slice(0, 3)
    .map(projectTask => ({
      task: projectTask,
      project: mockProjects.find(mockProject => mockProject.id === projectTask.projectId),
    }))
  const projectsNeedHelp = mockProjects
    .filter(project => project.status === 'slow' || project.status === 'stalled')
    .slice(0, 3)
    .map(project => ({
      project,
      reason:
        project.status === 'stalled'
          ? `${project.overdueTasks} задачи зависли`
          : 'Нет активности 5 дней',
    }))
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Что мне делать дальше?</h1>
          <p>
            Рабочая зона показывает ближайшее действие, движение команды и маленькие задачи, к
            которым можно подключиться.
          </p>
        </header>

        <WorkspaceCurrentTask task={currentTask} project={currentProject} />

        <section className={styles.workingGrid}>
          <TeamActivityFeed items={teamActivityItems} />
          <WorkspaceSuggestedTasks items={suggestedNextTasks} />
        </section>

        <ProjectsNeedHelp items={projectsNeedHelp} />
      </main>
    </div>
  )
}
export { WorkspacePage }
