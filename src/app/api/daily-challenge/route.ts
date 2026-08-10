import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const today = new Date().toISOString().split('T')[0]
    const userId = req.nextUrl.searchParams.get('userId')

    let dailyExercise = await db.exercise.findFirst({ where: { dailyDate: today } })

    if (!dailyExercise) {
      // Pick a random exercise as today's daily challenge
      const count = await db.exercise.count()
      if (count === 0) {
        return NextResponse.json({ error: 'No exercises available' }, { status: 404 })
      }
      const skip = Math.floor(Math.random() * count)
      const exercises = await db.exercise.findMany({ take: 1, skip })
      dailyExercise = exercises[0]
      if (dailyExercise) {
        await db.exercise.update({
          where: { id: dailyExercise.id },
          data: { isDailyChallenge: true, dailyDate: today }
        })
      }
    }

    if (!dailyExercise) {
      return NextResponse.json({ error: 'No daily challenge' }, { status: 404 })
    }

    // Check if user already attempted today
    let alreadyAttempted = false
    if (userId) {
      const attempt = await db.dailyChallengeAttempt.findFirst({
        where: { userId, exerciseId: dailyExercise.id }
      })
      alreadyAttempted = !!attempt
    }

    const lesson = await db.lesson.findUnique({ where: { id: dailyExercise.lessonId } })

    return NextResponse.json({
      exercise: dailyExercise,
      lesson,
      alreadyAttempted
    })
  } catch (error) {
    console.error('Daily challenge error:', error)
    return NextResponse.json({ error: 'Failed to fetch daily challenge' }, { status: 500 })
  }
}
