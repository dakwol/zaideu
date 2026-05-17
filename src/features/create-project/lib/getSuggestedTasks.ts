import { PROJECT_TASK_TEMPLATES } from '@/entities/project/model/templates'
import type { ProjectTask, ProjectType } from '@/entities/project/model/types'

function getSuggestedTasks(projectType: ProjectType): ProjectTask[] {
  return PROJECT_TASK_TEMPLATES[projectType].map((projectTask, taskIndex) => ({
    ...projectTask,
    id: `${projectTask.id}-${Date.now()}-${taskIndex}`,
  }))
}

export { getSuggestedTasks }
