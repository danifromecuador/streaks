/** Default icon when favicon cannot be resolved or image fails to load. */
export const DEFAULT_LINK_ICON = '/default-link.svg'

/** Build favicon URL from a page URL (e.g. for streaks/bookmarks). Returns DEFAULT_LINK_ICON when domain cannot be parsed. */
export const getDomainIcon = (url) => {
  try {
    const part = url.trim().split('.')[1]
    return part ? `https://icons.duckduckgo.com/ip3/${part}.com.ico` : DEFAULT_LINK_ICON
  } catch {
    return DEFAULT_LINK_ICON
  }
}

/** Returns validation errors for name and url. Empty string = no error. */
export const validateForm = (name, url) => ({
  name: name.trim() ? '' : 'Enter a name',
  url: url.trim() ? '' : 'Enter a URL',
})
