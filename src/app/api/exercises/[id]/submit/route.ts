import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { gradeSubmission, updateStreak, awardXp, checkAndAwardBadges } from '@/lib/grading'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { userId, code, timeTaken, attemptNumber, isExpertMode } = await req.json()

    if (!userId || !code) {
      return NextResponse.json({ error: 'User ID and code required' }, { status: 400 })
    }

    const exercise = await db.exercise.findUnique({ where: { id } })
    if (!exercise) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 })
    }

    // Get previous attempts count
    const prevSubs = await db.submission.count({
      where: { userId, exerciseId: id }
    })
    const currentAttempt = attemptNumber || prevSubs + 1

    // Grade the submission
    const result = gradeSubmission(code, exercise, currentAttempt, timeTaken || 0, isExpertMode)

    // Save submission
    await db.submission.create({
      data: {
        userId,
        exerciseId: id,
        code,
        passed: result.passed,
        score: result.score,
        timeTaken: timeTaken || 0,
        hintsUsed: 0,
        attemptNumber: currentAttempt
      }
    })

    let newBadges: string[] = []
    let leveledUp = false
    let newLevel = 0

    if (result.passed) {
      // Update user stats
      await db.user.update({
        where: { id: userId },
        data: { exercisesCompleted: { increment: 1 } }
      })

      // Update streak
      await updateStreak(userId)

      // Award XP
      const xpResult = await awardXp(userId, result.xpEarned)
      leveledUp = xpResult.leveledUp
      newLevel = xpResult.newLevel

      // Update lesson progress
      const lessonId = exercise.lessonId
      const existingProgress = await db.lessonProgress.findUnique({
        where: { userId_lessonId: { userId, lessonId } }
      })

      if (existingProgress) {
        await db.lessonProgress.update({
          where: { id: existingProgress.id },
          data: {
            score: Math.max(existingProgress.score, result.score),
            status: 'COMPLETED',
            completedAt: new Date()
          }
        })
      } else {
        await db.lessonProgress.create({
          data: {
            userId,
            lessonId,
            status: 'COMPLETED',
            score: result.score,
            completedAt: new Date()
          }
        })
      }

      // Check badges
      newBadges = await checkAndAwardBadges(userId)
    }

    return NextResponse.json({
      ...result,
      attemptNumber: currentAttempt,
      leveledUp,
      newLevel,
      newBadges
    })
  } catch (error) {
    console.error('Submit error:', error)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
