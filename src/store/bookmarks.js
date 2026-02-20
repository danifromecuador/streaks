import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

/** Global state for bookmarks: list plus add/delete. Persisted to localStorage under 'bookmarks'. */
export const useBookmarkStore = create(
  devtools(
    persist(
      set => ({
        bookmarks: [],
        addBookmark: data => set(state => ({ bookmarks: [...state.bookmarks, data] })),
        deleteBookmark: name => set(state => ({ bookmarks: state.bookmarks.filter(b => b.name !== name) })),
      }),
      { name: 'bookmarks', partialize: state => ({ bookmarks: state.bookmarks }) }
    )
  )
)
