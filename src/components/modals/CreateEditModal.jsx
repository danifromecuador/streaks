import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { cn, classes } from '../../classes'

const getDomainIcon = (url) => {
  try {
    const part = url.trim().split('.')[1]
    return part ? `https://icons.duckduckgo.com/ip3/${part}.com.ico` : ''
  } catch {
    return ''
  }
}

const INITIAL_ERRORS = { name: '', url: '' }

export const CreateEditModal = ({ open, onClose, onSubmit, title, submitLabel }) => {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [errors, setErrors] = useState(INITIAL_ERRORS)

  const submit = () => {
    const next = {
      name: name.trim() ? '' : 'Enter a name',
      url: url.trim() ? '' : 'Enter a URL',
    }
    setErrors(next)
    if (next.name || next.url) return
    onSubmit({ name: name.trim(), image: getDomainIcon(url), url: url.trim() })
    setName('')
    setUrl('')
    setErrors(INITIAL_ERRORS)
  }

  return (
    <div className={cn(classes.modal, !open && 'hidden')}>
      <h2>{title}</h2>
      <button type="button" className={classes.modalCloseBtn} onClick={onClose}>
        <CloseIcon />
      </button>
      <div>
        <p>name</p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <span className={classes.modalAlert}>{errors.name}</span>
      </div>
      <div>
        <p>url</p>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        <span className={classes.modalAlert}>{errors.url}</span>
      </div>
      <button type="button" className={classes.modalSubmitBtn} onClick={submit}>
        {submitLabel}
      </button>
    </div>
  )
}
