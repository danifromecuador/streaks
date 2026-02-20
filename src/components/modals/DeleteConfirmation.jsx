import CloseIcon from '@mui/icons-material/Close'
import { cn, classes } from '../../classes'

/** Confirmation dialog before deleting a streak or bookmark. type sets the warning copy; onConfirm performs the delete. */
export const DeleteConfirmation = ({ open, onClose, nameToDelete, onConfirm, type }) => {
  const warning = type === 'streak' ? 'You will lost your streak!' : 'This bookmark will be removed'

  return (
    <div className={cn(classes.modalOverlay, !open && 'hidden')}>
      <div className={classes.modal}>
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
    </div>
  )
}
