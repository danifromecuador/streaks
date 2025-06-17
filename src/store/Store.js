import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { addStreak, saveEditedStreak, deleteStreak } from './streaks'

export const Store = create(devtools(set => ({
  visible1: true, // show or hide config main menu
  visible2: false, // show or hide create new streak dialog
  toggleVisible1: () => set(state => ({ visible1: !state.visible1 }), false, 'toggleVisible1'),
  toggleVisible2: () => set(state => ({ visible2: !state.visible2 }), false, 'toggleVisible2'),

  streaks: JSON.parse(localStorage.getItem("streaks")) || [],
  // addStreak: data => set(state => ({ streaks: [...state.streaks, data] }), undefined, 'addStreak'),
  addStreak: data => addStreak(data, set),

  streakIdToEdit: null,
  setStreakIdToEdit: id => set({ streakIdToEdit: id }, undefined, 'setStreakIdToEdit'),
  saveEditedStreak: name => saveEditedStreak(name, set),

  streakIdToDelete: null,
  setStreakIdToDelete: id => set({ streakIdToDelete: id }, undefined, 'setStreakIdToDelete'),
  deleteStreak: () => deleteStreak(set),
})))