import type { ProjectTask } from '@/entities/task/model/types'
import type { Stage } from '@/shared/lib/types'

export interface ProjectCurrentStageProps {
  stage?: Stage
  tasks: ProjectTask[]
}
