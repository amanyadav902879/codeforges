'use client'

import { useAppStore } from '@/components/codeforge/store'
import { Header, MobileNav } from '@/components/codeforge/Header'
import { Landing } from '@/components/codeforge/Landing'
import { Dashboard } from '@/components/codeforge/Dashboard'
import { PathsView, PathDetail } from '@/components/codeforge/PathsView'
import { ExerciseView } from '@/components/codeforge/ExerciseView'
import { Leaderboard } from '@/components/codeforge/Leaderboard'
import { Profile } from '@/components/codeforge/Profile'
import { AITutor } from '@/components/codeforge/AITutor'
import { Loader2 } from 'lucide-react'

export default function Home() {
  const { user, view, loading } = useAppStore()

  const renderView = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      )
    }

    if (!user) return <Landing />

    switch (view) {
      case 'dashboard': return <Dashboard />
      case 'paths': return <PathsView />
      case 'pathDetail': return <PathDetail />
      case 'exercise': return <ExerciseView />
      case 'leaderboard': return <Leaderboard />
      case 'profile': return <Profile />
      default: return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      {user && <Header />}
      {user && <MobileNav />}
      <main className="flex-1 relative z-0">
        {renderView()}
      </main>
      {user && <AITutor />}
      {user && (
        <footer className="border-t border-border py-4 text-center text-xs text-muted-foreground mt-auto">
          CodeForge ULTRA PRO MAX &mdash; Master Full-Stack Development
        </footer>
      )}
    </div>
  )
}