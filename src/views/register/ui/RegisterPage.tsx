'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'

import { AuthIntentSelector } from '@/features/auth/ui/AuthIntentSelector'
import {
  CREATE_PROJECT_SUBMIT_LABEL,
  FIND_PROJECT_SUBMIT_LABEL,
} from '@/features/auth/model/constants'
import { AuthIntent, type RegisterFormValues } from '@/features/auth/model/types'
import { Button } from '@/shared/ui/button'
import { AuthCard } from '@/shared/ui/AuthCard'
import { TextField } from '@/shared/ui/TextField'
import styles from './RegisterPage.module.scss'

interface RegisterPageProps {
  onLoginClick: () => void
}

function RegisterPage({ onLoginClick }: RegisterPageProps) {
  const [registerFormValues, setRegisterFormValues] =
    useState<RegisterFormValues>({
      name: '',
      email: '',
      password: '',
    })
  const [selectedIntent, setSelectedIntent] = useState<AuthIntent>(
    AuthIntent.CreateProject,
  )
  const [formErrorMessage, setFormErrorMessage] = useState('')

  const submitButtonLabel =
    selectedIntent === AuthIntent.CreateProject
      ? CREATE_PROJECT_SUBMIT_LABEL
      : FIND_PROJECT_SUBMIT_LABEL

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setRegisterFormValues((currentFormValues) => ({
      ...currentFormValues,
      name: event.target.value,
    }))
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setRegisterFormValues((currentFormValues) => ({
      ...currentFormValues,
      email: event.target.value,
    }))
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setRegisterFormValues((currentFormValues) => ({
      ...currentFormValues,
      password: event.target.value,
    }))
  }

  function handleRegisterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (
      !registerFormValues.name.trim() ||
      !registerFormValues.email.trim() ||
      !registerFormValues.password.trim()
    ) {
      setFormErrorMessage('Заполните имя, email и пароль.')
      return
    }

    setFormErrorMessage('')
    console.log('register submit', {
      ...registerFormValues,
      intent: selectedIntent,
    })
  }

  return (
    <AuthCard
      title="Начните двигать проект"
      subtitle="Создавайте идеи, находите людей и доводите работу до результата маленькими шагами."
      footer={
        <p className={styles.switchText}>
          Уже есть аккаунт?{' '}
          <button
            className={styles.inlineButton}
            type="button"
            onClick={onLoginClick}
          >
            Войти
          </button>
        </p>
      }
    >
      <form className={styles.form} onSubmit={handleRegisterSubmit} noValidate>
        <div className={styles.fields}>
          <TextField
            id="register-name"
            name="name"
            label="Имя"
            value={registerFormValues.name}
            onValueChange={handleNameChange}
            autoComplete="name"
          />
          <TextField
            id="register-email"
            name="email"
            label="Email"
            type="email"
            value={registerFormValues.email}
            onValueChange={handleEmailChange}
            autoComplete="email"
          />
          <TextField
            id="register-password"
            name="password"
            label="Пароль"
            type="password"
            value={registerFormValues.password}
            onValueChange={handlePasswordChange}
            autoComplete="new-password"
          />
        </div>

        <AuthIntentSelector
          selectedIntent={selectedIntent}
          onIntentChange={setSelectedIntent}
        />

        {formErrorMessage ? (
          <p className={styles.errorMessage} role="alert">
            {formErrorMessage}
          </p>
        ) : null}

        <Button className={styles.submitButton} type="submit">
          {submitButtonLabel}
        </Button>
      </form>
    </AuthCard>
  )
}

export { RegisterPage }
