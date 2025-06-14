import CloseIcon from '@mui/icons-material/Close';
import { Store } from '../../store/Store'
import './Confirmations.css'

export const DeleteConfirmation = () => {
  const store = Store()
  const visibility = store.visible3 ? "" : "hide"
  const deleteStreak = () => {
    store.deleteStreak()
    store.setStreakIdToDelete(0)
    store.toggleVisible3()
  }

  return (
    <div className={`confirmations ${visibility}`}>
      <h2>Are you sure to delete {store.streakNameToDelete}?</h2>
      <button className='btn close-btn' onClick={() => store.toggleVisible3()}><CloseIcon /></button>
      <p className='warning'>You will lost your streak!</p>
      <div className='delete-cancel-btns'>
        <button className='btn delete' onClick={deleteStreak}>DELETE</button>
        <button className='btn cancel' onClick={() => store.toggleVisible3()}>CANCEL</button>
      </div >
    </div >
  )
}