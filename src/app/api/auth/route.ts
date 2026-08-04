import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getLevelFromXp } from '@/lib/xp'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { action, username, email, password, userId } = body

    if (action === 'signup') {
      if (!username || !email || !password) {
        return NextResponse.json({ error: 'Username, email, and password are required' }, { status: 400 })
      }
      if (username.length < 3) {
        return NextResponse.json({ error: 'Username must be at least 3 characters' }, { status: 400 })
      }
      if (password.length < 6) {
        return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
      }

      const existing = await db.user.findFirst({
        where: { OR: [{ username }, { email }] }
      })
      if (existing) {
        return NextResponse.json({ error: 'Username or email already taken' }, { status: 409 })
      }

      const user = await db.user.create({
        data: {
          username,
          email,
          passwordHash: password, // In production: bcrypt hash
          avatarSeed: username,
          displayName: username
        }
      })

      return NextResponse.json({
        user: sanitizeUser(user),
        token: user.id // Simplified: using user ID as token
      })
    }

    if (action === 'login') {
      if (!email && !username) {
        return NextResponse.json({ error: 'Email or username required' }, { status: 400 })
      }
      if (!password) {
        return NextResponse.json({ error: 'Password required' }, { status: 400 })
      }

      const user = await db.user.findFirst({
        where: { OR: [{ email }, { username }] }
      })
      if (!user || user.passwordHash !== password) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

      return NextResponse.json({
        user: sanitizeUser(user),
        token: user.id
      })
    }

    if (action === 'me') {
      if (!userId) {
        return NextResponse.json({ error: 'User ID required' }, { status: 401 })
      }
      const user = await db.user.findUnique({
        where: { id: userId },
        include: {
          badges: { include: { badge: true }, orderBy: { earnedAt: 'desc' } },
          _count: { select: { submissions: true, badges: true } }
        }
      })
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      const levelInfo = getLevelFromXp(user.xp)
      return NextResponse.json({
        user: {
          ...sanitizeUser(user),
          badges: user.badges.map(ub => ({ ...ub.badge, earnedAt: ub.earnedAt })),
          totalBadges: user._count.badges,
          totalSubmissions: user._count.submissions,
          ...levelInfo
        }
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function sanitizeUser(user: any) {
  const levelInfo = getLevelFromXp(user.xp)
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    displayName: user.displayName || user.username,
    bio: user.bio,
    avatarSeed: user.avatarSeed || user.username,
    xp: user.xp,
    level: levelInfo.level,
    streak: user.streak,
    longestStreak: user.longestStreak,
    exercisesCompleted: user.exercisesCompleted,
    totalTimeSpent: user.totalTimeSpent,
    currentXpInLevel: levelInfo.currentXpInLevel,
    xpNeededForNext: levelInfo.xpNeededForNext,
    levelProgress: levelInfo.progress,
    createdAt: user.createdAt
  }
}