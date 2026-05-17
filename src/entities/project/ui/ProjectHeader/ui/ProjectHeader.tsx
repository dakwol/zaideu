'use client'

import Link from 'next/link'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { StatusBadge } from '@/shared/ui/status-badge'
import { ProgressBar } from '@/shared/ui/progress-bar'
import { AvatarStack } from '@/shared/ui/avatar-stack'
import type { Project } from '@/shared/lib/types'
import { ArrowLeft, Settings, Share2 } from 'lucide-react'

interface ProjectHeaderProps {
  project: Project
  className?: string
}

export function ProjectHeader({ project, className }: ProjectHeaderProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to projects
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">
              {project.title}
            </h1>
            <StatusBadge status={project.status} />
          </div>

          <p className="text-muted-foreground max-w-2xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Team:</span>
          <AvatarStack users={project.participants} size="md" />
          <span className="text-sm text-muted-foreground">
            {project.participants.length} members
          </span>
        </div>

        <div className="flex-1 sm:max-w-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-muted-foreground">Progress:</span>
            <span className="text-sm font-medium text-foreground">{project.progress}%</span>
          </div>
          <ProgressBar value={project.progress} size="md" />
        </div>
      </div>
    </div>
  )
}

