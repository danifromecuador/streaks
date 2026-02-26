import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

/** Global state for bookmarks: list plus add/delete. Persisted to localStorage under 'bookmarks'. Store only persists; callers pass full item. */
export const useBookmarkStore = create(
  devtools(
    persist(
      set => ({
        bookmarks: [],
        addBookmark: data => set(state => ({ bookmarks: [...state.bookmarks, data] })),
        updateBookmark: (id, data) => set(state => ({
          bookmarks: state.bookmarks.map(b => b.id === id ? { ...data, id } : b),
        })),
        deleteBookmark: id => set(state => ({ bookmarks: state.bookmarks.filter(b => b.id !== id) })),
        reorderBookmarks: (fromIndex, toIndex) => set(state => {
          if (fromIndex === toIndex) return state
          const arr = [...state.bookmarks]
          const [removed] = arr.splice(fromIndex, 1)
          arr.splice(toIndex, 0, removed)
          return { bookmarks: arr }
        }),
      }),
      { name: 'bookmarks', partialize: state => ({ bookmarks: state.bookmarks }) }
    )
  )
)
