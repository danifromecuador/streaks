import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Store } from '../../store/Store'
import './Confirmations.css'

export const EditConfirmation = () => {
  const store = Store()
  const streakOrShortcutToEdit = store.streaks.find(streak => streak.id === store.streakIdToEdit) ||
    store.shortcuts.find(shortcut => shortcut.id === store.shortcutIdToEdit)
  let streakOrShortcut = ''
  if (store.streakIdToEdit) streakOrShortcut = 'streak'
  if (store.shortcutIdToEdit) streakOrShortcut = 'shortcut'
  const [name, setName] = useState(streakOrShortcutToEdit.name)
  const [url, setUrl] = useState(streakOrShortcutToEdit.url)
  const [nameAlert, setNameAlert] = useState("")
  const [urlAlert, setUrlAlert] = useState("")

  const validate = () => {
    setNameAlert("")
    if (!name.trim()) {
      setNameAlert("Enter a name")
      return false
    }
    if (!url.trim()) {
      setUrlAlert("Enter a URL")
      return false
    }
    try {
      new URL(url).hostname
    }
    catch {
      setUrlAlert("Invalid URL format (copy and paste from the address bar)")
      return false
    }
    return true
  }

  const saveEdited = () => {
    if (validate()) {
      if (streakOrShortcut === 'streak') {
        store.saveEditedStreak(name.trim())
        localStorage.setItem("streaks", JSON.stringify(store.streaks))
      }
      if (streakOrShortcut === 'shortcut') {
        const domain = new URL(url.trim()).hostname
        const data = {
          name: name.trim(),
          image: `https://images.weserv.nl/?url=logo.clearbit.com/${domain}`,
          url: url.trim()
        }
        store.saveEditedShortcut(data)
        localStorage.setItem("shortcuts", JSON.stringify(store.shortcuts))
      }
    }
  }

  const enterKey = event => {
    if (event.key === 'Enter') saveEdited()
  }

  const closeBtn = () => {
    store.setStreakIdToEdit(null)
    store.setShortcutIdToEdit(null)
  }

  return (
    <div className={`confirmations`} onKeyDown={enterKey}>
      <h2>Edit {streakOrShortcut} {streakOrShortcutToEdit.name}</h2>
      <button className='btn close-btn' onClick={closeBtn}><CloseIcon /></button>
      <div>
        <p>name</p>
        <input type="text" value={name} autoFocus onChange={e => setName(e.target.value)} />
        <span className='warning'>{nameAlert}</span>
      </div>
      {(streakOrShortcut === 'shortcut') && <div>
        <p>url</p>
        <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
        <span className='warning'>{urlAlert}</span>
      </div>}
      <button type="submit" className='btn create' onClick={saveEdited}>SAVE</button>
    </div>
  )
}