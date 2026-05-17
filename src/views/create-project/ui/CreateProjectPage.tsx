'use client'

import { useMemo, useState } from 'react'

import { FOUNDATION_STAGE } from '@/entities/project/model/constants'
import {
  ProjectFirstResult,
  ProjectRole,
  ProjectTaskEstimate,
  ProjectType,
  type CreatedProjectPayload,
  type ProjectTask,
} from '@/entities/project/model/types'
import { CreateProjectSuccess } from '@/features/create-project/ui/CreateProjectSuccess/CreateProjectSuccess'
import { ProjectGoalSection } from '@/features/create-project/ui/ProjectGoalSection/ProjectGoalSection'
import { ProjectIdeaSection } from '@/features/create-project/ui/ProjectIdeaSection/ProjectIdeaSection'
import { ProjectPreviewSection } from '@/features/create-project/ui/ProjectPreviewSection/ProjectPreviewSection'
import { ProjectRolesSection } from '@/features/create-project/ui/ProjectRolesSection/ProjectRolesSection'
import { ProjectStageSection } from '@/features/create-project/ui/ProjectStageSection/ProjectStageSection'
import { ProjectTasksSection } from '@/features/create-project/ui/ProjectTasksSection/ProjectTasksSection'
import { getSuggestedRoles } from '@/features/create-project/lib/getSuggestedRoles'
import { getSuggestedTasks } from '@/features/create-project/lib/getSuggestedTasks'
import {
  CREATE_PROJECT_NEXT_ACTION,
  CREATE_PROJECT_VALIDATION_MESSAGES,
  NEW_TASK_TEMPLATE,
} from '@/features/create-project/model/constants'
import type { CreateProjectFormValues } from '@/features/create-project/model/types'
import styles from './CreateProjectPage.module.scss'

