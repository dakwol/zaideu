import styles from './CreateProjectStepHeading.module.scss'

interface CreateProjectStepHeadingProps {
  eyebrow: string
  title: string
  subtitle: string
}

function CreateProjectStepHeading({
  eyebrow,
  title,
  subtitle,
}: CreateProjectStepHeadingProps) {
  return (
    <div className={styles.heading}>
      <p>{eyebrow}</p>
      <h1>{title}</h1>
      <span>{subtitle}</span>
    </div>
  )
}

export { CreateProjectStepHeading }
