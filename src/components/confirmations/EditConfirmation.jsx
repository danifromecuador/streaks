import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
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
  const [nameAlert, setNameAlert] = useState("")

  const validate = () => {
    setNameAlert("")
    if (!name.trim()) {
      setNameAlert("Enter a name")
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
        store.saveEditedShortcut(name.trim())
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
      <button type="submit" className='btn create' onClick={saveEdited}>SAVE</button>
    </div>
  )
}