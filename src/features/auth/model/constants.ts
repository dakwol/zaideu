import type { AuthIntentOption } from './types'
import { AuthIntent } from './types'

export const AUTH_INTENT_OPTIONS: AuthIntentOption[] = [
  {
    value: AuthIntent.CreateProject,
    title: 'Создать проект',
    description: 'У меня есть идея, и я хочу собрать команду.',
  },
  {
    value: AuthIntent.FindProject,
    title: 'Найти проект',
    description: 'Я хочу присоединиться и начать с небольшой задачи.',
  },
]

export const CREATE_PROJECT_SUBMIT_LABEL = 'Создать аккаунт и добавить идею'

export const FIND_PROJECT_SUBMIT_LABEL = 'Создать аккаунт и посмотреть проекты'
