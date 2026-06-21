'use client'
import { currentUserId, currentUserName, mockProjectTasks } from '../model/mockTasks'
import {
  ProjectTaskStatus,
  UserProjectStatus,
  type ProjectTask,
  type TaskWorkspaceState,
} from '../model/types'
const TASKS_STORAGE_KEY = 'zaideu.projectTasks'
const USER_STATUS_STORAGE_KEY = 'zaideu.userProjectStatus'
const getStoredTasks = (): ProjectTask[] => {
  if (typeof window === 'undefined') {
    return mockProjectTasks
  }
  const storedTasks = window.localStorage.getItem(TASKS_STORAGE_KEY)
  if (!storedTasks) {
    return mockProjectTasks
  }
  try {
    return JSON.parse(storedTasks) as ProjectTask[]
  } catch {
    return mockProjectTasks
  }
}
const saveStoredTasks = (tasks: ProjectTask[]) => {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
}
const getUserProjectStatus = (): UserProjectStatus => {
  if (typeof window === 'undefined') {
    return UserProjectStatus.Observer
  }
  const storedStatus = window.localStorage.getItem(USER_STATUS_STORAGE_KEY)
  if (
    storedStatus === UserProjectStatus.Contributor ||
    storedStatus === UserProjectStatus.ContributorPending
  ) {
    return storedStatus
  }
  return UserProjectStatus.Observer
}
const saveUserProjectStatus = (userProjectStatus: UserProjectStatus) => {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(USER_STATUS_STORAGE_KEY, userProjectStatus)
}
const getTaskById = (taskId: string): ProjectTask | undefined => {
  return getStoredTasks().find(projectTask => projectTask.id === taskId)
}
const getTasksByProjectId = (projectId: string): ProjectTask[] => {
  return getStoredTasks().filter(projectTask => projectTask.projectId === projectId)
}
const getWorkspaceState = (): TaskWorkspaceState => {
  return {
    userProjectStatus: getUserProjectStatus(),
    tasks: getStoredTasks(),
  }
}
const updateTask = (nextTask: ProjectTask): ProjectTask => {
  const nextTasks = getStoredTasks().map(projectTask =>
    projectTask.id === nextTask.id ? nextTask : projectTask
  )
  saveStoredTasks(nextTasks)
  return nextTask
}
const takeProjectTask = (task: ProjectTask, dueLabel: string): ProjectTask => {
  const nextTask: ProjectTask = {
    ...task,
    status: ProjectTaskStatus.InProgress,
    assigneeId: currentUserId,
    assigneeName: currentUserName,
    startedAt: new Date().toISOString(),
    dueLabel,
  }
  saveUserProjectStatus(UserProjectStatus.ContributorPending)
  updateTask(nextTask)
  return nextTask
}
const submitProjectTask = (
  task: ProjectTask,
  resultUrl: string,
  resultComment: string
): ProjectTask => {
  const nextTask: ProjectTask = {
    ...task,
    status: ProjectTaskStatus.InReview,
    resultUrl,
    resultComment,
  }
  updateTask(nextTask)
  return nextTask
}
const acceptProjectTask = (task: ProjectTask): ProjectTask => {
  const nextTask: ProjectTask = {
    ...task,
    status: ProjectTaskStatus.Done,
  }
  saveUserProjectStatus(UserProjectStatus.Contributor)
  updateTask(nextTask)
  return nextTask
}
const requestProjectTaskChanges = (task: ProjectTask): ProjectTask => {
  const nextTask: ProjectTask = {
    ...task,
    status: ProjectTaskStatus.InProgress,
  }
  updateTask(nextTask)
  return nextTask
}
export {
  acceptProjectTask,
  currentUserId,
  currentUserName,
  getStoredTasks,
  getTaskById,
  getTasksByProjectId,
  getUserProjectStatus,
  getWorkspaceState,
  requestProjectTaskChanges,
  submitProjectTask,
  takeProjectTask,
}
