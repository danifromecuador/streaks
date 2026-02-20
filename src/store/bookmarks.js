import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useBookmarkStore = create(devtools(set => ({
  bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || [],
  addBookmark: data => set(state => ({ bookmarks: [...state.bookmarks, data] })),
  deleteBookmark: name => set(state => ({ bookmarks: state.bookmarks.filter(b => b.name !== name) })),
})))
