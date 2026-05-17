export enum ProjectType {
  WebApp = 'WEB_APP',
  MobileApp = 'MOBILE_APP',
  ApiService = 'API_SERVICE',
  AiTool = 'AI_TOOL',
  BrowserExtension = 'BROWSER_EXTENSION',
  Landing = 'LANDING',
  Other = 'OTHER',
}

export enum ProjectFirstResult {
  WorkingPrototype = 'WORKING_PROTOTYPE',
  Mvp = 'MVP',
  Demo = 'DEMO',
  Landing = 'LANDING',
  OpenSourceTool = 'OPEN_SOURCE_TOOL',
  NotSure = 'NOT_SURE',
}

export enum ProjectRole {
  FrontendDeveloper = 'FRONTEND_DEVELOPER',
  BackendDeveloper = 'BACKEND_DEVELOPER',
  FullstackDeveloper = 'FULLSTACK_DEVELOPER',
  Designer = 'DESIGNER',
  ProductManager = 'PRODUCT_MANAGER',
  QaEngineer = 'QA_ENGINEER',
  DevopsEngineer = 'DEVOPS_ENGINEER',
}

export enum ProjectTaskEstimate {
  ThirtyMinutes = 30,
  SixtyMinutes = 60,
  NinetyMinutes = 90,
  OneHundredTwentyMinutes = 120,
}

export interface ProjectTask {
  id: string
  title: string
  estimateMinutes: ProjectTaskEstimate
}

export interface ProjectStage {
  title: string
  goal: string
  duration: string
}

export interface CreatedProjectPayload {
  title: string
  description: string
  projectType: ProjectType
  firstResult: ProjectFirstResult
  roles: ProjectRole[]
  firstStage: ProjectStage
  tasks: ProjectTask[]
  nextAction: string
}
