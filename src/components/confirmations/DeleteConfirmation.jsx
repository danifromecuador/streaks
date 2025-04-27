import { Store } from '../../store/Store'
import './Confirmations.css'

export const DeleteConfirmation = () => {
  const store = Store()
  const visibility = store.visible3 ? "" : "hide"

  return (
    <div className={`confirmations ${visibility}`}>
      <h2>Are you sure to delete this Streak?</h2>
      <button className='btn close-btn' onClick={() => store.toggleVisible3()}>X</button>
      <span>You will lost your streak!</span>
      <button>DELETE</button>
      <button>CANCEL</button>
    </div>
  )
}