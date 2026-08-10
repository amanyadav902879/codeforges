'use client'

import { useAppStore } from './store'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Menu, X, Home, BookOpen, Trophy, User, MessageSquare, LogOut, Flame, Zap
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Header() {
  const {
    user, view, sidebarOpen, aiChatOpen,
    setView, logout, toggleSidebar, toggleAiChat, goBack
  } = useAppStore()

  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
    { id: 'paths' as const, label: 'Learning Paths', icon: BookOpen },
    { id: 'leaderboard' as const, label: 'Leaderboard', icon: Trophy },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          {user && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
          <button
            onClick={() => user ? setView('dashboard') : setView('landing')}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 text-white font-bold text-sm">
              CF
            </div>
            <span className="hidden sm:block font-bold text-lg tracking-tight">
              CodeForge
            </span>
          </button>
          {user && (view === 'pathDetail' || view === 'exercise') && (
            <Button variant="ghost" size="sm" onClick={goBack} className="ml-2">
              &larr; Back
            </Button>
          )}
        </div>

        {user && (
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={view === item.id ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setView(item.id)}
                className="gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {user && (
            <>
              <Button variant="ghost" size="sm" onClick={toggleAiChat} className="gap-1.5">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">AI Tutor</span>
              </Button>
              <div className="hidden sm:flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="font-semibold">{user.streak}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="font-semibold">{user.xp?.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-semibold">
                  Lv.{user.level}
                </Badge>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-600 text-white text-xs font-bold">
                    {user.displayName?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="icon" onClick={logout} className="h-8 w-8">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export function MobileNav() {
  const { view, sidebarOpen, setView, toggleSidebar } = useAppStore()
  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
    { id: 'paths' as const, label: 'Paths', icon: BookOpen },
    { id: 'leaderboard' as const, label: 'Leaderboard', icon: Trophy },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ]

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <motion.div
          key="mobile-nav-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      {sidebarOpen && (
        <motion.nav
          key="mobile-nav-panel"
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          exit={{ x: -280 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 border-r border-border bg-background p-4 lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={view === item.id ? 'secondary' : 'ghost'}
                className="justify-start gap-3"
                onClick={() => { setView(item.id); toggleSidebar() }}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}