import type { ProjectTask } from '@/entities/task/model/types'
import type { Project } from '@/shared/lib/types'

export interface WorkspaceCurrentTaskProps {
  task?: ProjectTask
  project?: Project
}
