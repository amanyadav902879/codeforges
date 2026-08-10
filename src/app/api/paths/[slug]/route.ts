import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const path = await db.learningPath.findUnique({
      where: { slug },
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        }
      }
    })
    if (!path) {
      return NextResponse.json({ error: 'Path not found' }, { status: 404 })
    }

    const userId = req.nextUrl.searchParams.get('userId')
    let progress: Record<string, any> = {}
    if (userId) {
      const allLessons = path.modules.flatMap(m => m.lessons)
      const lessonIds = allLessons.map(l => l.id)
      const userProgress = await db.lessonProgress.findMany({
        where: { userId, lessonId: { in: lessonIds } }
      })
      userProgress.forEach(p => {
        progress[p.lessonId] = p
      })
    }

    return NextResponse.json({ path, progress })
  } catch (error) {
    console.error('Path detail error:', error)
    return NextResponse.json({ error: 'Failed to fetch path' }, { status: 500 })
  }
}
