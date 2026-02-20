import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useStreakStore = create(devtools(set => ({
  streaks: JSON.parse(localStorage.getItem('streaks')) || [],
  addStreak: data => set(state => ({ streaks: [...state.streaks, data] })),
  deleteStreak: name => set(state => ({ streaks: state.streaks.filter(s => s.name !== name) })),
})))
