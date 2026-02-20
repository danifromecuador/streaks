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

export const CreateEditModal = ({ open, onClose, onSubmit, mode }) => {
  const isStreak = mode === 'streak'
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [nameAlert, setNameAlert] = useState('')
  const [urlAlert, setUrlAlert] = useState('')

  const submit = () => {
    setNameAlert('')
    setUrlAlert('')
    if (!name.trim().length) setNameAlert('Enter a name')
    if (!url.trim().length) setUrlAlert('Enter a URL')
    if (name.trim().length && url.trim().length) {
      const item = { name: name.trim(), image: getDomainIcon(url), url: url.trim() }
      onSubmit(item)
      setName('')
      setUrl('')
    }
  }

  const title = isStreak ? 'Create new Streak' : 'Add bookmark'
  const submitLabel = isStreak ? 'CREATE' : 'ADD'

  return (
    <div className={cn(classes.modal, !open && 'hidden')}>
      <h2>{title}</h2>
      <button type="button" className={classes.modalCloseBtn} onClick={onClose}>
        <CloseIcon />
      </button>
      <div>
        <p>name</p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <span className={classes.modalAlert}>{nameAlert}</span>
      </div>
      <div>
        <p>url</p>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        <span className={classes.modalAlert}>{urlAlert}</span>
      </div>
      <button type="button" className={classes.modalSubmitBtn} onClick={submit}>
        {submitLabel}
      </button>
    </div>
  )
}
