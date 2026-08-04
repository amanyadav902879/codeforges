import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const lesson = await db.lesson.findUnique({
      where: { id },
      include: {
        exercises: { orderBy: { id: 'asc' } },
        module: {
          include: {
            path: true
          }
        }
      }
    })
    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    const userId = req.nextUrl.searchParams.get('userId')
    let submissions: any[] = []
    let lessonProgress: any = null
    if (userId) {
      const exerciseIds = lesson.exercises.map(e => e.id)
      submissions = await db.submission.findMany({
        where: { userId, exerciseId: { in: exerciseIds } },
        orderBy: { createdAt: 'desc' },
        take: 50
      })
      // Get best submission per exercise
      const bestMap: Record<string, any> = {}
      for (const sub of submissions) {
        if (!bestMap[sub.exerciseId] || sub.score > bestMap[sub.exerciseId].score) {
          bestMap[sub.exerciseId] = sub
        }
      }
      submissions = Object.values(bestMap)

      lessonProgress = await db.lessonProgress.findUnique({
        where: { userId_lessonId: { userId, lessonId: id } }
      })
    }

    return NextResponse.json({ lesson, exercises: lesson.exercises, submissions, lessonProgress })
  } catch (error) {
    console.error('Exercises error:', error)
    return NextResponse.json({ error: 'Failed to fetch exercises' }, { status: 500 })
  }
}
