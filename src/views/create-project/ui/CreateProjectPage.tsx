'use client'
import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { FOUNDATION_STAGE } from '@/entities/project/model/constants'
import {
  ProjectFirstResult,
  ProjectRole,
  ProjectTaskEstimate,
  ProjectType,
  type CreatedProjectPayload,
} from '@/entities/project/model/types'
import { getStepValidationMessages } from '@/features/create-project/lib/getStepValidationMessages'
import { getSuggestedRoles } from '@/features/create-project/lib/getSuggestedRoles'
import { getSuggestedTasks } from '@/features/create-project/lib/getSuggestedTasks'
import {
  CREATE_PROJECT_FLOW_STEPS,
  CREATE_PROJECT_NEXT_ACTION,
  NEW_TASK_TEMPLATE,
} from '@/features/create-project/model/constants'
import {
  CreateProjectStep,
  type CreateProjectFormValues,
} from '@/features/create-project/model/types'
import { CreateProjectFlowProgress } from '@/features/create-project/ui/CreateProjectFlowProgress'
import { CreateProjectSuccess } from '@/features/create-project/ui/CreateProjectSuccess/CreateProjectSuccess'
import { ProjectGoalSection } from '@/features/create-project/ui/ProjectGoalSection'
import { ProjectIdeaSection } from '@/features/create-project/ui/ProjectIdeaSection'
import { ProjectPreviewSection } from '@/features/create-project/ui/ProjectPreviewSection'
import { ProjectRolesSection } from '@/features/create-project/ui/ProjectRolesSection'
import { ProjectStageSection } from '@/features/create-project/ui/ProjectStageSection'
import { ProjectTasksSection } from '@/features/create-project/ui/ProjectTasksSection'
import { Button } from '@/shared/ui/button'
import { AppHeader } from '@/widgets/AppHeader'
import styles from './CreateProjectPage.module.scss'
const CreateProjectPage = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [formValues, setFormValues] = useState<CreateProjectFormValues>(() => ({
    title: '',
    description: '',
    projectType: ProjectType.WebApp,
    firstResult: ProjectFirstResult.WorkingPrototype,
    selectedRoles: getSuggestedRoles(ProjectType.WebApp),
    tasks: getSuggestedTasks(ProjectType.WebApp),
  }))
  const [tasksEditedManually, setTasksEditedManually] = useState(false)
  const [hasTemplateTaskUpdateAvailable, setHasTemplateTaskUpdateAvailable] = useState(false)
  const [attemptedSteps, setAttemptedSteps] = useState<CreateProjectStep[]>([])
  const [rolePickerIsOpen, setRolePickerIsOpen] = useState(false)
  const [createdProject, setCreatedProject] = useState<CreatedProjectPayload | null>(null)
  const activeStep = CREATE_PROJECT_FLOW_STEPS[activeStepIndex]
  const activeStepId = activeStep.id
  const userHasAttemptedActiveStep = attemptedSteps.includes(activeStepId)
  const validationMessages = userHasAttemptedActiveStep
    ? getStepValidationMessages(activeStepId, formValues)
    : []
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
    [formValues]
  )
  const handleTitleChange = (nextTitle: string) => {
    setFormValues(currentFormValues => ({
      ...currentFormValues,
      title: nextTitle,
    }))
  }
  const handleDescriptionChange = (nextDescription: string) => {
    setFormValues(currentFormValues => ({
      ...currentFormValues,
      description: nextDescription,
    }))
  }
  const handleProjectTypeChange = (nextProjectType: ProjectType) => {
    setFormValues(currentFormValues => ({
      ...currentFormValues,
      projectType: nextProjectType,
      selectedRoles: getSuggestedRoles(nextProjectType),
      tasks: tasksEditedManually ? currentFormValues.tasks : getSuggestedTasks(nextProjectType),
    }))
    if (tasksEditedManually) {
      setHasTemplateTaskUpdateAvailable(true)
    }
  }
  const handleFirstResultChange = (nextFirstResult: ProjectFirstResult) => {
    setFormValues(currentFormValues => ({
      ...currentFormValues,
      firstResult: nextFirstResult,
    }))
  }
  const handleRoleToggle = (projectRole: ProjectRole) => {
    setFormValues(currentFormValues => {
      const roleIsSelected = currentFormValues.selectedRoles.includes(projectRole)
      const nextSelectedRoles = roleIsSelected
        ? currentFormValues.selectedRoles.filter(selectedRole => selectedRole !== projectRole)
        : [...currentFormValues.selectedRoles, projectRole]
      return {
        ...currentFormValues,
        selectedRoles: nextSelectedRoles,
      }
    })
  }
  const handleTaskTitleChange = (taskId: string, nextTitle: string) => {
    markTasksAsEdited()
    setFormValues(currentFormValues => ({
      ...currentFormValues,
      tasks: currentFormValues.tasks.map(projectTask =>
        projectTask.id === taskId ? { ...projectTask, title: nextTitle } : projectTask
      ),
    }))
  }
  const handleTaskEstimateChange = (taskId: string, nextEstimateMinutes: ProjectTaskEstimate) => {
    markTasksAsEdited()
    setFormValues(currentFormValues => ({
      ...currentFormValues,
      tasks: currentFormValues.tasks.map(projectTask =>
        projectTask.id === taskId
          ? { ...projectTask, estimateMinutes: nextEstimateMinutes }
          : projectTask
      ),
    }))
  }
  const handleTaskDelete = (taskId: string) => {
    markTasksAsEdited()
    setFormValues(currentFormValues => ({
      ...currentFormValues,
      tasks: currentFormValues.tasks.filter(projectTask => projectTask.id !== taskId),
    }))
  }
  const handleTaskAdd = () => {
    markTasksAsEdited()
    setFormValues(currentFormValues => ({
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
  const handleTasksRegenerate = () => {
    setFormValues(currentFormValues => ({
      ...currentFormValues,
      tasks: getSuggestedTasks(currentFormValues.projectType),
    }))
    setTasksEditedManually(false)
    setHasTemplateTaskUpdateAvailable(false)
  }
  const handleBackClick = () => {
    setActiveStepIndex(currentStepIndex => Math.max(currentStepIndex - 1, 0))
  }
  const handleNextClick = () => {
    const nextValidationMessages = getStepValidationMessages(activeStepId, formValues)
    if (nextValidationMessages.length > 0) {
      markActiveStepAsAttempted()
      return
    }
    setActiveStepIndex(currentStepIndex =>
      Math.min(currentStepIndex + 1, CREATE_PROJECT_FLOW_STEPS.length - 1)
    )
  }
  const handleProjectCreate = () => {
    const nextValidationMessages = getStepValidationMessages(
      CreateProjectStep.FinalReview,
      formValues
    )
    if (nextValidationMessages.length > 0) {
      markActiveStepAsAttempted()
      return
    }
    //TODO: send project to backend
    setCreatedProject(projectPreview)
  }
  const markActiveStepAsAttempted = () => {
    setAttemptedSteps(currentAttemptedSteps =>
      currentAttemptedSteps.includes(activeStepId)
        ? currentAttemptedSteps
        : [...currentAttemptedSteps, activeStepId]
    )
  }
  const markTasksAsEdited = () => {
    setTasksEditedManually(true)
  }
  const renderActiveStep = () => {
    if (activeStepId === CreateProjectStep.Idea) {
      return (
        <ProjectIdeaSection
          title={formValues.title}
          description={formValues.description}
          projectType={formValues.projectType}
          onTitleChange={handleTitleChange}
          onDescriptionChange={handleDescriptionChange}
          onProjectTypeChange={handleProjectTypeChange}
        />
      )
    }
    if (activeStepId === CreateProjectStep.FirstResult) {
      return (
        <ProjectGoalSection
          firstResult={formValues.firstResult}
          onFirstResultChange={handleFirstResultChange}
        />
      )
    }
    if (activeStepId === CreateProjectStep.Team) {
      return (
        <ProjectRolesSection
          rolePickerIsOpen={rolePickerIsOpen}
          selectedRoles={formValues.selectedRoles}
          onRolePickerToggle={() => setRolePickerIsOpen(currentValue => !currentValue)}
          onRoleToggle={handleRoleToggle}
        />
      )
    }
    if (activeStepId === CreateProjectStep.FirstStage) {
      return <ProjectStageSection taskCount={formValues.tasks.length} />
    }
    if (activeStepId === CreateProjectStep.StarterTasks) {
      return (
        <ProjectTasksSection
          tasks={formValues.tasks}
          hasTemplateTaskUpdateAvailable={hasTemplateTaskUpdateAvailable}
          onTaskTitleChange={handleTaskTitleChange}
          onTaskEstimateChange={handleTaskEstimateChange}
          onTaskDelete={handleTaskDelete}
          onTaskAdd={handleTaskAdd}
          onTasksRegenerate={handleTasksRegenerate}
          onTemplateTasksApply={handleTasksRegenerate}
        />
      )
    }
    return <ProjectPreviewSection projectPreview={projectPreview} />
  }
  if (createdProject) {
    return <CreateProjectSuccess createdProject={createdProject} />
  }
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.onboardingShell}>
          <CreateProjectFlowProgress activeStepIndex={activeStepIndex} />
          <div className={styles.flowCard}>
            <div key={activeStepId} className={styles.stepTransition}>
              {renderActiveStep()}
            </div>

            {validationMessages.length > 0 ? (
              <div className={styles.validationBox} role="alert">
                {validationMessages.map(validationMessage => (
                  <p key={validationMessage}>{validationMessage}</p>
                ))}
              </div>
            ) : null}

            <div className={styles.navigation}>
              <Button
                type="button"
                variant="ghost"
                disabled={activeStepIndex === 0}
                onClick={handleBackClick}
              >
                <ArrowLeft aria-hidden="true" />
                Назад
              </Button>
              {activeStepId === CreateProjectStep.FinalReview ? (
                <Button type="button" onClick={handleProjectCreate}>
                  Создать проект
                  <Check aria-hidden="true" />
                </Button>
              ) : (
                <Button type="button" onClick={handleNextClick}>
                  Продолжить
                  <ArrowRight aria-hidden="true" />
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
export { CreateProjectPage }
