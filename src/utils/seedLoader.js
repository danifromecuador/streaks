import { useStreakStore } from '../store/streaks'
import { useBookmarkStore } from '../store/bookmarks'
import { getDomainIcon } from './linkItemForm'

/** Fetches seed-data.json from public. Returns null if not found or not ok. */
export async function fetchSeedData() {
  const res = await fetch('/seed-data.json')
  return res.ok ? res.json() : null
}

/** Clears all existing streaks and bookmarks, then loads seed data (name, url). Id and image are assigned by store and getDomainIcon. */
export function applySeed(data) {
  if (!data || (!data.streaks?.length && !data.bookmarks?.length)) return

  const { streaks: currentStreaks, deleteStreak } = useStreakStore.getState()
  const { bookmarks: currentBookmarks, deleteBookmark } = useBookmarkStore.getState()
  currentStreaks.forEach((s) => deleteStreak(s.id))
  currentBookmarks.forEach((b) => deleteBookmark(b.id))

  const { addStreak } = useStreakStore.getState()
  const { addBookmark } = useBookmarkStore.getState()
  data.streaks?.forEach((item) => addStreak({ name: item.name, url: item.url, image: getDomainIcon(item.url) }))
  data.bookmarks?.forEach((item) => addBookmark({ name: item.name, url: item.url, image: getDomainIcon(item.url) }))
}
