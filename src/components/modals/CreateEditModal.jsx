import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useStreakStore } from '../../store/streaks'
import { useBookmarkStore } from '../../store/bookmarks'
import { cn, classes } from '../../classes'

const getDomainIcon = (url) => {
  try {
    const part = url.trim().split('.')[1]
    return part ? `https://icons.duckduckgo.com/ip3/${part}.com.ico` : ''
  } catch {
    return ''
  }
}

export const CreateEditModal = ({ mode }) => {
  const isStreak = mode === 'streak'
  const streakStore = useStreakStore()
  const bookmarkStore = useBookmarkStore()
  const store = isStreak ? streakStore : bookmarkStore
  const visible = store.createModalOpen

  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [nameAlert, setNameAlert] = useState('')
  const [urlAlert, setUrlAlert] = useState('')
  const eraseData = () => (setName(''), setUrl(''))
  const eraseAlerts = () => (setNameAlert(''), setUrlAlert(''))

  const submit = () => {
    eraseAlerts()
    if (!name.trim().length) setNameAlert('Enter a name')
    if (!url.trim().length) setUrlAlert('Enter a URL')
    if (name.trim().length && url.trim().length) {
      const image = getDomainIcon(url)
      const item = { name: name.trim(), image, url: url.trim() }
      if (isStreak) streakStore.addStreak(item)
      else bookmarkStore.addBookmark(item)
      eraseData()
      eraseAlerts()
      store.toggleCreateModal()
    }
  }

  const close = () => store.toggleCreateModal()
  const title = isStreak ? 'Create new Streak' : 'Add bookmark'

  return (
    <div className={cn(classes.modal, !visible && 'hidden')}>
      <h2>{title}</h2>
      <button type="button" className={classes.modalCloseBtn} onClick={close}>
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
        {isStreak ? 'CREATE' : 'ADD'}
      </button>
    </div>
  )
}
