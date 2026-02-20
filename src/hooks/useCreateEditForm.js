import { useState } from 'react'
import { getDomainIcon } from '../utils/linkItemForm'
import { validateForm } from '../utils/linkItemForm'

const INITIAL_ERRORS = { name: '', url: '' }

/** Form state and submit handler for create/edit modal. Validates name and url, then calls onSubmit({ name, image, url }) and resets. */
export const useCreateEditForm = (onSubmit) => {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [errors, setErrors] = useState(INITIAL_ERRORS)

  const submit = () => {
    const next = validateForm(name, url)
    setErrors(next)
    if (next.name || next.url) return
    onSubmit({ name: name.trim(), image: getDomainIcon(url), url: url.trim() })
    setName('')
    setUrl('')
    setErrors(INITIAL_ERRORS)
  }

  return { name, url, errors, setName, setUrl, submit }
}
