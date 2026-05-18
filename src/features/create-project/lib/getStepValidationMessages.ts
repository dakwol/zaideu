import {
  CREATE_PROJECT_VALIDATION_MESSAGES,
} from '../model/constants'
import {
  CreateProjectStep,
  type CreateProjectFormValues,
} from '../model/types'

function getStepValidationMessages(
  step: CreateProjectStep,
  formValues: CreateProjectFormValues,
): string[] {
  if (step === CreateProjectStep.Idea) {
    return getIdeaValidationMessages(formValues)
  }

  if (step === CreateProjectStep.Team) {
    return formValues.selectedRoles.length === 0
      ? [CREATE_PROJECT_VALIDATION_MESSAGES.missingRoles]
      : []
  }

  if (step === CreateProjectStep.StarterTasks) {
    return getStarterTasksValidationMessages(formValues)
  }

  if (step === CreateProjectStep.FinalReview) {
    return [
      ...getIdeaValidationMessages(formValues),
      ...(formValues.selectedRoles.length === 0
        ? [CREATE_PROJECT_VALIDATION_MESSAGES.missingRoles]
        : []),
      ...getStarterTasksValidationMessages(formValues),
    ]
  }

  return []
}

function getIdeaValidationMessages(
  formValues: CreateProjectFormValues,
): string[] {
  const validationMessages: string[] = []

  if (!formValues.title.trim()) {
    validationMessages.push(CREATE_PROJECT_VALIDATION_MESSAGES.missingTitle)
  }

  if (!formValues.description.trim()) {
    validationMessages.push(CREATE_PROJECT_VALIDATION_MESSAGES.missingDescription)
  }

  return validationMessages
}

function getStarterTasksValidationMessages(
  formValues: CreateProjectFormValues,
): string[] {
  const validationMessages: string[] = []

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

export { getStepValidationMessages }
