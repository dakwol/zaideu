import type { ProjectTask } from '@/entities/task/model/types'
import type { Project } from '@/shared/lib/types'

export interface WorkspaceSuggestedTaskItem {
  task: ProjectTask
  project?: Project
}

export interface WorkspaceSuggestedTasksProps {
  items: WorkspaceSuggestedTaskItem[]
}
