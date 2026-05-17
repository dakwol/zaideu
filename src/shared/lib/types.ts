export type ProjectStatus = 'active' | 'slow' | 'stalled' | 'revival' | 'completed' | 'archived'

export interface User {
  id: string
  name: string
  avatar?: string
  skills: string[]
  completedTasks: number
  activityLevel: 'high' | 'medium' | 'low'
}

export interface Task {
  id: string
  title: string
  estimateMinutes: number
  assignedUser?: User
  commitment?: string // e.g., "I will finish this by Apr 18"
  deadline: Date
  completed: boolean
  stageId: string
}

export interface JournalEntry {
  id: string
  whatWasDone: string
  user: User
  result: string
  nextStep: string
  timestamp: Date
  projectId: string
}

export interface Stage {
  id: string
  title: string
  goal: string
  tasks: Task[]
  deadline: Date
  completed: boolean
  order: number
}

export type HealthStatus = 'healthy' | 'slowing' | 'at_risk'

export interface NextAction {
  title: string
  estimateMinutes: number
  taskId?: string
}

export interface Project {
  id: string
  title: string
  description: string
  status: ProjectStatus
  health: HealthStatus
  participants: User[]
  stages: Stage[]
  progress: number
  techStack: string[]
  roles: string[]
  rolesNeeded: string[]
  overdueTasks: number
  currentStage: number
  totalStages: number
  completedTasks: number
  totalTasks: number
  nextAction?: NextAction
  createdAt: Date
  updatedAt: Date
}

export interface ActivityItem {
  id: string
  type: 'task_completed' | 'stage_completed' | 'user_joined' | 'user_update' | 'project_update'
  user: User
  description: string
  timestamp: Date
  projectId: string
  metadata?: Record<string, unknown>
}
