'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { AppHeader } from '@/widgets/AppHeader'
import { ProgressBar } from '@/shared/ui/progress-bar'
import { StatusBadge } from '@/shared/ui/status-badge'
import { mockUsers, mockProjects, mockActivities } from '@/shared/lib/mock-data'
import { useTranslation } from '@/shared/hooks/use-locale'
import { CheckCircle2, Folder, Clock, TrendingUp, Calendar, ExternalLink } from 'lucide-react'

const currentUser = mockUsers[0]

export function ProfilePage() {
  const t = useTranslation()

  const userProjects = useMemo(() => {
    return mockProjects.filter(p => 
      p.participants.some(u => u.id === currentUser.id)
    )
  }, [])
  
  const userActivities = useMemo(() => {
    return mockActivities
      .filter(a => a.user.id === currentUser.id)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 5)
  }, [])
  
  const stats = useMemo(() => {
    const allTasks = userProjects.flatMap(p => 
      p.stages.flatMap(s => s.tasks)
    )
    const myCompletedTasks = allTasks.filter(t => 
      t.completed && t.assignedUser?.id === currentUser.id
    )
    const myActiveTasks = allTasks.filter(t => 
      !t.completed && t.assignedUser?.id === currentUser.id
    )
    
    return {
      completedTasks: myCompletedTasks.length + currentUser.completedTasks,
      activeProjects: userProjects.filter(p => p.status === 'active' || p.status === 'revival').length,
      currentTasks: myActiveTasks.length,
      totalProjects: userProjects.length,
    }
  }, [userProjects])
  
  const activityLevelConfig = {
    high: { label: t('profile.activityLevelHigh'), className: 'bg-success/10 text-success', progress: 85 },
    medium: { label: t('profile.activityLevelMedium'), className: 'bg-warning/10 text-warning', progress: 50 },
    low: { label: t('profile.activityLevelLow'), className: 'bg-muted text-muted-foreground', progress: 20 },
  }
  
  const activityConfig = activityLevelConfig[currentUser.activityLevel]
  
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-8 pb-8 border-b border-border">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {currentUser.avatar ? (
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-semibold text-muted-foreground">
                {currentUser.name.charAt(0)}
              </span>
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground mb-1">
              {currentUser.name}
            </h1>
            <p className="text-muted-foreground mb-4">
              {t('profile.memberSince', { date: new Date(Date.now() - 86400000 * 90).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) })}
            </p>
            
            <div className="flex flex-wrap gap-1.5">
              {currentUser.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{t('profile.activityLevel')}</span>
              <span className={`px-2 py-0.5 text-xs font-medium rounded ${activityConfig.className}`}>
                {activityConfig.label}
              </span>
            </div>
            <div className="w-32">
              <ProgressBar value={activityConfig.progress} size="sm" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wide">{t('profile.completed')}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.completedTasks}</p>
            <p className="text-xs text-muted-foreground">{t('profile.tasksLabel')}</p>
          </div>
          
          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wide">{t('profile.active')}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.activeProjects}</p>
            <p className="text-xs text-muted-foreground">{t('profile.projectsLabel')}</p>
          </div>
          
          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wide">{t('profile.current')}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.currentTasks}</p>
            <p className="text-xs text-muted-foreground">{t('profile.tasksLabel')}</p>
          </div>
          
          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Folder className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wide">{t('profile.total')}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.totalProjects}</p>
            <p className="text-xs text-muted-foreground">{t('profile.projectsLabel')}</p>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">{t('profile.projects')}</h2>
          <div className="space-y-3">
            {userProjects.map((project) => (
              <Link
                key={project.id}
                href={`/project/${project.id}`}
                className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-accent/30 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <StatusBadge status={project.status} />
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{project.progress}%</p>
                    <p className="text-xs text-muted-foreground">{t('profile.completed')}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">{t('profile.recentActivity')}</h2>
          <div className="space-y-3">
            {userActivities.length > 0 ? (
              userActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-3 bg-card border border-border rounded-lg"
                >
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{activity.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <p className="text-sm text-foreground">{activity.description}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm py-4">
                {t('profile.noRecentActivity')}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
