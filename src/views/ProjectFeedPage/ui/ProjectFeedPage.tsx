'use client'
import { useState, useMemo } from 'react'
import { AppHeader } from '@/widgets/AppHeader'
import { ProjectCard } from '@/entities/project/ui/ProjectCard'
import { ProjectFilters } from '@/features/ProjectFilters'
import { mockProjects } from '@/shared/lib/mock-data'
import type { ProjectStatus, HealthStatus } from '@/shared/lib/types'
import {
  Search,
  Plus,
  AlertTriangle,
  AlertOctagon,
  ArrowRight,
  ChevronDown,
  CircleDot,
  Clock3,
  Users,
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { useTranslation } from '@/shared/hooks/use-locale'
import styles from '../ProjectFeedPage.module.scss'

interface ExploreMetric {
  label: string
  value: string
  description: string
}

const formatPercent = (value: number) => {
  return `${Math.round(value)}%`
}

export const ProjectFeedPage = () => {
  const translate = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'all'>('all')
  const [selectedHealth, setSelectedHealth] = useState<HealthStatus | 'all'>('all')
  const [selectedTech, setSelectedTech] = useState<string[]>([])
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const availableTech = useMemo(() => {
    const techSet = new Set<string>()
    mockProjects.forEach(project => project.techStack.forEach(tech => techSet.add(tech)))
    return Array.from(techSet).sort()
  }, [])
  const availableRoles = useMemo(() => {
    const roleSet = new Set<string>()
    mockProjects.forEach(project => project.roles.forEach(role => roleSet.add(role)))
    return Array.from(roleSet).sort()
  }, [])
  const filteredProjects = useMemo(() => {
    return mockProjects.filter(project => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = project.title.toLowerCase().includes(query)
        const matchesDesc = project.description.toLowerCase().includes(query)
        const matchesTech = project.techStack.some(tech => tech.toLowerCase().includes(query))
        if (!matchesTitle && !matchesDesc && !matchesTech) return false
      }
      if (selectedStatus !== 'all' && project.status !== selectedStatus) return false
      if (selectedHealth !== 'all' && project.health !== selectedHealth) return false
      if (selectedTech.length > 0) {
        const hasTech = selectedTech.some(tech => project.techStack.includes(tech))
        if (!hasTech) return false
      }
      if (selectedRoles.length > 0) {
        const hasRole = selectedRoles.some(role => project.roles.includes(role))
        if (!hasRole) return false
      }
      return true
    })
  }, [searchQuery, selectedStatus, selectedHealth, selectedTech, selectedRoles])
  const criticalProjects = useMemo(() => {
    return mockProjects.filter(
      project => project.status === 'stalled' || project.health === 'at_risk'
    )
  }, [])
  const slowingProjects = useMemo(() => {
    return mockProjects.filter(
      project =>
        (project.status === 'slow' || project.health === 'slowing') &&
        project.status !== 'stalled' &&
        project.health !== 'at_risk'
    )
  }, [])
  const activeProjectsCount = useMemo(() => {
    return mockProjects.filter(project => project.status === 'active').length
  }, [])
  const availableMicroTasksCount = useMemo(() => {
    return mockProjects.filter(project => Boolean(project.nextAction)).length
  }, [])
  const rolesNeededCount = useMemo(() => {
    return new Set(mockProjects.flatMap(project => project.rolesNeeded)).size
  }, [])
  const averageProgress = useMemo(() => {
    const totalProgress = mockProjects.reduce((sum, project) => sum + project.progress, 0)
    return totalProgress / mockProjects.length
  }, [])
  const exploreMetrics: ExploreMetric[] = [
    {
      label: translate('projectFeed.metricLiveProjects'),
      value: String(activeProjectsCount),
      description: translate('projectFeed.metricLiveProjectsDescription'),
    },
    {
      label: translate('projectFeed.metricNeedStep'),
      value: String(criticalProjects.length + slowingProjects.length),
      description: translate('projectFeed.metricNeedStepDescription'),
    },
    {
      label: translate('projectFeed.metricMicroTasks'),
      value: String(availableMicroTasksCount),
      description: translate('projectFeed.metricMicroTasksDescription'),
    },
    {
      label: translate('projectFeed.metricRolesNeeded'),
      value: String(rolesNeededCount),
      description: translate('projectFeed.metricRolesNeededDescription'),
    },
  ]
  const filteredAverageProgress = useMemo(() => {
    if (filteredProjects.length === 0) return 0
    const totalProgress = filteredProjects.reduce((sum, project) => sum + project.progress, 0)
    return totalProgress / filteredProjects.length
  }, [filteredProjects])
  const hasNoFilters =
    selectedStatus === 'all' &&
    selectedHealth === 'all' &&
    selectedTech.length === 0 &&
    selectedRoles.length === 0 &&
    !searchQuery
  const showAttentionSection =
    hasNoFilters && (criticalProjects.length > 0 || slowingProjects.length > 0)
  return (
    <div className={styles.page}>
      <AppHeader />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>{translate('projectFeed.heroEyebrow')}</p>
            <h1 className={styles.title}>{translate('projectFeed.heroTitle')}</h1>
            <p className={styles.description}>{translate('projectFeed.heroDescription')}</p>
            <div className={styles.heroActions}>
              <Button size="lg" className={styles.primaryAction}>
                <Plus aria-hidden="true" />
                {translate('buttons.newProject')}
              </Button>
              <a href="#project-catalog" className={styles.secondaryAction}>
                {translate('projectFeed.browseCatalog')}
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className={styles.heroPanel} aria-label={translate('projectFeed.heroSummaryLabel')}>
            <div className={styles.heroPanelHeader}>
              <span className={styles.heroPanelLabel}>
                {translate('projectFeed.catalogHealth')}
              </span>
              <span className={styles.heroPanelValue}>{formatPercent(averageProgress)}</span>
            </div>
            <div className={styles.heroProgressTrack}>
              <span
                className={styles.heroProgressValue}
                style={{ width: `${Math.min(Math.max(averageProgress, 0), 100)}%` }}
              />
            </div>
            <p className={styles.heroPanelText}>{translate('projectFeed.heroPanelText')}</p>
            <div className={styles.heroPanelList}>
              <span>
                <CircleDot aria-hidden="true" />
                {translate('projectFeed.stalledProjectsNeedRecovery', {
                  count: criticalProjects.length,
                })}
              </span>
              <span>
                <Clock3 aria-hidden="true" />
                {translate('projectFeed.projectsHaveNextTask', {
                  count: availableMicroTasksCount,
                })}
              </span>
              <span>
                <Users aria-hidden="true" />
                {translate('projectFeed.rolesCurrentlyRequested', {
                  count: rolesNeededCount,
                })}
              </span>
            </div>
          </div>
        </section>

        <section className={styles.metrics} aria-label={translate('projectFeed.metricsLabel')}>
          {exploreMetrics.map(metric => (
            <article key={metric.label} className={styles.metricCard}>
              <span className={styles.metricValue}>{metric.value}</span>
              <span className={styles.metricLabel}>{metric.label}</span>
              <span className={styles.metricDescription}>{metric.description}</span>
            </article>
          ))}
        </section>

        {showAttentionSection && (
          <section className={styles.attentionSection} aria-labelledby="attention-title">
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>{translate('projectFeed.recoveryEyebrow')}</p>
              <h2 id="attention-title">{translate('projectFeed.recoveryTitle')}</h2>
              <p>{translate('projectFeed.recoveryDescription')}</p>
            </div>

            {criticalProjects.length > 0 && (
              <details className={styles.attentionGroup}>
                <summary className={styles.attentionSummary}>
                  <div className={styles.attentionHeader}>
                    <AlertOctagon aria-hidden="true" />
                    <div>
                      <h3>{translate('projectFeed.criticalTitle')}</h3>
                      <p>{translate('projectFeed.criticalDescription')}</p>
                    </div>
                    <span>{criticalProjects.length}</span>
                    <ChevronDown className={styles.attentionChevron} aria-hidden="true" />
                  </div>
                </summary>

                <div className={styles.attentionList}>
                  {criticalProjects.map(project => (
                    <ProjectCard key={project.id} project={project} variant="attention" />
                  ))}
                </div>
              </details>
            )}

            {slowingProjects.length > 0 && (
              <details className={styles.attentionGroup}>
                <summary className={styles.attentionSummary}>
                  <div className={styles.attentionHeader}>
                    <AlertTriangle aria-hidden="true" />
                    <div>
                      <h3>{translate('projectFeed.slowingTitle')}</h3>
                      <p>{translate('projectFeed.slowingDescription')}</p>
                    </div>
                    <span>{slowingProjects.length}</span>
                    <ChevronDown className={styles.attentionChevron} aria-hidden="true" />
                  </div>
                </summary>

                <div className={styles.attentionList}>
                  {slowingProjects.map(project => (
                    <ProjectCard key={project.id} project={project} variant="attention" />
                  ))}
                </div>
              </details>
            )}
          </section>
        )}

        <section className={styles.catalogSection} id="project-catalog">
          <aside className={styles.sidebar}>
            <div className={styles.sidebarInner}>
              <div className={styles.searchField}>
                <Search aria-hidden="true" />
                <input
                  type="text"
                  placeholder={translate('projectFeed.searchPlaceholder')}
                  value={searchQuery}
                  onChange={event => setSearchQuery(event.target.value)}
                  aria-label={translate('projectFeed.searchAriaLabel')}
                />
              </div>

              <ProjectFilters
                selectedStatus={selectedStatus}
                selectedHealth={selectedHealth}
                selectedTech={selectedTech}
                selectedRoles={selectedRoles}
                availableTech={availableTech}
                availableRoles={availableRoles}
                onStatusChange={setSelectedStatus}
                onHealthChange={setSelectedHealth}
                onTechChange={setSelectedTech}
                onRolesChange={setSelectedRoles}
              />
            </div>
          </aside>

          <div className={styles.catalogContent}>
            {filteredProjects.length > 0 ? (
              <>
                <div className={styles.catalogHeader}>
                  <div>
                    <p className={styles.eyebrow}>{translate('projectFeed.catalogEyebrow')}</p>
                    <h2>{translate('projectFeed.catalogTitle')}</h2>
                  </div>
                  <div className={styles.catalogSummary}>
                    <span>
                      {formatPercent(filteredAverageProgress)}
                      <small>{translate('projectFeed.avgProgress')}</small>
                    </span>
                    <span>
                      {filteredProjects.length}
                      <small>
                        {translate('projectFeed.projectsCount', {
                          count: filteredProjects.length,
                          plural: filteredProjects.length === 1 ? '' : 's',
                        })}
                      </small>
                    </span>
                  </div>
                </div>
                <p className={styles.resultCount}>
                  <span>
                    {translate('projectFeed.projectsCount', {
                      count: filteredProjects.length,
                      plural: filteredProjects.length === 1 ? '' : 's',
                    })}
                  </span>{' '}
                  {translate('projectFeed.matchCurrentFilters')}
                </p>
                <div className={styles.projectGrid}>
                  {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </>
            ) : (
              <div className={styles.emptyState}>
                <p className={styles.emptyTitle}>{translate('projectFeed.noProjectsFound')}</p>
                <p className={styles.emptyDescription}>
                  {searchQuery ||
                  selectedStatus !== 'all' ||
                  selectedHealth !== 'all' ||
                  selectedTech.length > 0 ||
                  selectedRoles.length > 0
                    ? translate('projectFeed.noFilterResults')
                    : translate('projectFeed.emptyProjects')}
                </p>
                <Button>
                  <Plus aria-hidden="true" />
                  {translate('buttons.startProject')}
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
