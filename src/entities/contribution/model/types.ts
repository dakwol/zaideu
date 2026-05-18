import type { ProjectTaskStatus } from '@/entities/task/model/types'

export interface ProjectContribution {
  id: string
  projectId: string
  taskId: string
  userId: string
  status: ProjectTaskStatus
  resultUrl?: string
  comment?: string
  submittedAt?: string
}
