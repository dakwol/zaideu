import { PROJECT_ROLE_TEMPLATES } from '@/entities/project/model/templates'
import type { ProjectRole, ProjectType } from '@/entities/project/model/types'
const getSuggestedRoles = (projectType: ProjectType): ProjectRole[] => {
  return [...PROJECT_ROLE_TEMPLATES[projectType]]
}
export { getSuggestedRoles }
