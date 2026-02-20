import CloseIcon from '@mui/icons-material/Close'
import { useStreakStore } from '../../store/streaks'
import { useBookmarkStore } from '../../store/bookmarks'

export const DeleteConfirmation = ({ type }) => {
  const isStreak = type === 'streak'
  const streakStore = useStreakStore()
  const bookmarkStore = useBookmarkStore()
  const store = isStreak ? streakStore : bookmarkStore
  const visibility = store.deleteModalOpen ? '' : 'hidden'
  const nameToDelete = store.nameToDelete

  const onConfirm = () => {
    if (isStreak) streakStore.deleteStreak()
    else bookmarkStore.deleteBookmark()
    store.toggleDeleteModal()
  }

  const onClose = () => store.toggleDeleteModal()

  const warning = isStreak ? 'You will lost your streak!' : 'This bookmark will be removed.'

  return (
    <div className={`w-fit h-fit p-[calc((1vw+1vh)/0.5)] rounded-[calc((1vw+1vh)/3)] relative mx-auto bg-[#171f25] flex flex-col gap-[1vw] ${visibility}`}>
      <h2>Are you sure to delete {nameToDelete}?</h2>
      <button
        type="button"
        className="btn cursor-pointer w-[2vw] aspect-square absolute top-[calc((1vw+1vh)/3)] right-[calc((1vw+1vh)/3)] flex justify-center items-center"
        onClick={onClose}
      >
        <CloseIcon />
      </button>
      <p className="text-[#c90a02] ml-[1vw]">{warning}</p>
      <div className="flex gap-[1vw]">
        <button type="button" className="btn cursor-pointer w-fit mt-[3vh] px-[0.5vw]" onClick={onConfirm}>
          DELETE
        </button>
        <button type="button" className="btn cursor-pointer w-fit mt-[3vh] px-[0.5vw]" onClick={onClose}>
          CANCEL
        </button>
      </div>
    </div>
  )
}
