import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { StatusBadge } from '@/shared/ui/status-badge'
import { Button } from '@/shared/ui/button'
import type { ProjectsNeedHelpProps } from '../model/types'
import styles from './ProjectsNeedHelp.module.scss'

function ProjectsNeedHelp({ items }: ProjectsNeedHelpProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h2>Проекты, которым нужна помощь</h2>
        <p>Не главный фокус, но здесь можно быстро подхватить движение.</p>
      </div>
      <div className={styles.grid}>
        {items.map(({ project, reason }) => (
          <article className={styles.card} key={project.id}>
            <div className={styles.cardHeader}>
              <h3>{project.title}</h3>
              <StatusBadge status={project.status} size="sm" />
            </div>
            <p>{reason}</p>
            <Button size="sm" variant="outline" asChild>
              <Link href={`/project/${project.id}`}>
                Помочь проекту
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </section>
  )
}

export { ProjectsNeedHelp }
