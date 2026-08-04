'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Medal } from 'lucide-react'
import { motion } from 'framer-motion'

export function Leaderboard() {
  const [leaders, setLeaders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/leaderboard').then(r => r.json()).then(data => {
      setLeaders(data.leaderboard || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const getMedalColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30'
    if (rank === 2) return 'text-zinc-400 bg-zinc-400/10 border-zinc-400/30'
    if (rank === 3) return 'text-amber-700 bg-amber-700/10 border-amber-700/30'
    return 'text-muted-foreground bg-muted border-border'
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="mt-1 text-muted-foreground">Top developers on CodeForge</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-8 w-8 border-2 border-orange-500 border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="space-y-3">
          {leaders.map((leader, i) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card className={`border-border/50 ${i === 0 ? 'border-yellow-500/30 shadow-md shadow-yellow-500/5' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border font-bold text-sm ${getMedalColor(i + 1)}`}>
                      {i < 3 ? <Medal className="h-5 w-5" /> : i + 1}
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-600 text-white text-sm font-bold">
                        {leader.displayName?.[0]?.toUpperCase() || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{leader.displayName || leader.username}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Level {leader.level}</span>
                        <span>•</span>
                        <span>{leader.exercisesCompleted} exercises</span>
                        <span>•</span>
                        <span>{leader.streak} day streak</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{leader.xp?.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">XP</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}