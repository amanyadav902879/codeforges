'use client'

import { useState, useRef, useEffect } from 'react'
import { useAppStore } from './store'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { X, Send, Loader2, Bot, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function AITutor() {
  const { aiChatOpen, toggleAiChat, currentLesson, currentExercise } = useAppStore()
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m your AI Tutor. Ask me anything about the current lesson, Java concepts, or debugging help. What are you working on?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)

    const context = `You are an expert Java tutor on CodeForge. Current lesson: ${currentLesson?.title || 'None'}. Current exercise: ${currentExercise?.title || 'None'}. Exercise description: ${currentExercise?.description || 'None'}. Keep answers concise and helpful. Use code examples when relevant.`

    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: context },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMsg }
          ]
        })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message || data.content || 'Sorry, I could not process that.' }])
    } catch {
      // Fallback: provide a helpful response based on context
      const fallbackResponses: Record<string, string> = {
        'default': `Based on the current exercise "${currentExercise?.title || ''}", here's a tip: Start by understanding what the method signature requires, then implement the logic step by step. Look at the hints if you're stuck!`
      }
      setMessages(prev => [...prev, { role: 'assistant', content: fallbackResponses.default }])
    }
    setLoading(false)
  }

  return (
    <AnimatePresence>
      {aiChatOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black lg:hidden"
            onClick={toggleAiChat}
          />
          <motion.div
            initial={{ x: 380 }}
            animate={{ x: 0 }}
            exit={{ x: 380 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-sm border-l border-border bg-card flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Tutor</h3>
                  <p className="text-xs text-muted-foreground">Always ready to help</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleAiChat} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-500/10">
                      <Bot className="h-3 w-3 text-orange-500" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <User className="h-3 w-3" />
                    </div>
                  )}
                </motion.div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/10">
                    <Bot className="h-3 w-3 text-orange-500" />
                  </div>
                  <div className="bg-muted rounded-xl px-3.5 py-2.5">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border p-4">
              <form
                onSubmit={e => { e.preventDefault(); handleSend() }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about the lesson..."
                  className="flex-1"
                  disabled={loading}
                />
                <Button type="submit" size="icon" disabled={loading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}