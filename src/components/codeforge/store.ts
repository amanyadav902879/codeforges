import { create } from 'zustand'

type View = 'landing' | 'dashboard' | 'paths' | 'pathDetail' | 'exercise' | 'leaderboard' | 'profile'

interface AppState {
  view: View
  user: any | null
  token: string | null
  paths: any[]
  currentPath: any | null
  currentLesson: any | null
  currentExercise: any | null
  loading: boolean
  sidebarOpen: boolean
  aiChatOpen: boolean
  levelUpModal: { show: boolean; newLevel: number } | null
  newBadges: string[]

  setView: (view: View) => void
  setUser: (user: any, token: string) => void
  logout: () => void
  setPaths: (paths: any[]) => void
  setCurrentPath: (path: any) => void
  setCurrentLesson: (lesson: any) => void
  setCurrentExercise: (exercise: any) => void
  setLoading: (loading: boolean) => void
  toggleSidebar: () => void
  toggleAiChat: () => void
  setLevelUpModal: (data: { show: boolean; newLevel: number } | null) => void
  setNewBadges: (badges: string[]) => void
  goBack: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  view: 'landing',
  user: null,
  token: null,
  paths: [],
  currentPath: null,
  currentLesson: null,
  currentExercise: null,
  loading: false,
  sidebarOpen: false,
  aiChatOpen: false,
  levelUpModal: null,
  newBadges: [],

  setView: (view) => set({ view }),
  setUser: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null, view: 'landing' }),
  setPaths: (paths) => set({ paths }),
  setCurrentPath: (path) => set({ currentPath: path }),
  setCurrentLesson: (lesson) => set({ currentLesson: lesson }),
  setCurrentExercise: (exercise) => set({ currentExercise: exercise }),
  setLoading: (loading) => set({ loading }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  toggleAiChat: () => set((s) => ({ aiChatOpen: !s.aiChatOpen })),
  setLevelUpModal: (data) => set({ levelUpModal: data }),
  setNewBadges: (badges) => set({ newBadges: badges }),
  goBack: () => {
    const { view } = get()
    if (view === 'exercise') set({ view: 'pathDetail' })
    else if (view === 'pathDetail') set({ view: 'paths' })
    else set({ view: 'dashboard' })
  }
}))
