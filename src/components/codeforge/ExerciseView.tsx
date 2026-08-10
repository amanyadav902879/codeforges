'use client'

import { useState, useRef, useEffect } from 'react'
import { useAppStore } from './store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Play, RotateCcw, Lightbulb, CheckCircle, XCircle, Zap, Trophy, ChevronLeft, ChevronRight, Loader2, Clock, BookOpen, Terminal, Copy, Check } from 'lucide-react'
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
  const [copied, setCopied] = useState(false)
  const [startTime] = useState(Date.now())
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [fontSize, setFontSize] = useState(14)

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

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const target = e.target as HTMLTextAreaElement
      const start = target.selectionStart
      const end = target.selectionEnd
      const newCode = code.substring(0, start) + '    ' + code.substring(end)
      setCode(newCode)
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4
      }, 0)
    }
  }

  const hints = JSON.parse(currentExercise?.hints || '[]')
  const lines = code.split('\n')

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
                <Badge variant={currentExercise.difficulty === 'EXPERT' ? 'destructive' : currentExercise.difficulty === 'STANDARD' ? 'secondary' : 'outline'}>
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

          {/* Lesson Content & Hints in Tabs */}
          <Card className="border-border/50 flex-1 overflow-hidden">
            <CardContent className="p-0 h-full flex flex-col">
              <Tabs defaultValue="lesson" className="flex flex-col h-full">
                <div className="flex border-b border-border px-4 pt-2">
                  <TabsList className="bg-transparent p-0">
                    <TabsTrigger value="lesson" className="gap-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:shadow-none">
                      <BookOpen className="h-3.5 w-3.5" /> Lesson
                    </TabsTrigger>
                    <TabsTrigger value="hints" className="gap-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:shadow-none">
                      <Lightbulb className="h-3.5 w-3.5" /> Hints ({hints.length})
                    </TabsTrigger>
                    <TabsTrigger value="output" className="gap-1.5 rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:shadow-none">
                      <Terminal className="h-3.5 w-3.5" /> Output
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="lesson" className="flex-1 overflow-hidden mt-0">
                  <ScrollArea className="h-full max-h-[400px] lg:max-h-[500px]">
                    <div className="p-4 text-sm text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
                      {currentLesson.content || 'No lesson content available for this exercise. Try your best based on the description and hints!'}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="hints" className="flex-1 overflow-auto mt-0 p-4 space-y-2">
                  {hints.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No hints available for this exercise.</p>
                  ) : showHint === 0 ? (
                    <Button variant="outline" size="sm" onClick={() => setShowHint(1)} className="gap-1.5">
                      <Lightbulb className="h-3.5 w-3.5 text-yellow-500" /> Show First Hint
                    </Button>
                  ) : (
                    <>
                      {hints.slice(0, showHint).map((h: string, i: number) => (
                        <div key={i} className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20 text-sm">
                          <span className="text-yellow-600 font-medium">Hint {i + 1}:</span> {h}
                        </div>
                      ))}
                      {showHint < hints.length && (
                        <Button variant="ghost" size="sm" onClick={() => setShowHint(prev => prev + 1)}>
                          Show Next Hint ({showHint}/{hints.length})
                        </Button>
                      )}
                    </>
                  )}
                </TabsContent>
                <TabsContent value="output" className="flex-1 overflow-auto mt-0 p-4">
                  {result ? (
                    <div className="space-y-3">
                      <div className={`rounded-lg p-4 ${result.passed ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
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
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                      <Terminal className="h-8 w-8 mb-2 opacity-30" />
                      <p className="text-sm">Submit your code to see results here</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right: Code Editor */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <Card className="border-border/50 flex-1 flex flex-col overflow-hidden">
            <CardHeader className="pb-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm font-medium">Code Editor</CardTitle>
                  <span className="text-xs text-muted-foreground">Java</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => setFontSize(prev => Math.max(10, prev - 1))} className="h-7 w-7 p-0 text-xs">
                    A-
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setFontSize(prev => Math.min(22, prev + 1))} className="h-7 w-7 p-0 text-xs">
                    A+
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 w-7 p-0">
                    {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleReset} className="h-7 w-7 p-0 gap-1 text-xs">
                    <RotateCcw className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden relative">
              <div className="flex h-full">
                {/* Line numbers */}
                <div className="flex-shrink-0 bg-[#1e1e2e] border-r border-[#313244] text-[#6c7086] select-none overflow-hidden">
                  <div className="py-4 pr-2 text-right" style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}>
                    {lines.map((_, i) => (
                      <div key={i} className="px-2">{i + 1}</div>
                    ))}
                  </div>
                </div>
                {/* Editor */}
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={handleTabKey}
                  className="h-full w-full resize-none bg-[#1e1e2e] text-[#cdd6f4] p-4 font-mono leading-[1.6] focus:outline-none border-0"
                  style={{ fontSize: `${fontSize}px` }}
                  spellCheck={false}
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            className="w-full h-12 text-base font-semibold"
            onClick={handleSubmit}
            disabled={submitting || !code.trim()}
          >
            {submitting ? (
              <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Running Tests...</>
            ) : (
              <><Play className="h-4 w-4 mr-2" /> Submit Solution</>
            )}
          </Button>
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
