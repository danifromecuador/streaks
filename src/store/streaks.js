import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

/** Global state for streaks: list plus add/delete. Persisted to localStorage under 'streaks'. */
export const useStreakStore = create(
  devtools(
    persist(
      set => ({
        streaks: [],
        addStreak: data => set(state => ({ streaks: [...state.streaks, data] })),
        updateStreak: (name, data) => set(state => ({
          streaks: state.streaks.map(s => s.name === name ? data : s),
        })),
        deleteStreak: name => set(state => ({ streaks: state.streaks.filter(s => s.name !== name) })),
      }),
      { name: 'streaks', partialize: state => ({ streaks: state.streaks }) }
    )
  )
)
