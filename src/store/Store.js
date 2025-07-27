import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { addStreak, saveEditedStreak, deleteStreak } from './streaks'
import { addShortcut, saveEditedShortcut, deleteShortcut } from './shortcuts'

export const Store = create(devtools(set => ({
  visible1: true, // show or hide config main menu
  visible2: false, // show or hide create new dialog
  toggleVisible1: () => set(state => ({ visible1: !state.visible1 }), false, 'toggleVisible1'),
  toggleVisible2: () => set(state => ({ visible2: !state.visible2 }), false, 'toggleVisible2'),

  streakOrShortcut: '', // create new dialog can be a new streak or a new shortcut
  setStreakOrShortcut: type => set(() => ({ streakOrShortcut: type })),

  // streaks operations
  streaks: JSON.parse(localStorage.getItem("streaks")) || [],
  addStreak: data => addStreak(data, set),
  streakIdToEdit: null,
  setStreakIdToEdit: id => set({ streakIdToEdit: id }, undefined, 'setStreakIdToEdit'),
  saveEditedStreak: name => saveEditedStreak(name, set),
  streakIdToDelete: null,
  setStreakIdToDelete: id => set({ streakIdToDelete: id }, undefined, 'setStreakIdToDelete'),
  deleteStreak: () => deleteStreak(set),

  // shortcuts operations
  shortcuts: JSON.parse(localStorage.getItem("shortcuts")) || [],
  addShortcut: data => addShortcut(data, set),
  shortcutIdToEdit: null,
  setShortcutIdToEdit: id => set({ shortcutIdToEdit: id }, undefined, 'setShortcutIdToEdit'),
  saveEditedShortcut: data => saveEditedShortcut(data, set),
  shortcutIdToDelete: null,
  setShortcutIdToDelete: id => set({ shortcutIdToDelete: id }, undefined, 'setShortcutIdToDelete'),
  deleteShortcut: () => deleteShortcut(set),
})))