'use client'

import { useState } from 'react'
import { useAppStore } from './store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Zap, BookOpen, Trophy, Flame, Code, Shield, Brain, ArrowRight, Loader2 } from 'lucide-react'

const features = [
  { icon: Code, title: 'Interactive Code Editor', desc: 'Write real Java code with instant AI-powered feedback and grading' },
  { icon: BookOpen, title: '6 Learning Phases', desc: 'Java Fundamentals to Full-Stack — 28 weeks of curated content' },
  { icon: Zap, title: 'XP & Leveling System', desc: 'Earn XP, unlock levels, and track your growth with gamification' },
  { icon: Flame, title: 'Streak System', desc: 'Build daily habits with streak tracking and bonus multipliers' },
  { icon: Trophy, title: 'Badges & Leaderboard', desc: 'Earn rare badges and compete with other developers' },
  { icon: Brain, title: 'AI Tutor', desc: 'Get stuck? Ask your AI tutor for hints and explanations' },
]

export function Landing() {
  const { setUser, setPaths, setView, setLoading } = useAppStore()
  const [mode, setMode] = useState<'login' | 'signup'>('signup')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const handleAuth = async () => {
    setError('')
    setBusy(true)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: mode, username, email, password })
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); setBusy(false); return }

      setUser(data.user, data.token)
      setLoading(true)
      const pathsRes = await fetch('/api/paths')
      const pathsData = await pathsRes.json()
      setPaths(pathsData.paths)
      setLoading(false)
      setView('dashboard')
    } catch (e) {
      setError('Network error. Try again.')
    }
    setBusy(false)
  }

  const handleDemo = async () => {
    setBusy(true)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email: 'dev@codeforge.dev', password: 'demo' })
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); setBusy(false); return }
      setUser(data.user, data.token)
      const pathsRes = await fetch('/api/paths')
      const pathsData = await pathsRes.json()
      setPaths(pathsData.paths)
      setView('dashboard')
    } catch (e) {
      setError('Network error')
    }
    setBusy(false)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm">
              <Flame className="h-4 w-4 text-orange-500" />
              <span>28-Week Developer Learning Ecosystem</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Master Full-Stack Development
              <span className="block bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                One Exercise at a Time
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              CodeForge ULTRA PRO MAX is a structured, gamified learning platform that takes you from
              Java basics through Spring Boot, React, Docker, and AI integration — with real code exercises,
              an AI tutor, and a competitive leaderboard.
            </p>
          </motion.div>

          {/* Auth Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-12 max-w-md"
          >
            <Card className="border-border/50 shadow-xl shadow-orange-500/5">
              <CardContent className="p-6">
                <div className="mb-4 flex rounded-lg bg-muted p-1">
                  <button
                    onClick={() => { setMode('signup'); setError('') }}
                    className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${mode === 'signup' ? 'bg-background shadow text-foreground' : 'text-muted-foreground'}`}
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => { setMode('login'); setError('') }}
                    className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${mode === 'login' ? 'bg-background shadow text-foreground' : 'text-muted-foreground'}`}
                  >
                    Log In
                  </button>
                </div>

                {mode === 'signup' && (
                  <div className="space-y-3">
                    <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                  </div>
                )}
                {mode === 'login' && (
                  <div className="space-y-3">
                    <Input placeholder="Email or Username" value={email} onChange={e => setEmail(e.target.value)} />
                    <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                  </div>
                )}

                {error && <p className="text-sm text-destructive mt-2">{error}</p>}

                <Button className="w-full mt-4" onClick={handleAuth} disabled={busy || (mode === 'signup' ? !username || !email || !password : !email || !password)}>
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <>{mode === 'signup' ? 'Create Account' : 'Log In'} <ArrowRight className="ml-2 h-4 w-4" /></>}
                </Button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">or</span></div>
                </div>

                <Button variant="outline" className="w-full" onClick={handleDemo} disabled={busy}>
                  Try Demo Account (Dev)
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight">Everything You Need to Learn</h2>
          <p className="mt-3 text-muted-foreground">A complete developer learning ecosystem, not just tutorials</p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-border/50 hover:border-orange-500/30 transition-colors">
                <CardContent className="p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Preview */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Technologies You Will Master</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Java 21', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'REST APIs', 'Git', 'Maven', 'Hibernate', 'Next.js'].map(t => (
              <span key={t} className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}