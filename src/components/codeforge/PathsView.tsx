'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from './store'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, ArrowRight, Clock, Layers } from 'lucide-react'
import { motion } from 'framer-motion'

export function PathsView() {
  const { paths, token, setCurrentPath, setView } = useAppStore()
  const [progress, setProgress] = useState<Record<string, any>>({})

  useEffect(() => {
    if (!token) return
    const fetchProgress = async () => {
      const prog: Record<string, any> = {}
      for (const p of paths) {
        try {
          const res = await fetch(`/api/paths/${p.slug}?userId=${token}`)
          const data = await res.json()
          prog[p.slug] = data.progress || {}
        } catch { prog[p.slug] = {} }
      }
      setProgress(prog)
    }
    fetchProgress()
  }, [paths, token])

  const getPathStats = (p: any) => {
    const totalLessons = p.modules?.reduce((s: number, m: any) => s + (m.lessons?.length || 0), 0) || 0
    const prog = progress[p.slug] || {}
    const completed = Object.values(prog).filter((v: any) => v.status === 'COMPLETED').length
    return { totalLessons, completed, percent: totalLessons > 0 ? Math.round(completed / totalLessons * 100) : 0 }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learning Paths</h1>
        <p className="mt-1 text-muted-foreground">Choose your Java learning path and start coding</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {paths.map((p, i) => {
          const stats = getPathStats(p)
          return (
            <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card
                className="group h-full border-border/50 cursor-pointer hover:border-orange-500/40 transition-all hover:shadow-lg hover:shadow-orange-500/5"
                onClick={() => { setCurrentPath(p); setView('pathDetail') }}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl" style={{ backgroundColor: (p.color || '#f97316') + '15' }}>
                      {p.icon || '📖'}
                    </div>
                    {stats.completed > 0 && (
                      <Badge variant="secondary" className="text-xs">{stats.percent}%</Badge>
                    )}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{p.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Layers className="h-3 w-3" />{p.modules?.length || 0} modules</span>
                      <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{stats.totalLessons} lessons</span>
                    </div>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export function PathDetail() {
  const { currentPath, token, setView, setCurrentLesson, setCurrentExercise } = useAppStore()
  const [pathData, setPathData] = useState<any>(null)
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const [exercisesMap, setExercisesMap] = useState<Record<string, any[]>>({})

  useEffect(() => {
    if (!currentPath) return
    const url = token ? `/api/paths/${currentPath.slug}?userId=${token}` : `/api/paths/${currentPath.slug}`
    fetch(url).then(r => r.json()).then(data => {
      setPathData(data.path)
      if (data.path?.modules?.[0]?.id) setExpandedModule(data.path.modules[0].id)
    })
  }, [currentPath, token])

  const fetchExercises = async (lessonId: string, moduleId: string) => {
    if (exercisesMap[lessonId]) return
    try {
      const res = await fetch(`/api/lessons/${lessonId}/exercises`)
      const data = await res.json()
      setExercisesMap(prev => ({ ...prev, [lessonId]: data.exercises || [] }))
    } catch {}
  }

  if (!pathData) return <div className="flex items-center justify-center py-20"><div className="animate-spin h-8 w-8 border-2 border-orange-500 border-t-transparent rounded-full" /></div>

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{pathData.title}</h1>
        <p className="mt-1 text-muted-foreground">{pathData.description}</p>
      </div>

      <div className="space-y-3">
        {pathData.modules?.map((mod: any, mi: number) => {
          const isExpanded = expandedModule === mod.id
          return (
            <Card key={mod.id} className="border-border/50 overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-muted/50 transition-colors"
                onClick={() => {
                  setExpandedModule(isExpanded ? null : mod.id)
                  if (!isExpanded && mod.lessons?.[0]?.id) {
                    fetchExercises(mod.lessons[0].id, mod.id)
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 text-sm font-bold">M{mi + 1}</div>
                  <div>
                    <h3 className="font-semibold">{mod.title}</h3>
                    <p className="text-xs text-muted-foreground">{mod.lessons?.length || 0} lessons</p>
                  </div>
                </div>
                <span className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}>&darr;</span>
              </button>

              {isExpanded && (
                <div className="border-t border-border p-4 sm:p-5 space-y-2">
                  {mod.lessons?.map((lesson: any, li: number) => {
                    const exercises = exercisesMap[lesson.id] || []
                    return (
                      <div key={lesson.id}>
                        <button
                          className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                          onClick={() => {
                            if (exercises.length > 0) {
                              setCurrentLesson(lesson)
                              setCurrentExercise(exercises[0])
                              setView('exercise')
                            } else {
                              fetchExercises(lesson.id, mod.id)
                            }
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="flex h-6 w-6 items-center justify-center rounded text-xs font-medium bg-muted">{li + 1}</span>
                              <div>
                                <p className="font-medium text-sm group-hover:text-orange-500 transition-colors">{lesson.title}</p>
                                <p className="text-xs text-muted-foreground">{exercises.length > 0 ? `${exercises.length} exercise${exercises.length > 1 ? 's' : ''}` : 'Loading...'}</p>
                              </div>
                            </div>
                            <Badge variant={lesson.difficulty === 'EXPERT' ? 'destructive' : 'outline'} className="text-xs">
                              {lesson.difficulty || 'STANDARD'}
                            </Badge>
                          </div>
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
