export enum UserProjectStatus {
  Observer = 'OBSERVER',
  ContributorPending = 'CONTRIBUTOR_PENDING',
  Contributor = 'CONTRIBUTOR',
}

export enum ProjectTaskStatus {
  Available = 'AVAILABLE',
  InProgress = 'IN_PROGRESS',
  InReview = 'IN_REVIEW',
  Done = 'DONE',
}

export interface ProjectTask {
  id: string
  projectId: string
  title: string
  description: string
  role: string
  estimateMinutes: number
  status: ProjectTaskStatus
  assigneeName?: string
  assigneeId?: string
  startedAt?: string
  dueLabel: string
  repositoryUrl?: string
  figmaUrl?: string
  resultUrl?: string
  resultComment?: string
}

export interface TaskWorkspaceState {
  userProjectStatus: UserProjectStatus
  tasks: ProjectTask[]
}
