import type {
  CreatedProjectPayload,
  ProjectFirstResult,
  ProjectRole,
  ProjectTask,
  ProjectTaskEstimate,
  ProjectType,
} from '@/entities/project/model/types'

export interface CreateProjectFormValues {
  title: string
  description: string
  projectType: ProjectType
  firstResult: ProjectFirstResult
  selectedRoles: ProjectRole[]
  tasks: ProjectTask[]
}

export interface CreateProjectSectionProps {
  formValues: CreateProjectFormValues
}

export interface ProjectIdeaSectionProps {
  title: string
  description: string
  projectType: ProjectType
  onTitleChange: (nextTitle: string) => void
  onDescriptionChange: (nextDescription: string) => void
  onProjectTypeChange: (nextProjectType: ProjectType) => void
}

export interface ProjectGoalSectionProps {
  firstResult: ProjectFirstResult
  onFirstResultChange: (nextFirstResult: ProjectFirstResult) => void
}

export interface ProjectRolesSectionProps {
  selectedRoles: ProjectRole[]
  onRoleToggle: (projectRole: ProjectRole) => void
}

export interface ProjectTasksSectionProps {
  tasks: ProjectTask[]
  hasTemplateTaskUpdateAvailable: boolean
  onTaskTitleChange: (taskId: string, nextTitle: string) => void
  onTaskEstimateChange: (
    taskId: string,
    nextEstimateMinutes: ProjectTaskEstimate,
  ) => void
  onTaskDelete: (taskId: string) => void
  onTaskAdd: () => void
  onTasksRegenerate: () => void
  onTemplateTasksApply: () => void
}

export interface ProjectPreviewSectionProps {
  projectPreview: CreatedProjectPayload
  validationMessages: string[]
  onProjectCreate: () => void
}

export interface CreateProjectSuccessProps {
  createdProject: CreatedProjectPayload
}
