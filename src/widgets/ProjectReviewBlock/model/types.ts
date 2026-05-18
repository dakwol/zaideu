import type { ProjectTask } from '@/entities/task/model/types'

export interface ProjectReviewBlockProps {
  tasks: ProjectTask[]
  onTaskUpdate: (task: ProjectTask) => void
}
