import CloseIcon from '@mui/icons-material/Close';
import { Store } from '../../store/Store'

export const DeleteConfirmation = () => {
  const store = Store()
  const visibility = store.visible3 ? '' : 'hidden'
  const deleteStreak = () => {
    store.deleteStreak()
    store.toggleVisible3()
  }

  return (
    <div className={`w-fit h-fit p-[calc((1vw+1vh)/0.5)] rounded-[calc((1vw+1vh)/3)] relative mx-auto bg-[#171f25] flex flex-col gap-[1vw] ${visibility}`}>
      <h2>Are you sure to delete {store.streakNameToDelete}?</h2>
      <button className="btn cursor-pointer w-[2vw] aspect-square absolute top-[calc((1vw+1vh)/3)] right-[calc((1vw+1vh)/3)] flex justify-center items-center" onClick={() => store.toggleVisible3()}><CloseIcon /></button>
      <p className="text-[#c90a02] ml-[1vw]">You will lost your streak!</p>
      <div className="flex gap-[1vw]">
        <button className="btn cursor-pointer w-fit mt-[3vh] px-[0.5vw] delete" onClick={deleteStreak}>DELETE</button>
        <button className="btn cursor-pointer w-fit mt-[3vh] px-[0.5vw] cancel" onClick={() => store.toggleVisible3()}>CANCEL</button>
      </div >
    </div >
  )
}