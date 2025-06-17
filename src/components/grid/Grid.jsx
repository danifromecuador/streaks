import { Store } from '../../store/Store'
import { CreateConfirmation } from '../confirmations/CreateConfirmation'
import { EditConfirmation } from '../confirmations/EditConfirmation'
import { DeleteConfirmation } from '../confirmations/DeleteConfirmation'
import './Grid.css'

export const Grid = () => {
  const store = Store()
  return (
    <div className='grid'>
      <div className="grid-container"> 1 2 3</div>
      <CreateConfirmation />
      {store.streakIdToEdit && <EditConfirmation />}
      {store.streakIdToDelete && <DeleteConfirmation />}
    </div>
  )
}