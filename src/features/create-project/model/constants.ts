import { ProjectFirstResult, ProjectTaskEstimate } from '@/entities/project/model/types'
import {
  CreateProjectStep,
  type CreateProjectFlowStep,
  type CreateProjectResultOption,
} from './types'

export const CREATE_PROJECT_NEXT_ACTION = 'Взять первую задачу из этапа Foundation.'

export const CREATE_PROJECT_VALIDATION_MESSAGES = {
  missingTitle: 'Добавьте название проекта.',
  missingDescription: 'Опишите идею коротко.',
  missingRoles: 'Выберите хотя бы одну роль.',
  missingTasks: 'Добавьте хотя бы одну стартовую задачу.',
  missingTaskTitle: 'Заполните названия всех стартовых задач.',
}

export const NEW_TASK_TEMPLATE = {
  title: 'Новая маленькая задача',
  estimateMinutes: ProjectTaskEstimate.SixtyMinutes,
}

export const CREATE_PROJECT_FLOW_STEPS: CreateProjectFlowStep[] = [
  { id: CreateProjectStep.Idea, label: 'Идея' },
  { id: CreateProjectStep.FirstResult, label: 'Результат' },
  { id: CreateProjectStep.Team, label: 'Команда' },
  { id: CreateProjectStep.FirstStage, label: 'Этап' },
  { id: CreateProjectStep.StarterTasks, label: 'Задачи' },
  { id: CreateProjectStep.FinalReview, label: 'Старт' },
]

export const CREATE_PROJECT_RESULT_OPTIONS: CreateProjectResultOption[] = [
  {
    value: ProjectFirstResult.WorkingPrototype,
    title: 'Рабочий прототип',
    description: 'Показать идею в действии и быстро собрать обратную связь.',
  },
  {
    value: ProjectFirstResult.Mvp,
    title: 'MVP',
    description: 'Собрать первую версию продукта с основной пользой.',
  },
  {
    value: ProjectFirstResult.Landing,
    title: 'Лендинг',
    description: 'Проверить интерес аудитории до полноценной разработки.',
  },
  {
    value: ProjectFirstResult.Demo,
    title: 'Демо-версия',
    description: 'Сделать понятную демонстрацию для команды или первых пользователей.',
  },
  {
    value: ProjectFirstResult.OpenSourceTool,
    title: 'Open source tool',
    description: 'Подготовить основу инструмента, к которому смогут подключиться люди.',
  },
  {
    value: ProjectFirstResult.NotSure,
    title: 'Пока не знаю',
    description: 'Начать мягко: система предложит безопасный первый шаг.',
  },
]

export const TASK_IMPORTANCE_DESCRIPTIONS: Record<string, string> = {
  'Создать репозиторий': 'Это поможет команде начать работу вместе.',
  'Подготовить структуру проекта': 'Так участникам будет проще добавлять код без хаоса.',
  'Настроить базовую страницу': 'Первый видимый экран быстро превращает идею в продукт.',
  'Добавить README с запуском проекта':
    'Новые участники смогут подключиться без долгих объяснений.',
  'Подготовить структуру лендинга': 'Это задает порядок для проверки идеи через страницу.',
  'Сверстать первый экран': 'Первый экран сразу показывает ценность идеи аудитории.',
  'Добавить адаптив для мобильных устройств': 'Проверка с телефона станет честной уже на старте.',
  'Добавить базовые SEO-мета-теги': 'Так страницу будет проще показывать и распространять.',
  "Описать базовые endpoint'ы": 'Команда быстрее договорится о границах сервиса.',
  'Настроить структуру сервиса': 'Это снижает риск хаоса в backend-части проекта.',
  'Добавить README с запуском API': 'Участники смогут проверить API без ручных инструкций.',
  'Подготовить структуру приложения': 'Это создает понятную основу для экранов и логики.',
  'Сделать стартовый экран': 'Команда увидит первый пользовательский сценарий в интерфейсе.',
  'Описать первый пользовательский сценарий':
    'Это помогает не потерять пользу AI-инструмента за техникой.',
  'Сделать базовый интерфейс запроса':
    'Пользователь сможет попробовать основное действие продукта.',
  'Подготовить manifest': 'Расширение получит техническую основу для запуска в браузере.',
  'Сделать popup-интерфейс':
    'Команда быстро увидит, как пользователь будет взаимодействовать с продуктом.',
  'Описать первый результат': 'Это фиксирует направление и помогает выбрать ближайшее действие.',
  'Новая маленькая задача': 'Маленькая задача помогает сохранить движение без перегруза.',
}
