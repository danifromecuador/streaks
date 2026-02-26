import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

/** Global state for streaks: list plus add/delete. Persisted to localStorage under 'streaks'. Store only persists; callers pass full item. */
export const useStreakStore = create(
  devtools(
    persist(
      set => ({
        streaks: [],
        addStreak: data => set(state => ({ streaks: [...state.streaks, data] })),
        updateStreak: (id, data) => set(state => ({
          streaks: state.streaks.map(s => s.id === id ? { ...data, id } : s),
        })),
        deleteStreak: id => set(state => ({ streaks: state.streaks.filter(s => s.id !== id) })),
        reorderStreaks: (fromIndex, toIndex) => set(state => {
          if (fromIndex === toIndex) return state
          const arr = [...state.streaks]
          const [removed] = arr.splice(fromIndex, 1)
          arr.splice(toIndex, 0, removed)
          return { streaks: arr }
        }),
      }),
      { name: 'streaks', partialize: state => ({ streaks: state.streaks }) }
    )
  )
)
