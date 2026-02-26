/** Default icon when favicon cannot be resolved or image fails to load. */
export const DEFAULT_LINK_ICON = '/default-link.svg'

/** Apex domain (e.g. drive.google.com → google.com) so icon lookup uses the main brand's high-res icon. */
const toApexDomain = (hostname) => {
  const parts = hostname.split('.')
  if (parts.length > 2) return parts.slice(-2).join('.')
  return hostname
}

/** Ordered list of icon provider URLs for a page URL (apex domain). Used for fallback when one fails or returns low-res. */
export const getDomainIconUrls = (url) => {
  try {
    const raw = (url ?? '').trim()
    if (!raw) return []
    const hostname = new URL(raw.startsWith('http') ? raw : `https://${raw}`).hostname
    const domain = hostname.replace(/^www\./, '')
    const apex = toApexDomain(domain)
    if (!apex) return []
    return [
      `https://ico.faviconkit.net/favicon/${apex}?sz=128`,
      `https://favicon.im/${apex}?larger=true`,
      `https://www.google.com/s2/favicons?domain=${apex}&sz=128`,
    ]
  } catch {
    return []
  }
}

/** First icon URL for a page URL (FaviconKit). Used when building/editing items and for migration. */
export const getDomainIcon = (url) => {
  const urls = getDomainIconUrls(url)
  return urls[0] ?? DEFAULT_LINK_ICON
}

/** Builds a full link item from user input (name, url). Id and image are set here; callers pass this to the store. */
export const buildLinkItem = ({ name, url, id }) => ({
  id: id ?? crypto.randomUUID(),
  name: (name ?? '').trim(),
  url: (url ?? '').trim(),
  image: getDomainIcon(url ?? ''),
})

/** Returns validation errors for name and url. Empty string = no error. */
export const validateForm = (name, url) => ({
  name: name.trim() ? '' : 'Enter a name',
  url: url.trim() ? '' : 'Enter a URL',
})
