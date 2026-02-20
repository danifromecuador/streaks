import CloseIcon from '@mui/icons-material/Close'
import { useStreakStore } from '../../store/streaks'
import { useBookmarkStore } from '../../store/bookmarks'
import { cn, classes } from '../../classes'

export const DeleteConfirmation = ({ type }) => {
  const isStreak = type === 'streak'
  const streakStore = useStreakStore()
  const bookmarkStore = useBookmarkStore()
  const store = isStreak ? streakStore : bookmarkStore
  const visible = store.deleteModalOpen
  const nameToDelete = store.nameToDelete

  const onConfirm = () => {
    if (isStreak) streakStore.deleteStreak()
    else bookmarkStore.deleteBookmark()
    store.toggleDeleteModal()
  }

  const onClose = () => store.toggleDeleteModal()
  const warning = isStreak ? 'You will lost your streak!' : 'This bookmark will be removed.'

  return (
    <div className={cn(classes.modal, !visible && 'hidden')}>
      <h2>Are you sure to delete {nameToDelete}?</h2>
      <button type="button" className={classes.modalCloseBtn} onClick={onClose}>
        <CloseIcon />
      </button>
      <p className={classes.modalAlert}>{warning}</p>
      <div className={classes.modalActions}>
        <button type="button" className={classes.modalSubmitBtn} onClick={onConfirm}>
          DELETE
        </button>
        <button type="button" className={classes.modalSubmitBtn} onClick={onClose}>
          CANCEL
        </button>
      </div>
    </div>
  )
}
