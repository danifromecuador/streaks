import CloseIcon from '@mui/icons-material/Close'
import { Store } from '../../store/Store'
import './Confirmations.css'

export const DeleteConfirmation = () => {
  const store = Store()
  const streakOrShortcutToDelete = store.streaks.find(streak => streak.id === store.streakIdToDelete) ||
    store.shortcuts.find(shortcut => shortcut.id === store.shortcutIdToDelete)
  let streakOrShortcut = ''
  if (store.streakIdToDelete) streakOrShortcut = 'streak'
  if (store.shortcutIdToDelete) streakOrShortcut = 'shortcut'

  const deleteBtn = () => {
    if (store.streakIdToDelete) store.deleteStreak()
    if (store.shortcutIdToDelete) store.deleteShortcut()
  }

  const closeBtn = () => {
    store.setStreakIdToDelete(null)
    store.setShortcutIdToDelete(null)
  }

  return (
    <div className={`confirmations`}>
      <h2>Are you sure to delete {streakOrShortcut} {streakOrShortcutToDelete.name}?</h2>
      <button className='btn close-btn' onClick={closeBtn}><CloseIcon /></button>
      {store.streakIdToDelete && <p className='warning'>You will lost your streak!</p>}
      <div className='delete-cancel-btns'>
        <button className='btn delete' onClick={deleteBtn}>DELETE</button>
      </div >
    </div >
  )
}