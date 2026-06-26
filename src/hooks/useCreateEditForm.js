import { useState, useEffect } from 'react'
import { buildLinkItem, validateForm } from '../utils/linkItemForm'

const INITIAL_ERRORS = { name: '', url: '' }

/** Form state and submit handler for create/edit modal. If initialItem is set, form is prefilled for edit. */
export const useCreateEditForm = (onSubmit, initialItem = null) => {
  const [name, setName] = useState(initialItem?.name ?? '')
  const [url, setUrl] = useState(initialItem?.url ?? '')
  const [errors, setErrors] = useState(INITIAL_ERRORS)

  useEffect(() => {
    if (initialItem) {
      setName(initialItem.name)
      setUrl(initialItem.url)
      setErrors(INITIAL_ERRORS)
    } else {
      setName('')
      setUrl('')
      setErrors(INITIAL_ERRORS)
    }
  }, [initialItem])

  const reset = () => {
    setName('')
    setUrl('')
    setErrors(INITIAL_ERRORS)
  }

  const submit = () => {
    const next = validateForm(name, url)
    setErrors(next)
    if (next.name || next.url) return
    onSubmit(buildLinkItem({ name, url, id: initialItem?.id }))
    if (!initialItem) reset()
  }

  return { name, url, errors, setName, setUrl, submit, reset }
}
