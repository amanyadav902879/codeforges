'use client'

import { useState, useRef, useEffect } from 'react'
import { useAppStore } from './store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Play, RotateCcw, Lightbulb, CheckCircle, XCircle, Zap, Trophy, ChevronLeft, ChevronRight, Loader2, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function ExerciseView() {
  const {
    currentLesson, currentExercise, token, user,
    setCurrentExercise, setUser, setLevelUpModal, setNewBadges
  } = useAppStore()

  const [code, setCode] = useState(currentExercise?.starterCode || '')
  const [result, setResult] = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)
  const [attemptNumber, setAttemptNumber] = useState(1)
  const [showHint, setShowHint] = useState(0)
  const [startTime] = useState(Date.now())
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (currentExercise) {
      setCode(currentExercise.starterCode || '')
      setResult(null)
      setAttemptNumber(1)
      setShowHint(0)
    }
  }, [currentExercise])

  const handleSubmit = async () => {
    if (!token || !currentExercise) return
    setSubmitting(true)
    const timeTaken = Math.round((Date.now() - startTime) / 1000)

    try {
      const res = await fetch(`/api/exercises/${currentExercise.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: token, code, timeTaken, attemptNumber })
      })
      const data = await res.json()
      setResult(data)
      setAttemptNumber(prev => prev + 1)

      if (data.passed) {
        // Refresh user data
        const meRes = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'me', userId: token })
        })
        const meData = await meRes.json()
        if (meData.user) {
          setUser(meData.user, token)
          if (data.leveledUp) {
            setLevelUpModal({ show: true, newLevel: data.newLevel })
          }
          if (data.newBadges?.length > 0) {
            setNewBadges(data.newBadges)
          }
        }
      }
    } catch (e) {
      setResult({ passed: false, feedback: ['Network error. Try again.'] })
    }
    setSubmitting(false)
  }

  const handleReset = () => {
    setCode(currentExercise?.starterCode || '')
    setResult(null)
  }

  const hints = JSON.parse(currentExercise?.hints || '[]')

  if (!currentExercise || !currentLesson) {
    return <div className="flex items-center justify-center py-20 text-muted-foreground">No exercise selected</div>
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-10rem)]">
        {/* Left: Lesson + Exercise Info */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <Card className="border-border/50 flex-shrink-0">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">{currentLesson.title}</p>
                  <h2 className="font-bold text-lg leading-tight">{currentExercise.title}</h2>
                </div>
                <Badge variant={currentExercise.difficulty === 'EXPERT' ? 'destructive' : 'outline'}>
                  {currentExercise.difficulty}
                </Badge>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{currentExercise.description}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-yellow-500" />+{currentExercise.xpReward} XP</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{currentExercise.timeLimit ? `${currentExercise.timeLimit}s` : 'No limit'}</span>
                <span>Attempt #{attemptNumber}</span>
              </div>
            </CardContent>
          </Card>

          {/* Hints */}
          <Card className="border-border/50 flex-shrink-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium flex items-center gap-1.5">
                  <Lightbulb className="h-4 w-4 text-yellow-500" /> Hints
                </span>
                {hints.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => setShowHint(prev => Math.min(prev + 1, hints.length))} disabled={showHint >= hints.length}>
                    {showHint > 0 ? 'Next Hint' : 'Show Hint'} ({showHint}/{hints.length})
                  </Button>
                )}
              </div>
              {showHint > 0 && hints.slice(0, showHint).map((h: string, i: number) => (
                <div key={i} className="mb-1.5 p-2.5 rounded-lg bg-yellow-500/5 border border-yellow-500/20 text-sm">
                  <span className="text-yellow-600 font-medium">Hint {i + 1}:</span> {h}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Lesson Content */}
          {currentLesson.content && (
            <Card className="border-border/50 flex-1 overflow-hidden">
              <CardContent className="p-4">
                <ScrollArea className="h-full max-h-[300px] lg:max-h-none">
                  <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap font-mono text-xs leading-relaxed">
                    {currentLesson.content}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: Code Editor + Results */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <Card className="border-border/50 flex-1 flex flex-col overflow-hidden">
            <CardHeader className="pb-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Code Editor</CardTitle>
                <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1 text-xs">
                  <RotateCcw className="h-3 w-3" /> Reset
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="h-full w-full resize-none bg-[#1e1e2e] text-[#cdd6f4] p-4 font-mono text-sm leading-relaxed focus:outline-none border-0"
                spellCheck={false}
                style={{ tabSize: 4 }}
              />
            </CardContent>
          </Card>

          {/* Submit + Results */}
          <Card className="border-border/50 flex-shrink-0">
            <CardContent className="p-4 space-y-4">
              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={submitting || !code.trim()}
              >
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Running Tests...</> : <><Play className="h-4 w-4 mr-2" /> Submit Solution</>}
              </Button>

              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`rounded-lg p-4 ${result.passed ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {result.passed ? <CheckCircle className="h-5 w-5 text-emerald-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
                      <span className="font-bold">{result.passed ? 'Tests Passed!' : 'Tests Failed'}</span>
                      {result.passed && <Badge className="ml-auto bg-yellow-500 text-black">+{result.xpEarned} XP</Badge>}
                    </div>
                    {result.score !== undefined && (
                      <div className="mb-2">
                        <Progress value={result.score} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">Score: {result.score}%</p>
                      </div>
                    )}
                    {result.feedback?.map((f: string, i: number) => (
                      <p key={i} className="text-sm text-muted-foreground">• {f}</p>
                    ))}
                    {result.executionTime && (
                      <p className="text-xs text-muted-foreground mt-2">Execution: {result.executionTime}ms | Memory: {result.memoryUsed}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Level Up Modal */}
      <LevelUpModal />
    </div>
  )
}

function LevelUpModal() {
  const { levelUpModal, newBadges, setLevelUpModal, setNewBadges } = useAppStore()
  if (!levelUpModal?.show) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => { setLevelUpModal(null); setNewBadges([]) }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mx-4 max-w-sm w-full rounded-2xl border border-border bg-card p-8 text-center shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-4xl">
          <Trophy />
        </div>
        <h2 className="text-2xl font-bold">Level Up!</h2>
        <p className="mt-2 text-muted-foreground">You reached <span className="font-bold text-orange-500">Level {levelUpModal.newLevel}</span></p>
        {newBadges.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium">New Badges Earned:</p>
            {newBadges.map((b) => (
              <Badge key={b} variant="secondary" className="text-sm">{b}</Badge>
            ))}
          </div>
        )}
        <Button className="w-full mt-6" onClick={() => { setLevelUpModal(null); setNewBadges([]) }}>Continue</Button>
      </motion.div>
    </motion.div>
  )
}