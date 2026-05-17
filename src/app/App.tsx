'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { AuthPage } from '@/features/auth/model/types'
import { LoginPage } from '@/views/login'
import { RegisterPage } from '@/views/register'
import styles from './App.module.scss'

interface AppProps {
  initialPage?: AuthPage
}

function App({ initialPage = AuthPage.Login }: AppProps) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<AuthPage>(initialPage)

  function handleOpenLoginPage() {
    setCurrentPage(AuthPage.Login)
  }

  function handleOpenRegisterPage() {
    setCurrentPage(AuthPage.Register)
  }

  function handleLoginSuccess() {
    router.push('/')
  }

  return (
    <main className={styles.screen}>
      <section className={styles.content}>
        <div className={styles.authColumn}>
          {currentPage === AuthPage.Login ? (
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onRegisterClick={handleOpenRegisterPage}
            />
          ) : (
            <RegisterPage onLoginClick={handleOpenLoginPage} />
          )}
        </div>

        <aside className={styles.workspaceNote} aria-label="О продукте">
          <p className={styles.noteLabel}>рабочее пространство команды</p>
          <h2 className={styles.noteTitle}>
            Один понятный следующий шаг важнее большого плана.
          </h2>
          <p className={styles.noteText}>
            За Идею помогает держать проект в движении: видеть людей, задачи и
            ближайшее действие без лишнего шума.
          </p>
          <div className={styles.noteChecklist}>
            <span>идея</span>
            <span>команда</span>
            <span>маленький шаг</span>
          </div>
        </aside>
      </section>
    </main>
  )
}

export { App }
