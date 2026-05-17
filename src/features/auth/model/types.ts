export enum AuthIntent {
  CreateProject = 'createProject',
  FindProject = 'findProject',
}

export enum AuthPage {
  Login = 'login',
  Register = 'register',
}

export interface AuthIntentOption {
  value: AuthIntent
  title: string
  description: string
}

export interface LoginFormValues {
  email: string
  password: string
}

export interface RegisterFormValues {
  name: string
  email: string
  password: string
}

export interface AuthIntentSelectorProps {
  selectedIntent: AuthIntent
  onIntentChange: (nextIntent: AuthIntent) => void
}
