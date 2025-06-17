import CloseIcon from '@mui/icons-material/Close';
import { Store } from '../../store/Store'
import './Confirmations.css'

export const DeleteConfirmation = () => {
  const store = Store()
  const streakNameToDelete = store.streaks.find(streak => streak.id === store.streakIdToDelete).name

  return (
    <div className={`confirmations`}>
      <h2>Are you sure to delete {streakNameToDelete}?</h2>
      <button className='btn close-btn' onClick={() => store.setStreakIdToDelete(null)}><CloseIcon /></button>
      <p className='warning'>You will lost your streak!</p>
      <div className='delete-cancel-btns'>
        <button className='btn delete' onClick={() => store.deleteStreak()}>DELETE</button>
      </div >
    </div >
  )
}