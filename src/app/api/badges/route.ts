import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const badges = await db.badge.findMany({
      orderBy: [{ rarity: 'asc' }, { category: 'asc' }]
    })
    return NextResponse.json({ badges })
  } catch (error) {
    console.error('Badges error:', error)
    return NextResponse.json({ error: 'Failed to fetch badges' }, { status: 500 })
  }
}
