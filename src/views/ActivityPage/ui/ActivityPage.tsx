'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AppHeader } from '@/widgets/AppHeader'
import { ActivityItem } from '@/entities/activity/ui/ActivityItem'
import { mockActivities, mockProjects } from '@/shared/lib/mock-data'
import { Filter } from 'lucide-react'
import { useTranslation } from '@/shared/hooks/use-locale'
type ActivityFilter =
  | 'all'
  | 'task_completed'
  | 'stage_completed'
  | 'user_joined'
  | 'user_update'
  | 'project_update'
const filterOptions: {
  value: ActivityFilter
  labelKey: string
}[] = [
  { value: 'all', labelKey: 'filters.all' },
  { value: 'task_completed', labelKey: 'filters.tasks' },
  { value: 'stage_completed', labelKey: 'filters.stages' },
  { value: 'user_joined', labelKey: 'filters.team' },
  { value: 'user_update', labelKey: 'filters.updates' },
  { value: 'project_update', labelKey: 'filters.updates' },
]
export const ActivityPage = () => {
  const translate = useTranslation()
  const [filter, setFilter] = useState<ActivityFilter>('all')
  const allActivities = useMemo(() => {
    const expanded = [...mockActivities]
    mockProjects.forEach(project => {
      project.stages.forEach(stage => {
        stage.tasks
          .filter(task => task.completed && task.assignedUser)
          .forEach(task => {
            expanded.push({
              id: `gen-${task.id}`,
              type: 'task_completed',
              user: task.assignedUser!,
              description: translate('activity.completedInProject', {
                task: task.title,
                project: project.title,
              }),
              timestamp: new Date(Date.now() - Math.random() * 86400000 * 7),
              projectId: project.id,
            })
          })
      })
    })
    return expanded.sort(
      (activityA, activityB) => activityB.timestamp.getTime() - activityA.timestamp.getTime()
    )
  }, [translate])
  const filteredActivities =
    filter === 'all' ? allActivities : allActivities.filter(activity => activity.type === filter)
  const getProjectTitle = (projectId: string) => {
    return (
      mockProjects.find(project => project.id === projectId)?.title ||
      translate('activity.unknownProject')
    )
  }
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">{translate('activity.title')}</h1>
          <p className="text-muted-foreground">{translate('activity.description')}</p>
        </div>

        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span>{translate('buttons.filter')}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filterOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  filter === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {translate(option.labelKey)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          {filteredActivities.length > 0 ? (
            filteredActivities.map(activity => (
              <div key={activity.id} className="group">
                <Link
                  href={`/project/${activity.projectId}`}
                  className="block hover:bg-secondary/30 -mx-4 px-4 rounded-lg transition-colors"
                >
                  <div className="flex items-start gap-3 py-4">
                    <div className="flex-1">
                      <ActivityItem activity={activity} />
                    </div>
                    <span className="text-xs text-muted-foreground mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {getProjectTitle(activity.projectId)}
                    </span>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{translate('activity.noActivity')}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
