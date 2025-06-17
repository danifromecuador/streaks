import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Store } from '../../store/Store'
import './Confirmations.css'

export const EditConfirmation = () => {
  const store = Store()
  const streakToEdit = store.streaks.find(streak => streak.id === store.streakIdToEdit)
  const [name, setName] = useState(streakToEdit.name)
  const [nameAlert, setNameAlert] = useState("")

  const validateStreak = () => {
    setNameAlert("")
    if (!name.trim()) {
      setNameAlert("Enter a name")
      return false
    }
    return true
  }

  const saveEditedStreak = () => {
    if (validateStreak()) {
      store.saveEditedStreak(name.trim())
      localStorage.setItem("streaks", JSON.stringify(store.streaks))
    }
  }

  return (
    <div className={`confirmations`}>
      <h2>Edit {streakToEdit.name} Streak</h2>
      <button className='btn close-btn' onClick={() => store.setStreakIdToEdit(null)}><CloseIcon /></button>
      <div>
        <p>name</p>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <span className='warning'>{nameAlert}</span>
      </div>
      <button type="submit" className='btn create' onClick={saveEditedStreak}>SAVE</button>
    </div>
  )
}