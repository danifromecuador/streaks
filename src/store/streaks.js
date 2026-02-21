import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

/** Global state for streaks: list plus add/delete. Persisted to localStorage under 'streaks'. Items have unique id. */
export const useStreakStore = create(
  devtools(
    persist(
      set => ({
        streaks: [],
        addStreak: data => set(state => {
          const withId = { ...data, id: data.id ?? crypto.randomUUID() }
          return { streaks: [...state.streaks, withId] }
        }),
        updateStreak: (id, data) => set(state => ({
          streaks: state.streaks.map(s => s.id === id ? { ...data, id } : s),
        })),
        deleteStreak: id => set(state => ({ streaks: state.streaks.filter(s => s.id !== id) })),
      }),
      { name: 'streaks', partialize: state => ({ streaks: state.streaks }) }
    )
  )
)
