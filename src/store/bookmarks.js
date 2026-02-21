import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

/** Global state for bookmarks: list plus add/delete. Persisted to localStorage under 'bookmarks'. Items have unique id. */
export const useBookmarkStore = create(
  devtools(
    persist(
      set => ({
        bookmarks: [],
        addBookmark: data => set(state => {
          const withId = { ...data, id: data.id ?? crypto.randomUUID() }
          return { bookmarks: [...state.bookmarks, withId] }
        }),
        updateBookmark: (id, data) => set(state => ({
          bookmarks: state.bookmarks.map(b => b.id === id ? { ...data, id } : b),
        })),
        deleteBookmark: id => set(state => ({ bookmarks: state.bookmarks.filter(b => b.id !== id) })),
      }),
      { name: 'bookmarks', partialize: state => ({ bookmarks: state.bookmarks }) }
    )
  )
)
