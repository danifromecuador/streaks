import { CreateConfirmation } from '../confirmations/CreateConfirmation'
import { DeleteConfirmation } from '../confirmations/DeleteConfirmation'

export const Grid = () => {
  return (
    <div className="w-full h-full border border-[calc((1vw+1vh)/10)] border-[#8fc9b9] rounded-[calc((1vw+1vh)/1.5)]">
      <div className="grid-container"> 1 2 3</div>
      <CreateConfirmation />
      <DeleteConfirmation />
    </div>
  )
}