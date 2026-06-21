'use client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { AppHeader } from '@/widgets/AppHeader'
import { StageCard } from '@/entities/project/ui/StageCard'
import { StatusBadge } from '@/shared/ui/status-badge'
import { ProgressBar } from '@/shared/ui/progress-bar'
import { getProjectById } from '@/shared/lib/mock-data'
import { useTranslation } from '@/shared/hooks/use-locale'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
interface StagesPageProps {
  params: {
    id: string
  }
}
export const ProjectStagesPage = ({ params }: StagesPageProps) => {
  const translate = useTranslation()
  const project = getProjectById(params.id)
  if (!project) {
    notFound()
  }
  const handleTakeTask = (_taskId: string) => {
    //TODO: implement task taking logic
  }
  const currentStageIndex = project.stages.findIndex(stage => !stage.completed)
  const completedStages = project.stages.filter(stage => stage.completed).length
  const totalTasks = project.stages.reduce((acc, stage) => acc + stage.tasks.length, 0)
  const completedTasks = project.stages.reduce(
    (acc, stage) => acc + stage.tasks.filter(task => task.completed).length,
    0
  )
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <Link
            href={`/project/${project.id}`}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {translate('projectStages.backToProject')}
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-foreground">
              {project.title} — {translate('projectStages.stageBoard')}
            </h1>
            <StatusBadge status={project.status} />
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>
              {translate('projectStages.stagesCompleted', {
                count: completedStages,
                total: project.stages.length,
              })}
            </span>
            <span>
              {translate('projectStages.tasksCompleted', {
                count: completedTasks,
                total: totalTasks,
              })}
            </span>
          </div>
        </div>

        <div className="mb-8 p-4 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            {project.stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      stage.completed
                        ? 'bg-success text-success-foreground'
                        : index === currentStageIndex
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {stage.completed ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                  </div>
                  <span
                    className={`text-xs mt-1 text-center ${
                      index === currentStageIndex
                        ? 'font-medium text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {stage.title}
                  </span>
                </div>
                {index < project.stages.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 ${stage.completed ? 'bg-success' : 'bg-border'}`}
                  />
                )}
              </div>
            ))}
          </div>
          <ProgressBar value={project.progress} showLabel size="md" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {project.stages.map((stage, index) => (
            <StageCard
              key={stage.id}
              stage={stage}
              isActive={index === currentStageIndex}
              onTakeTask={handleTakeTask}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
