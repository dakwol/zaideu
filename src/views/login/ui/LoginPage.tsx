'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'

import { Button } from '@/shared/ui/button'
import { AuthCard } from '@/shared/ui/AuthCard'
import { TextField } from '@/shared/ui/TextField'
import type { LoginFormValues } from '@/features/auth/model/types'
import styles from './LoginPage.module.scss'

interface LoginPageProps {
  onLoginSuccess: () => void
  onRegisterClick: () => void
}

function LoginPage({ onLoginSuccess, onRegisterClick }: LoginPageProps) {
  const [loginFormValues, setLoginFormValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  })
  const [formErrorMessage, setFormErrorMessage] = useState('')

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setLoginFormValues((currentFormValues) => ({
      ...currentFormValues,
      email: event.target.value,
    }))
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setLoginFormValues((currentFormValues) => ({
      ...currentFormValues,
      password: event.target.value,
    }))
  }

  function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!loginFormValues.email.trim() || !loginFormValues.password.trim()) {
      setFormErrorMessage('Заполните email и пароль.')
      return
    }

    setFormErrorMessage('')
    console.log('login submit', loginFormValues)
    onLoginSuccess()
  }

  function handleForgotPasswordClick() {
    console.log('forgot password click')
  }

  function handleGithubLoginClick() {
    console.log('github login click')
  }

  function handleTelegramLoginClick() {
    console.log('telegram login click')
  }

  return (
    <AuthCard
      title="Продолжить работу"
      subtitle="Откройте своё рабочее пространство и вернитесь к следующему шагу по проекту."
      footer={
        <p className={styles.switchText}>
          Нет аккаунта?{' '}
          <button
            className={styles.inlineButton}
            type="button"
            onClick={onRegisterClick}
          >
            Создать аккаунт
          </button>
        </p>
      }
    >
      <form className={styles.form} onSubmit={handleLoginSubmit} noValidate>
        <div className={styles.fields}>
          <TextField
            id="login-email"
            name="email"
            label="Email"
            type="email"
            value={loginFormValues.email}
            onValueChange={handleEmailChange}
            autoComplete="email"
          />
          <TextField
            id="login-password"
            name="password"
            label="Пароль"
            type="password"
            value={loginFormValues.password}
            onValueChange={handlePasswordChange}
            autoComplete="current-password"
          />
        </div>

        {formErrorMessage ? (
          <p className={styles.errorMessage} role="alert">
            {formErrorMessage}
          </p>
        ) : null}

        <div className={styles.formActions}>
          <Button className={styles.submitButton} type="submit">
            Войти
          </Button>
          <button
            className={styles.linkButton}
            type="button"
            onClick={handleForgotPasswordClick}
          >
            Забыли пароль?
          </button>
        </div>
      </form>

      <div className={styles.oauthBlock}>
        <div className={styles.divider}>
          <span>или</span>
        </div>
        <div className={styles.oauthActions}>
          <Button
            className={styles.oauthButton}
            type="button"
            variant="outline"
            onClick={handleGithubLoginClick}
          >
            Войти через GitHub
          </Button>
          <Button
            className={styles.oauthButton}
            type="button"
            variant="outline"
            onClick={handleTelegramLoginClick}
          >
            Войти через Telegram
          </Button>
        </div>
      </div>
    </AuthCard>
  )
}

export { LoginPage }
