import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useBookmarkStore = create(devtools(set => ({
  createModalOpen: false,
  deleteModalOpen: false,
  toggleCreateModal: () => set(state => ({ createModalOpen: !state.createModalOpen })),
  toggleDeleteModal: () => set(state => ({ deleteModalOpen: !state.deleteModalOpen })),

  bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
  addBookmark: data => set(state => ({ bookmarks: [...state.bookmarks, data] })),

  nameToDelete: '',
  setNameToDelete: name => set({ nameToDelete: name }),
  deleteBookmark: () => set(state => {
    const next = state.bookmarks.filter(b => b.name !== state.nameToDelete)
    return { bookmarks: next }
  }),
})))
