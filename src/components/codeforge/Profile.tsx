'use client'

import { useEffect } from 'react'
import { useAppStore } from './store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Flame, Zap, Target, Trophy, Star, Calendar } from 'lucide-react'
import { getRarityColor, getRarityBg } from '@/lib/xp'
import { motion } from 'framer-motion'

export function Profile() {
  const { user, token, setUser } = useAppStore()

  useEffect(() => {
    if (!token) return
    fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'me', userId: token })
    }).then(r => r.json()).then(data => {
      if (data.user) setUser(data.user, token)
    })
  }, [token])

  if (!user) return null

  const stats = [
    { label: 'Total XP', value: user.xp?.toLocaleString() || '0', icon: Zap, color: 'text-yellow-500' },
    { label: 'Level', value: user.level || 1, icon: Star, color: 'text-orange-500' },
    { label: 'Streak', value: `${user.streak || 0} days`, icon: Flame, color: 'text-red-500' },
    { label: 'Longest Streak', value: `${user.longestStreak || 0} days`, icon: Trophy, color: 'text-amber-500' },
    { label: 'Exercises Done', value: user.exercisesCompleted || 0, icon: Target, color: 'text-emerald-500' },
    { label: 'Member Since', value: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'N/A', icon: Calendar, color: 'text-sky-500' },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 space-y-6">
      {/* Profile Header */}
      <Card className="border-border/50 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500/10 via-red-500/5 to-transparent p-6 sm:p-8">
          <div className="flex items-center gap-5">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-600 text-white text-2xl font-bold">
                {user.displayName?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold">{user.displayName}</h1>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="outline" className="font-bold">Level {user.level}</Badge>
                {user.streak > 0 && (
                  <span className="flex items-center gap-1 text-sm text-orange-500 font-medium">
                    <Flame className="h-4 w-4" />{user.streak} day streak
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-yellow-500" />Level {user.level} Progress</span>
            <span className="text-muted-foreground">{user.currentXpInLevel || 0}/{user.xpNeededForNext || 100} XP</span>
          </div>
          <Progress value={user.levelProgress || 0} className="h-2.5" />
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card className="border-border/50">
              <CardContent className="p-4 flex items-center gap-3">
                <s.icon className={`h-5 w-5 ${s.color}`} />
                <div>
                  <p className="font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Badges */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="h-5 w-5" /> Badges ({user.badges?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user.badges && user.badges.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {user.badges.map((badge: any, i: number) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className={`rounded-xl border p-3 text-center ${getRarityBg(badge.rarity)}`}
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <p className="text-sm font-medium">{badge.name}</p>
                  <p className={`text-xs ${getRarityColor(badge.rarity)}`}>{badge.rarity}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">Complete exercises to earn badges!</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}