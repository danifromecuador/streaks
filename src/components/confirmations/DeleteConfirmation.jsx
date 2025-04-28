import { Store } from '../../store/Store'
import './Confirmations.css'

export const DeleteConfirmation = () => {
  const store = Store()
  const visibility = store.visible3 ? "" : "hide"
  const deleteStreak = () => {
    store.deleteStreak()
    store.toggleVisible3()
  }

  return (
    <div className={`confirmations ${visibility}`}>
      <h2>Are you sure to delete this Streak?</h2>
      <button className='btn close-btn' onClick={() => store.toggleVisible3()}>X</button>
      <span>You will lost your streak!</span>
      <button className='btn' onClick={deleteStreak}>DELETE</button>
      <button className='btn' onClick={() => store.toggleVisible3()}>CANCEL</button>
    </div>
  )
}