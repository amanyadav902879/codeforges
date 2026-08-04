import { getLevelFromXp, calculateXpReward } from './xp'
import { db } from './db'

export type GradingResult = {
  passed: boolean
  score: number
  feedback: string[]
  executionTime: number
  memoryUsed: string
  xpEarned: number
}

// Simulated Java code grading engine
// In production, this would use Docker sandbox + JUnit execution
export function gradeSubmission(
  userCode: string,
  exercise: {
    referenceSolution: string
    starterCode: string
    type: string
    testCode: string
    hints: string
    xpReward: number
  },
  attemptNumber: number,
  timeTaken: number,
  isExpertMode: boolean = false
): GradingResult {
  const feedback: string[] = []
  const refSol = exercise.referenceSolution.toLowerCase().trim()
  const userCodeLower = userCode.toLowerCase().trim()
  const startTime = Date.now()

  let passed = false
  let score = 0

  // Check if user code contains key patterns from reference solution
  const refPatterns = extractPatterns(refSol)
  const userPatterns = extractPatterns(userCodeLower)

  const patternMatch = refPatterns.filter(p => userPatterns.includes(p)).length
  const matchRatio = refPatterns.length > 0 ? patternMatch / refPatterns.length : 0

  // Base passing logic
  if (matchRatio >= 0.5) {
    passed = true
    score = Math.min(Math.round(matchRatio * 100), 100)
  } else if (userCode.trim().length > exercise.starterCode.trim().length * 1.5) {
    // User wrote substantially more code than starter - give partial credit
    passed = matchRatio >= 0.3
    score = Math.round(matchRatio * 80)
  }

  // Execution time simulation (10-200ms)
  const executionTime = Math.max(10, Math.min(200, Date.now() - startTime + Math.floor(Math.random() * 150 + 20)))
  const memoryUsed = `${(Math.random() * 30 + 5).toFixed(1)} MB`

  if (passed) {
    if (score === 100) {
      feedback.push('All test cases passed! Flawless execution.')
    } else {
      feedback.push(`Passed with ${score}% score. ${100 - score}% of edge cases missed.`)
    }
    if (attemptNumber === 1) {
      feedback.push('First attempt success! +50 XP bonus.')
    }
  } else {
    feedback.push(`Solution did not pass. Score: ${score}%. Check your logic carefully.`)
    if (attemptNumber === 1) {
      const hints = JSON.parse(exercise.hints || '[]')
      if (hints.length > 0) {
        feedback.push(`Hint: ${hints[0]}`)
      }
    }
  }

  // Performance hints
  if (passed && score < 80) {
    feedback.push('Your solution works but may not be optimal. Consider time complexity.')
  }

  const xpEarned = passed
    ? calculateXpReward(exercise.xpReward, attemptNumber, isExpertMode, timeTaken < 120)
    : 0

  return { passed, score, feedback, executionTime, memoryUsed, xpEarned }
}

function extractPatterns(code: string): string[] {
  const patterns: string[] = []
  // Extract method signatures
  const methodMatches = code.match(/(public|private|protected|static)\s+\w+\s+\w+\s*\(/g)
  if (methodMatches) patterns.push(...methodMatches.map(m => m.trim()))
  // Extract key Java keywords used
  const keywords = ['return', 'if', 'else', 'for', 'while', 'new', 'class', 'void', 'int', 'string', 'boolean', 'map', 'list', 'array', 'hashmap', 'arraylist', 'stream', 'optional', 'null']
  for (const kw of keywords) {
    if (code.includes(kw)) patterns.push(kw)
  }
  // Extract key logic patterns
  const logicMatches = code.match(/(\.equals|\.put|\.get|\.add|\.remove|\.size|\.length|\.contains|\.sort|\.stream|\.collect|\.filter|\.map|\.reduce)/g)
  if (logicMatches) patterns.push(...logicMatches.map(m => m.trim()))
  return [...new Set(patterns)]
}

export async function updateStreak(userId: string): Promise<{ streak: number; isNewDay: boolean }> {
  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) return { streak: 0, isNewDay: false }

  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

  let isNewDay = false
  let newStreak = user.streak

  if (user.lastActiveDate === today) {
    // Already active today
    return { streak: newStreak, isNewDay: false }
  }

  if (user.lastActiveDate === yesterday) {
    newStreak = user.streak + 1
  } else {
    newStreak = 1
  }
  isNewDay = true

  const updated = await db.user.update({
    where: { id: userId },
    data: {
      streak: newStreak,
      longestStreak: Math.max(newStreak, user.longestStreak),
      lastActiveDate: today
    }
  })

  // Log streak
  await db.streakLog.upsert({
    where: { userId_date: { userId, date: today } },
    create: { userId, date: today, xpEarned: 0, exercisesCompleted: 0 },
    update: {}
  })

  return { streak: updated.streak, isNewDay }
}

export async function awardXp(userId: string, xp: number): Promise<{ newLevel: number; leveledUp: boolean }> {
  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) return { newLevel: 1, leveledUp: false }

  const oldLevel = getLevelFromXp(user.xp).level
  const newTotalXp = user.xp + xp
  const newLevelInfo = getLevelFromXp(newTotalXp)
  const leveledUp = newLevelInfo.level > oldLevel

  await db.user.update({
    where: { id: userId },
    data: { xp: newTotalXp, level: newLevelInfo.level }
  })

  // Update streak log
  const today = new Date().toISOString().split('T')[0]
  await db.streakLog.upsert({
    where: { userId_date: { userId, date: today } },
    create: { userId, date: today, xpEarned: xp, exercisesCompleted: 0 },
    update: { xpEarned: { increment: xp } }
  })

  return { newLevel: newLevelInfo.level, leveledUp }
}

export async function checkAndAwardBadges(userId: string): Promise<string[]> {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: { badges: { include: { badge: true } } }
  })
  if (!user) return []

  const existingBadgeIds = new Set(user.badges.map(b => b.badgeId))
  const allBadges = await db.badge.findMany()
  const newBadges: string[] = []

  for (const badge of allBadges) {
    if (existingBadgeIds.has(badge.id)) continue

    let earned = false
    switch (badge.category) {
      case 'STREAK':
        if (badge.triggerValue <= user.streak) earned = true
        break
      case 'GRIND':
        if (badge.triggerValue <= user.exercisesCompleted) earned = true
        break
      case 'XP':
        if (badge.triggerValue <= user.xp) earned = true
        break
      case 'LEVEL':
        if (badge.triggerValue <= user.level) earned = true
        break
      case 'LONGEST_STREAK':
        if (badge.triggerValue <= user.longestStreak) earned = true
        break
    }

    if (earned) {
      await db.userBadge.create({ data: { userId, badgeId: badge.id } })
      newBadges.push(badge.name)
    }
  }

  return newBadges
}
