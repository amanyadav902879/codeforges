import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get('type') || 'allTime'
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '50')

    let users
    if (type === 'streak') {
      users = await db.user.findMany({
        orderBy: [{ streak: 'desc' }],
        take: limit,
        select: {
          id: true, username: true, displayName: true, avatarSeed: true,
          xp: true, level: true, streak: true, exercisesCompleted: true, createdAt: true
        }
      })
    } else if (type === 'weekly') {
      const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString()
      const recentSubs = await db.submission.groupBy({
        by: ['userId'],
        where: { createdAt: { gte: weekAgo }, passed: true },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: limit
      })
      const userIds = recentSubs.map(r => r.userId)
      users = await db.user.findMany({
        where: { id: { in: userIds } },
        select: {
          id: true, username: true, displayName: true, avatarSeed: true,
          xp: true, level: true, streak: true, exercisesCompleted: true, createdAt: true
        }
      })
      // Sort by weekly subs count
      const countMap = Object.fromEntries(recentSubs.map(r => [r.userId, r._count.id]))
      users.sort((a, b) => (countMap[b.id] || 0) - (countMap[a.id] || 0))
    } else {
      users = await db.user.findMany({
        orderBy: [{ xp: 'desc' }],
        take: limit,
        select: {
          id: true, username: true, displayName: true, avatarSeed: true,
          xp: true, level: true, streak: true, exercisesCompleted: true, createdAt: true
        }
      })
    }

    return NextResponse.json({ leaderboard: users })
  } catch (error) {
    console.error('Leaderboard error:', error)
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 })
  }
}
