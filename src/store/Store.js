import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const Store = create(devtools(set => ({
  visible1: true, // show or hide config main menu
  visible2: false, // show or hide create new streak dialog
  visible3: false, // show or hide delete streak dialog
  visible4: false, // show or hide edit streak dialog
  toggleVisible1: () => set(state => ({ visible1: !state.visible1 })),
  toggleVisible2: () => set(state => ({ visible2: !state.visible2 })),
  toggleVisible3: () => set(state => ({ visible3: !state.visible3 })),
  toggleVisible4: () => set(state => ({ visible4: !state.visible4 })),

  streaks: JSON.parse(localStorage.getItem("streaks")) || [],
  addStreak: data => set(state => ({ streaks: [...state.streaks, data] })),

  streakIdToEdit: null,
  setStreakIdToEdit: id => set({ streakIdToEdit: id }),

  streakIdToDelete: null,
  setStreakIdToDelete: id => set({ streakIdToDelete: id }),
  deleteStreak: () => set(state => {
    const newStreaksArray = state.streaks.filter(obj => obj.id !== state.streakIdToDelete)
    return ({ streaks: newStreaksArray })
  }),
})))
