import type { Project } from '@/shared/lib/types'

export interface ProjectsNeedHelpItem {
  project: Project
  reason: string
}

export interface ProjectsNeedHelpProps {
  items: ProjectsNeedHelpItem[]
}
