import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useStreakStore = create(devtools(set => ({
  // create / delete modals
  createModalOpen: false,
  deleteModalOpen: false,
  toggleCreateModal: () => set(state => ({ createModalOpen: !state.createModalOpen })),
  toggleDeleteModal: () => set(state => ({ deleteModalOpen: !state.deleteModalOpen })),

  streaks: JSON.parse(localStorage.getItem('streaks')) || [],
  addStreak: data => set(state => ({ streaks: [...state.streaks, data] })),

  nameToDelete: '',
  setNameToDelete: name => set({ nameToDelete: name }),
  deleteStreak: () => set(state => {
    const next = state.streaks.filter(s => s.name !== state.nameToDelete)
    return { streaks: next }
  }),
})))
