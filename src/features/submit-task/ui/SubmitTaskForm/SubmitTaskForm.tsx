'use client'
import Link from 'next/link'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Check } from 'lucide-react'
import { submitProjectTask } from '@/entities/task/lib/taskStore'
import type { ProjectTask } from '@/entities/task/model/types'
import { Button } from '@/shared/ui/button'
import styles from './SubmitTaskForm.module.scss'
interface SubmitTaskFormProps {
  task: ProjectTask
}
const SubmitTaskForm = ({ task }: SubmitTaskFormProps) => {
  const [resultUrl, setResultUrl] = useState(task.resultUrl ?? '')
  const [comment, setComment] = useState(task.resultComment ?? '')
  const [errorMessage, setErrorMessage] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const handleResultUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setResultUrl(event.target.value)
  }
  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value)
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!resultUrl.trim() && !comment.trim()) {
      setErrorMessage('Добавьте ссылку или коротко опишите, что сделали.')
      return
    }
    setErrorMessage('')
    submitProjectTask(task, resultUrl.trim(), comment.trim())
    setHasSubmitted(true)
  }
  if (hasSubmitted) {
    return (
      <section className={styles.card}>
        <div className={styles.heading}>
          <h1>Результат отправлен</h1>
          <p>Автор проекта или активный участник сможет принять работу или попросить изменения.</p>
        </div>
        <Button asChild>
          <Link href="/workspace">Вернуться в рабочую зону</Link>
        </Button>
      </section>
    )
  }
  return (
    <form className={styles.card} onSubmit={handleSubmit} noValidate>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>{task.title}</p>
        <h1>Отправить результат</h1>
        <span>Добавьте ссылку на PR, commit, макет или коротко опишите, что сделали.</span>
      </div>

      <label className={styles.field}>
        <span>Ссылка на результат</span>
        <input
          value={resultUrl}
          placeholder="https://github.com/example/project/pull/12"
          onChange={handleResultUrlChange}
        />
      </label>

      <label className={styles.field}>
        <span>Комментарий</span>
        <textarea
          value={comment}
          placeholder="Что сделали, где посмотреть результат, что важно проверить?"
          onChange={handleCommentChange}
        />
      </label>

      {errorMessage ? (
        <p className={styles.errorMessage} role="alert">
          {errorMessage}
        </p>
      ) : null}

      <Button type="submit">
        Отправить на проверку
        <Check aria-hidden="true" />
      </Button>
    </form>
  )
}
export { SubmitTaskForm }
