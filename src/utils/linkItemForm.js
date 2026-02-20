/** Build favicon URL from a page URL (e.g. for streaks/bookmarks). */
export const getDomainIcon = (url) => {
  try {
    const part = url.trim().split('.')[1]
    return part ? `https://icons.duckduckgo.com/ip3/${part}.com.ico` : ''
  } catch {
    return ''
  }
}

/** Returns validation errors for name and url. Empty string = no error. */
export const validateForm = (name, url) => ({
  name: name.trim() ? '' : 'Enter a name',
  url: url.trim() ? '' : 'Enter a URL',
})
