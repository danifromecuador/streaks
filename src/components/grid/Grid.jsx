import { CreateConfirmation } from '../confirmations/CreateConfirmation'
import { DeleteConfirmation } from '../confirmations/DeleteConfirmation'
import './Grid.css'

export const Grid = () => {
  return (
    <div className='grid'>
      <div className="grid-container"> 1 2 3</div>
      <CreateConfirmation />
      <DeleteConfirmation />
    </div>
  )
}