// XP & Level System for CodeForge

export function xpForLevel(level: number): number {
  if (level <= 10) return 100
  if (level <= 25) return 250
  if (level <= 50) return 500
  return 1000
}

export function totalXpForLevel(targetLevel: number): number {
  let total = 0
  for (let i = 1; i < targetLevel; i++) {
    total += xpForLevel(i)
  }
  return total
}

export function getLevelFromXp(totalXp: number): { level: number; currentXpInLevel: number; xpNeededForNext: number; progress: number } {
  let level = 1
  let remainingXp = totalXp

  while (remainingXp >= xpForLevel(level) && level < 100) {
    remainingXp -= xpForLevel(level)
    level++
  }

  const xpNeeded = xpForLevel(level)
  const progress = Math.min(remainingXp / xpNeeded, 1)

  return {
    level: Math.min(level, 100),
    currentXpInLevel: remainingXp,
    xpNeededForNext: xpNeeded,
    progress
  }
}

export function calculateXpReward(
  baseXp: number,
  attemptNumber: number,
  isExpertMode: boolean = false,
  isUnderTime: boolean = false,
  streakMultiplier: number = 1
): number {
  let xp = baseXp
  if (attemptNumber === 1) xp = 50
  else if (attemptNumber === 2) xp = 35
  else xp = 20

  if (isExpertMode) xp *= 2
  if (isUnderTime) xp *= 1.5
  xp = Math.round(xp * streakMultiplier)
  return xp
}

export function getLevelUnlocks(level: number): string[] {
  const unlocks: Record<number, string> = {
    3: 'Custom avatar upload',
    5: 'Expert Mode difficulty',
    8: 'Daily Challenge access',
    10: 'Forum posting',
    15: 'Project Sandbox',
    20: 'Path improvement proposals',
    25: 'Mentor role eligibility',
    30: 'AI/ML tracks',
    50: 'Advanced badge + custom title',
    100: 'CodeForge Master'
  }
  return Object.entries(unlocks)
    .filter(([l]) => Number(l) <= level)
    .map(([, v]) => v)
}

export function getRarityColor(rarity: string): string {
  const colors: Record<string, string> = {
    COMMON: 'text-zinc-400',
    RARE: 'text-blue-400',
    EPIC: 'text-purple-400',
    LEGENDARY: 'text-amber-400',
    MYTHIC: 'text-rose-400'
  }
  return colors[rarity] || colors.COMMON
}

export function getRarityBg(rarity: string): string {
  const colors: Record<string, string> = {
    COMMON: 'bg-zinc-800 border-zinc-600',
    RARE: 'bg-blue-950 border-blue-600',
    EPIC: 'bg-purple-950 border-purple-600',
    LEGENDARY: 'bg-amber-950 border-amber-600',
    MYTHIC: 'bg-rose-950 border-rose-600'
  }
  return colors[rarity] || colors.COMMON
}