function CreateProjectPage() {
  const [formValues, setFormValues] = useState<CreateProjectFormValues>(() => ({
    title: '',
    description: '',
    projectType: ProjectType.WebApp,
    firstResult: ProjectFirstResult.WorkingPrototype,
    selectedRoles: getSuggestedRoles(ProjectType.WebApp),
    tasks: getSuggestedTasks(ProjectType.WebApp),
  }))
  const [tasksEditedManually, setTasksEditedManually] = useState(false)
  const [hasTemplateTaskUpdateAvailable, setHasTemplateTaskUpdateAvailable] =
    useState(false)
  const [hasCreateAttempt, setHasCreateAttempt] = useState(false)
  const [createdProject, setCreatedProject] =
    useState<CreatedProjectPayload | null>(null)

  const projectPreview = useMemo<CreatedProjectPayload>(
    () => ({
      title: formValues.title,
      description: formValues.description,
      projectType: formValues.projectType,
      firstResult: formValues.firstResult,
      roles: formValues.selectedRoles,
      firstStage: FOUNDATION_STAGE,
      tasks: formValues.tasks,
      nextAction: CREATE_PROJECT_NEXT_ACTION,
    }),
    [formValues],
  )

  const validationMessages = hasCreateAttempt
    ? getValidationMessages(formValues)
    : []

  function handleTitleChange(nextTitle: string) {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      title: nextTitle,
    }))
  }

  function handleDescriptionChange(nextDescription: string) {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      description: nextDescription,
    }))
  }

  function handleProjectTypeChange(nextProjectType: ProjectType) {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      projectType: nextProjectType,
      selectedRoles: getSuggestedRoles(nextProjectType),
      tasks: tasksEditedManually
        ? currentFormValues.tasks
        : getSuggestedTasks(nextProjectType),
    }))

    if (tasksEditedManually) {
      setHasTemplateTaskUpdateAvailable(true)
    }
  }

  function handleFirstResultChange(nextFirstResult: ProjectFirstResult) {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      firstResult: nextFirstResult,
    }))
  }

  function handleRoleToggle(projectRole: ProjectRole) {
    setFormValues((currentFormValues) => {
      const roleIsSelected = currentFormValues.selectedRoles.includes(projectRole)
      const nextSelectedRoles = roleIsSelected
        ? currentFormValues.selectedRoles.filter(
            (selectedRole) => selectedRole !== projectRole,
          )
        : [...currentFormValues.selectedRoles, projectRole]

      return {
        ...currentFormValues,
        selectedRoles: nextSelectedRoles,
      }
    })
  }

  function markTasksAsEdited() {
    setTasksEditedManually(true)
  }

  function handleTaskTitleChange(taskId: string, nextTitle: string) {
    markTasksAsEdited()
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      tasks: currentFormValues.tasks.map((projectTask) =>
        projectTask.id === taskId
          ? { ...projectTask, title: nextTitle }
          : projectTask,
      ),
    }))
  }

  function handleTaskEstimateChange(
    taskId: string,
    nextEstimateMinutes: ProjectTaskEstimate,
  ) {
    markTasksAsEdited()
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      tasks: currentFormValues.tasks.map((projectTask) =>
        projectTask.id === taskId
          ? { ...projectTask, estimateMinutes: nextEstimateMinutes }
          : projectTask,
      ),
    }))
  }

  function handleTaskDelete(taskId: string) {
    markTasksAsEdited()
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      tasks: currentFormValues.tasks.filter(
        (projectTask) => projectTask.id !== taskId,
      ),
    }))
  }

  function handleTaskAdd() {
    markTasksAsEdited()
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      tasks: [
        ...currentFormValues.tasks,
        {
          id: `custom-task-${Date.now()}`,
          title: NEW_TASK_TEMPLATE.title,
          estimateMinutes: NEW_TASK_TEMPLATE.estimateMinutes,
        },
      ],
    }))
  }

  function handleTasksRegenerate() {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      tasks: getSuggestedTasks(currentFormValues.projectType),
    }))
    setTasksEditedManually(false)
    setHasTemplateTaskUpdateAvailable(false)
  }

  function handleTemplateTasksApply() {
    handleTasksRegenerate()
  }

  function handleProjectCreate() {
    setHasCreateAttempt(true)

    const nextValidationMessages = getValidationMessages(formValues)

    if (nextValidationMessages.length > 0) {
      return
    }

    console.log('create project submit', projectPreview)
    setCreatedProject(projectPreview)
  }

  if (createdProject) {
    return <CreateProjectSuccess createdProject={createdProject} />
  }

  return (
    <main className={styles.screen}>
      <div className={styles.pageShell}>
        <header className={styles.pageHeader}>
          <div className={styles.wordmark} aria-label="За Идею">
            <span>за</span>
            <span>идею_</span>
          </div>
          <div className={styles.pageHeaderCopy}>
            <p className={styles.eyebrow}>новый проект</p>
            <h1 className={styles.title}>Создать проект</h1>
            <p className={styles.subtitle}>
              Опишите идею — мы поможем превратить её в первый понятный шаг.
            </p>
          </div>
        </header>

        <div className={styles.sections}>
          <ProjectIdeaSection
            title={formValues.title}
            description={formValues.description}
            projectType={formValues.projectType}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
            onProjectTypeChange={handleProjectTypeChange}
          />
          <ProjectGoalSection
            firstResult={formValues.firstResult}
            onFirstResultChange={handleFirstResultChange}
          />
          <ProjectRolesSection
            selectedRoles={formValues.selectedRoles}
            onRoleToggle={handleRoleToggle}
          />
          <ProjectStageSection />
          <ProjectTasksSection
            tasks={formValues.tasks}
            hasTemplateTaskUpdateAvailable={hasTemplateTaskUpdateAvailable}
            onTaskTitleChange={handleTaskTitleChange}
            onTaskEstimateChange={handleTaskEstimateChange}
            onTaskDelete={handleTaskDelete}
            onTaskAdd={handleTaskAdd}
            onTasksRegenerate={handleTasksRegenerate}
            onTemplateTasksApply={handleTemplateTasksApply}
          />
          <ProjectPreviewSection
            projectPreview={projectPreview}
            validationMessages={validationMessages}
            onProjectCreate={handleProjectCreate}
          />
        </div>
      </div>
    </main>
  )
}

function getValidationMessages(
  formValues: CreateProjectFormValues,
): string[] {
  const validationMessages: string[] = []

  if (!formValues.title.trim()) {
    validationMessages.push(CREATE_PROJECT_VALIDATION_MESSAGES.missingTitle)
  }

  if (!formValues.description.trim()) {
    validationMessages.push(
      CREATE_PROJECT_VALIDATION_MESSAGES.missingDescription,
    )
  }

  if (formValues.selectedRoles.length === 0) {
    validationMessages.push(CREATE_PROJECT_VALIDATION_MESSAGES.missingRoles)
  }

  if (formValues.tasks.length === 0) {
    validationMessages.push(CREATE_PROJECT_VALIDATION_MESSAGES.missingTasks)
  }

  const hasEmptyTaskTitle = formValues.tasks.some(
    (projectTask) => !projectTask.title.trim(),
  )

  if (hasEmptyTaskTitle) {
    validationMessages.push(CREATE_PROJECT_VALIDATION_MESSAGES.missingTaskTitle)
  }

  return validationMessages
}

export { CreateProjectPage }
