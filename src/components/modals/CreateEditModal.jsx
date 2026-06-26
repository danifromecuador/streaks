import { useEffect, useRef, useMemo, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { cn, classes } from '../../classes'
import { getTitle, getSubmitLabel } from './createEditModalLabels'
import { useCreateEditForm } from '../../hooks/useCreateEditForm'
import rawUrlSuggestions from '../../data/urlSuggestions.jsonc?raw'

/**
 * Parsed URL suggestions used for the autocomplete list.
 * The source file is JSONC (JSON + comments), so we strip comment lines
 * before parsing to keep runtime parsing simple and robust.
 */
const urlSuggestions = (() => {
  try {
    const cleaned = (rawUrlSuggestions ?? '')
      .split('\n')
      .map((line) => (line.trim().startsWith('//') ? '' : line))
      .join('\n')
    const parsed = JSON.parse(cleaned)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    // If parsing fails, fall back to no suggestions instead of breaking the modal.
    return []
  }
})()

const NAME_ID = 'create-edit-name'
const URL_ID = 'create-edit-url'

/**
 * Modal to create or edit a streak/bookmark.
 *
 * - `type`: 'streak' | 'bookmark' (used only for labels/context).
 * - `isEdit`: when true, form is prefilled from `initialItem` and on submit
 *   the caller is expected to update an existing item instead of creating one.
 * - `onSubmit(item)`: invoked with `{ id?, name, url, image }` from the form hook.
 */
export const CreateEditModal = ({ open, onClose, onSubmit, type, isEdit = false, initialItem = null }) => {
  const firstInputRef = useRef(null)
  const urlInputRef = useRef(null)
  // Whether the URL suggestions dropdown is visible.
  const [showUrlSuggestions, setShowUrlSuggestions] = useState(false)
  // Index of the currently highlighted URL suggestion for keyboard navigation.
  const [activeUrlSuggestionIndex, setActiveUrlSuggestionIndex] = useState(-1)
  const { name, url, errors, setName, setUrl, submit, reset } = useCreateEditForm(onSubmit, isEdit ? initialItem : null)
  const title = getTitle(type, isEdit)
  const submitLabel = getSubmitLabel(isEdit)

  /**
   * Current URL suggestions that match the user's input.
   * Filtered by substring (case-insensitive) and limited to a small number
   * to avoid overwhelming the user with options.
   */
  const urlMatches = useMemo(() => {
    const raw = (url ?? '').trim().toLowerCase()
    if (!raw) return []
    return urlSuggestions
      .filter((item) => item.url.toLowerCase().includes(raw))
      .slice(0, 3)
  }, [url])

  /**
   * Keep the active suggestion index in a valid range whenever
   * the suggestions list or visibility changes.
   */
  useEffect(() => {
    if (!showUrlSuggestions || urlMatches.length === 0) {
      setActiveUrlSuggestionIndex(-1)
      return
    }
    if (activeUrlSuggestionIndex === -1) {
      setActiveUrlSuggestionIndex(0)
    } else if (activeUrlSuggestionIndex >= urlMatches.length) {
      setActiveUrlSuggestionIndex(urlMatches.length - 1)
    }
  }, [showUrlSuggestions, urlMatches, activeUrlSuggestionIndex])

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => firstInputRef.current?.focus(), 0)
      return () => clearTimeout(t)
    } else {
      reset()
      setShowUrlSuggestions(false)
      setActiveUrlSuggestionIndex(-1)
    }
  }, [open])

  /**
   * Wrapper submit handler that prevents full page reload and
   * delegates to the form hook's `submit` function.
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    submit()
  }

  return (
    <div className={cn(classes.modalOverlay, !open && 'hidden')} onClick={onClose}>
      <div
        className={classes.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-edit-title"
      >
        <h2 id="create-edit-title">{title}</h2>
        <button type="button" className={classes.modalCloseBtn} onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[1vw]">
          <div>
            <label htmlFor={NAME_ID} className="block">
              name
            </label>
            <input
              id={NAME_ID}
              ref={firstInputRef}
              type="text"
              className={classes.modalInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            <span id="name-error" className={classes.modalAlert} role="alert">
              {errors.name}
            </span>
          </div>
          <div>
            <label htmlFor={URL_ID} className="block">
              url
            </label>
            <input
              id={URL_ID}
              ref={urlInputRef}
              type="text"
              className={classes.modalInput}
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
                setShowUrlSuggestions(true)
                setActiveUrlSuggestionIndex(-1)
              }}
              onKeyDown={(e) => {
                if (!showUrlSuggestions || urlMatches.length === 0) return
                if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  setActiveUrlSuggestionIndex((prev) => {
                    const next = prev + 1
                    if (next >= urlMatches.length) return 0
                    return next
                  })
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  setActiveUrlSuggestionIndex((prev) => {
                    const next = prev - 1
                    if (next < 0) return urlMatches.length - 1
                    return next
                  })
                } else if (e.key === 'Enter' && activeUrlSuggestionIndex >= 0 && activeUrlSuggestionIndex < urlMatches.length) {
                  e.preventDefault()
                  const item = urlMatches[activeUrlSuggestionIndex]
                  setUrl(item.url)
                  setShowUrlSuggestions(false)
                  urlInputRef.current?.focus()
                }
              }}
              autoComplete="off"
              aria-invalid={!!errors.url}
              aria-describedby={errors.url ? 'url-error' : undefined}
            />
            <span id="url-error" className={classes.modalAlert} role="alert">
              {errors.url}
            </span>
            {showUrlSuggestions && urlMatches.length > 0 && (
              <ul className="mt-[0.2vw] flex flex-col gap-[0.1vw] text-[0.9em]">
                {urlMatches.map((item, index) => (
                  <li key={item.url}>
                    <button
                      type="button"
                      className={cn(
                        'w-full text-left rounded-[0.3vw] px-[0.4vw] py-[0.2vw] truncate',
                        activeUrlSuggestionIndex === index
                          ? 'bg-[#243b53] text-[#e4e7eb]'
                          : 'bg-[#1f2933] hover:bg-[#243b53] text-[#e4e7eb]'
                      )}
                      onClick={() => {
                        setUrl(item.url)
                        setShowUrlSuggestions(false)
                        urlInputRef.current?.focus()
                      }}
                    >
                      {item.url}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex justify-center">
            <button type="submit" className={classes.modalSubmitBtn}>
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
