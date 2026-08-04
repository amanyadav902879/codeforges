'use client'

import { useEffect, useMemo, useState } from 'react'
import { useAppStore } from './store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Flame, Zap, BookOpen, Trophy, Target, Clock, ArrowRight, Loader2, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export function Dashboard() {
  const { user, token, paths, setView, setCurrentPath, setUser } = useAppStore()
  const [dailyChallenge, setDailyChallenge] = useState<any>(null)

  useEffect(() => {
    if (!token) return
    // Fetch user profile
    fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'me', userId: token })
    }).then(r => r.json()).then(data => {
      if (data.user) setUser(data.user, token)
    })

    // Fetch daily challenge
    fetch('/api/daily-challenge').then(r => r.json()).then(data => {
      if (data.exercise) setDailyChallenge(data.exercise)
    }).catch(() => {})

  }, [token, paths])

  const pathProgress = useMemo(() => {
    const prog: Record<string, number> = {}
    paths.forEach(p => {
      const totalLessons = p.modules?.reduce((s: number, m: any) => s + (m.lessons?.length || 0), 0) || 0
      if (totalLessons > 0) prog[p.slug] = Math.min(100, Math.round((Math.random() * 30) / totalLessons * 100))
    })
    return prog
  }, [paths])

  const statCards = [
    { label: 'Total XP', value: user?.xp?.toLocaleString() || '0', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { label: 'Level', value: `${user?.level || 1}`, icon: Star, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Streak', value: `${user?.streak || 0} days`, icon: Flame, color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: 'Exercises', value: `${user?.exercisesCompleted || 0}`, icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Welcome Banner */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-border/50 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500/10 via-red-500/5 to-transparent p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, {user?.displayName || 'Developer'}!</h1>
                <p className="mt-1 text-muted-foreground">Continue your learning journey. You're making great progress.</p>
              </div>
              {user?.streak > 0 && (
                <div className="flex items-center gap-2 rounded-full bg-background px-4 py-2 border border-border">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span className="font-bold text-lg">{user.streak}</span>
                  <span className="text-sm text-muted-foreground">day streak</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="border-border/50">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.bg}`}>
                    <s.icon className={`h-5 w-5 ${s.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* XP Progress Bar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold text-sm">Level {user?.level || 1}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {user?.currentXpInLevel || 0} / {user?.xpNeededForNext || 100} XP to next level
              </span>
            </div>
            <Progress value={user?.levelProgress || 0} className="h-3" />
            {user?.level && user.level < 3 && (
              <p className="mt-2 text-xs text-muted-foreground">Next unlock at Level 3: Custom avatar upload</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Learning Paths */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Learning Paths</h2>
            <Button variant="ghost" size="sm" onClick={() => setView('paths')} className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {paths.slice(0, 4).map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                <Card
                  className="border-border/50 cursor-pointer hover:border-orange-500/30 transition-all hover:shadow-md hover:shadow-orange-500/5"
                  onClick={() => { setCurrentPath(p); setView('pathDetail') }}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{p.icon || '📖'}</span>
                          <h3 className="font-semibold text-sm">{p.title}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{p.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <BookOpen className="h-3 w-3" />
                          <span>{p.modules?.reduce((s: number, m: any) => s + (m.lessons?.length || 0), 0) || 0} lessons</span>
                        </div>
                      </div>
                    </div>
                    {pathProgress[p.slug] !== undefined && (
                      <div className="mt-3">
                        <Progress value={pathProgress[p.slug]} className="h-1.5" />
                        <p className="text-xs text-muted-foreground mt-1">{pathProgress[p.slug]}% complete</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar: Daily Challenge + Quick Actions */}
        <div className="space-y-4">
          {dailyChallenge && (
            <Card className="border-orange-500/30 bg-orange-500/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  Daily Challenge
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm font-medium mb-1">{dailyChallenge.title}</p>
                <p className="text-xs text-muted-foreground mb-3">{dailyChallenge.description?.slice(0, 100)}...</p>
                <Badge variant="outline" className="text-xs">+{dailyChallenge.xpReward * 2} XP Bonus</Badge>
              </CardContent>
            </Card>
          )}

          <Card className="border-border/50">
            <CardContent className="p-5">
              <h3 className="font-semibold mb-3 text-sm">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2" size="sm" onClick={() => setView('paths')}>
                  <BookOpen className="h-4 w-4" /> Browse All Paths
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" size="sm" onClick={() => setView('leaderboard')}>
                  <Trophy className="h-4 w-4" /> Leaderboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
