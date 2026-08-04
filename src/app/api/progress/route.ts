import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId')
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const [progress, submissions, streakLogs] = await Promise.all([
      db.lessonProgress.findMany({ where: { userId } }),
      db.submission.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 100
      }),
      db.streakLog.findMany({
        where: { userId },
        orderBy: { date: 'asc' }
      })
    ])

    // Calculate skill breakdown
    const skillMap: Record<string, { total: number; passed: number; totalScore: number }> = {}
    const exerciseIds = submissions.map(s => s.exerciseId)
    if (exerciseIds.length > 0) {
      const exercises = await db.exercise.findMany({ where: { id: { in: exerciseIds } } })
      const exerciseLessonMap: Record<string, string> = {}
      exercises.forEach(e => { exerciseLessonMap[e.id] = e.lessonId })
      const lessonIds = [...new Set(exercises.map(e => e.lessonId))]
      const lessons = await db.lesson.findMany({ where: { id: { in: lessonIds } } })
      const lessonSkillMap: Record<string, string> = {}
      lessons.forEach(l => { lessonSkillMap[l.id] = l.skillTags })

      for (const sub of submissions) {
        const lessonId = exerciseLessonMap[sub.exerciseId]
        if (!lessonId) continue
        const skills = (lessonSkillMap[lessonId] || '').split(',').map(s => s.trim()).filter(Boolean)
        for (const skill of skills) {
          if (!skillMap[skill]) skillMap[skill] = { total: 0, passed: 0, totalScore: 0 }
          skillMap[skill].total++
          if (sub.passed) skillMap[skill].passed++
          skillMap[skill].totalScore += sub.score
        }
      }
    }

    const skills = Object.entries(skillMap).map(([name, data]) => ({
      name,
      ...data,
      avgScore: data.total > 0 ? Math.round(data.totalScore / data.total) : 0,
      passRate: data.total > 0 ? Math.round((data.passed / data.total) * 100) : 0
    }))

    return NextResponse.json({ progress, submissions, streakLogs, skills })
  } catch (error) {
    console.error('Progress error:', error)
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
  }
}
