'use client'

import { useState, useMemo } from 'react'
import { AppHeader } from '@/shared/ui/app-header'
import { ProjectCard } from '@/entities/project/ui/project-card'
import { ProjectFilters } from '@/features/project-feed/ui/project-filters'
import { mockProjects } from '@/shared/lib/mock-data'
import type { ProjectStatus, HealthStatus } from '@/shared/lib/types'
import { Search, Plus, AlertTriangle, AlertOctagon } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { useTranslation } from '@/shared/hooks/use-locale'

export default function ProjectFeedPage() {
  const t = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'all'>('all')
  const [selectedHealth, setSelectedHealth] = useState<HealthStatus | 'all'>('all')
  const [selectedTech, setSelectedTech] = useState<string[]>([])
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  
  const availableTech = useMemo(() => {
    const techSet = new Set<string>()
    mockProjects.forEach(p => p.techStack.forEach(t => techSet.add(t)))
    return Array.from(techSet).sort()
  }, [])
  
  const availableRoles = useMemo(() => {
    const roleSet = new Set<string>()
    mockProjects.forEach(p => p.roles.forEach(r => roleSet.add(r)))
    return Array.from(roleSet).sort()
  }, [])
  
  const filteredProjects = useMemo(() => {
    return mockProjects.filter(project => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = project.title.toLowerCase().includes(query)
        const matchesDesc = project.description.toLowerCase().includes(query)
        const matchesTech = project.techStack.some(t => t.toLowerCase().includes(query))
        if (!matchesTitle && !matchesDesc && !matchesTech) return false
      }
      
      if (selectedStatus !== 'all' && project.status !== selectedStatus) return false
      if (selectedHealth !== 'all' && project.health !== selectedHealth) return false
      
      if (selectedTech.length > 0) {
        const hasTech = selectedTech.some(t => project.techStack.includes(t))
        if (!hasTech) return false
      }
      
      if (selectedRoles.length > 0) {
        const hasRole = selectedRoles.some(r => project.roles.includes(r))
        if (!hasRole) return false
      }
      
      return true
    })
  }, [searchQuery, selectedStatus, selectedHealth, selectedTech, selectedRoles])
  
  const criticalProjects = useMemo(() => {
    return mockProjects.filter(p => p.status === 'stalled' || p.health === 'at_risk')
  }, [])
  
  const slowingProjects = useMemo(() => {
    return mockProjects.filter(p => 
      (p.status === 'slow' || p.health === 'slowing') && 
      p.status !== 'stalled' && 
      p.health !== 'at_risk'
    )
  }, [])
  
  const hasNoFilters = selectedStatus === 'all' && selectedHealth === 'all' && selectedTech.length === 0 && selectedRoles.length === 0 && !searchQuery
  const showAttentionSection = hasNoFilters && (criticalProjects.length > 0 || slowingProjects.length > 0)
  
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{t('projectFeed.title')}</h1>
            <p className="text-muted-foreground">
              {t('projectFeed.description')}
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            {t('buttons.newProject')}
          </Button>
        </div>
        
        {showAttentionSection && (
          <section className="mb-10 space-y-6">
            {criticalProjects.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <AlertOctagon className="w-4 h-4 text-red-500" />
                  <h2 className="font-semibold text-foreground">{t('projectFeed.criticalTitle')}</h2>
                  <span className="text-xs text-muted-foreground">({criticalProjects.length})</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {criticalProjects.slice(0, 3).map((project) => (
                    <ProjectCard key={project.id} project={project} variant="attention" />
                  ))}
                </div>
              </div>
            )}
            
            {slowingProjects.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <h2 className="font-semibold text-foreground">{t('projectFeed.slowingTitle')}</h2>
                  <span className="text-xs text-muted-foreground">({slowingProjects.length})</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {slowingProjects.slice(0, 3).map((project) => (
                    <ProjectCard key={project.id} project={project} variant="attention" />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
        
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-20">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t('projectFeed.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
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
          
          <div className="flex-1">
            {filteredProjects.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">
                    {t('projectFeed.projectsCount', {
                      count: filteredProjects.length,
                      plural: filteredProjects.length === 1 ? '' : 's',
                    })}
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-sm mx-auto">
                  <p className="text-lg font-medium text-foreground mb-2">
                    {t('projectFeed.noProjectsFound')}
                  </p>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery || selectedStatus !== 'all' || selectedHealth !== 'all' || selectedTech.length > 0 || selectedRoles.length > 0
                      ? t('projectFeed.noFilterResults')
                      : t('projectFeed.emptyProjects')}
                  </p>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    {t('buttons.startProject')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
