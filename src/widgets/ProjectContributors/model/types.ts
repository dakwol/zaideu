import type { ProjectTask } from '@/entities/task/model/types'
import type { User } from '@/shared/lib/types'

export interface ProjectContributorsProps {
  contributors: User[]
  tasks: ProjectTask[]
}
