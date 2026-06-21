'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Check, ExternalLink } from 'lucide-react'
import { takeProjectTask } from '@/entities/task/lib/taskStore'
import type { ProjectTask } from '@/entities/task/model/types'
import { Button } from '@/shared/ui/button'
import styles from './ContributionFlow.module.scss'
enum ContributionFlowStep {
  TaskIntro = 'TASK_INTRO',
  Access = 'ACCESS',
  Commitment = 'COMMITMENT',
  Success = 'SUCCESS',
}
interface ContributionFlowProps {
  task: ProjectTask
}
const commitmentOptions = ['Сегодня', 'Завтра', 'На этой неделе']
const ContributionFlow = ({ task }: ContributionFlowProps) => {
  const [activeStep, setActiveStep] = useState(ContributionFlowStep.TaskIntro)
  const [commitmentLabel, setCommitmentLabel] = useState(commitmentOptions[0])
  const [takenTask, setTakenTask] = useState(task)
  const handleContinueClick = () => {
    if (activeStep === ContributionFlowStep.TaskIntro) {
      setActiveStep(ContributionFlowStep.Access)
      return
    }
    if (activeStep === ContributionFlowStep.Access) {
      setActiveStep(ContributionFlowStep.Commitment)
    }
  }
  const handleTakeTaskClick = () => {
    const nextTask = takeProjectTask(takenTask, commitmentLabel)
    setTakenTask(nextTask)
    setActiveStep(ContributionFlowStep.Success)
  }
  return (
    <section className={styles.flow}>
      <div className={styles.progress}>
        <span>Задача</span>
        <span>Доступ</span>
        <span>Обещание</span>
        <span>Старт</span>
      </div>

      {activeStep === ContributionFlowStep.TaskIntro ? (
        <div className={styles.card}>
          <StepHeading
            title="Вы начинаете работу над задачей"
            subtitle="Эта задача — небольшой первый вклад. После выполнения вы сможете стать участником проекта."
          />
          <TaskSummary task={takenTask} />
          <Button type="button" onClick={handleContinueClick}>
            Продолжить
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      ) : null}

      {activeStep === ContributionFlowStep.Access ? (
        <div className={styles.card}>
          <StepHeading
            title="Где работать"
            subtitle="Откройте ресурсы проекта или отправьте результат ссылкой, скриншотом или коротким описанием."
          />
          <div className={styles.resourceGrid}>
            <ResourceCard
              title="Репозиторий"
              value={takenTask.repositoryUrl ?? 'Репозиторий пока не добавлен'}
              href={takenTask.repositoryUrl}
              actionLabel="Открыть репозиторий"
            />
            <ResourceCard
              title="Дизайн"
              value={takenTask.figmaUrl ?? 'Дизайн пока не добавлен'}
              href={takenTask.figmaUrl}
              actionLabel="Открыть дизайн"
            />
            <article className={styles.resourceCard}>
              <h3>Быстрый старт</h3>
              <pre className={styles.commands}>
                <code>
                  git clone ...{'\n'}npm install{'\n'}npm run dev
                </code>
              </pre>
            </article>
          </div>
          <Button type="button" onClick={handleContinueClick}>
            Продолжить
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      ) : null}

      {activeStep === ContributionFlowStep.Commitment ? (
        <div className={styles.card}>
          <StepHeading
            title="Когда сможете закончить?"
            subtitle="Небольшое обещание помогает проекту двигаться."
          />
          <div className={styles.commitmentOptions}>
            {commitmentOptions.map(option => (
              <button
                className={
                  option === commitmentLabel
                    ? styles.commitmentOptionActive
                    : styles.commitmentOption
                }
                key={option}
                type="button"
                onClick={() => setCommitmentLabel(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <Button type="button" onClick={handleTakeTaskClick}>
            Закрепить задачу
            <Check aria-hidden="true" />
          </Button>
        </div>
      ) : null}

      {activeStep === ContributionFlowStep.Success ? (
        <div className={styles.card}>
          <StepHeading
            title="Задача закреплена за вами"
            subtitle="Теперь она появится в вашей рабочей зоне."
          />
          <div className={styles.actions}>
            <Button asChild>
              <Link href="/workspace">Перейти в рабочую зону</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/project/${takenTask.projectId}`}>Открыть проект</Link>
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
const TaskSummary = ({ task }: { task: ProjectTask }) => {
  return (
    <article className={styles.taskSummary}>
      <h2>{task.title}</h2>
      <div className={styles.meta}>
        <span>{task.role}</span>
        <span>{task.estimateMinutes} минут</span>
      </div>
      <p>{task.description}</p>
    </article>
  )
}
interface ResourceCardProps {
  title: string
  value: string
  href?: string
  actionLabel: string
}
const ResourceCard = ({ title, value, href, actionLabel }: ResourceCardProps) => {
  return (
    <article className={styles.resourceCard}>
      <h3>{title}</h3>
      <p>{value}</p>
      {href ? (
        <Button variant="outline" size="sm" asChild>
          <a href={href} target="_blank" rel="noreferrer">
            {actionLabel}
            <ExternalLink aria-hidden="true" />
          </a>
        </Button>
      ) : null}
    </article>
  )
}
const StepHeading = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className={styles.heading}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}
export { ContributionFlow }
