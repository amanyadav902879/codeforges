import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const paths = await db.learningPath.findMany({
      where: { isPublished: true },
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    })
    return NextResponse.json({ paths })
  } catch (error) {
    console.error('Paths error:', error)
    return NextResponse.json({ error: 'Failed to fetch paths' }, { status: 500 })
  }
}
