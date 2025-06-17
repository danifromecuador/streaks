import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const Store = create(devtools(set => ({
  visible1: true, // show or hide config main menu
  visible2: false, // show or hide create new streak dialog
  toggleVisible1: () => set(state => ({ visible1: !state.visible1 }), false, 'toggleVisible1'),
  toggleVisible2: () => set(state => ({ visible2: !state.visible2 }), false, 'toggleVisible2'),

  streaks: JSON.parse(localStorage.getItem("streaks")) || [],
  addStreak: data => set(state => ({ streaks: [...state.streaks, data] }), undefined, 'addStreak'),

  streakIdToEdit: null,
  setStreakIdToEdit: id => set({ streakIdToEdit: id }, undefined, 'setStreakIdToEdit'),
  saveEditedStreak: name => set(state => {
    const newStreaksArray = state.streaks
    const streakIndexToEdit = state.streaks.findIndex(streak => streak.id === state.streakIdToEdit)
    newStreaksArray[streakIndexToEdit].name = name
    return ({ streaks: newStreaksArray, streakIdToEdit: null })
  }, undefined, 'saveEditedStreak'),

  streakIdToDelete: null,
  setStreakIdToDelete: id => set({ streakIdToDelete: id }, undefined, 'setStreakIdToDelete'),
  deleteStreak: () => set(state => {
    const newStreaksArray = state.streaks.filter(obj => obj.id !== state.streakIdToDelete)
    return ({ streaks: newStreaksArray, streakIdToDelete: null })
  }, undefined, 'deleteStreak'),
})))