import { useEffect, useRef } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { cn, classes } from '../../classes'

/** Confirmation dialog before deleting a streak or bookmark. type sets the warning copy; onConfirm performs the delete. */
export const DeleteConfirmation = ({ open, onClose, nameToDelete, onConfirm, type }) => {
  const confirmBtnRef = useRef(null)
  const warning = type === 'streak' ? 'You will lose your streak!' : 'This bookmark will be removed'

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => confirmBtnRef.current?.focus(), 0)
      return () => clearTimeout(t)
    }
  }, [open])

  return (
    <div className={cn(classes.modalOverlay, !open && 'hidden')} onClick={onClose}>
      <div
        className={classes.modal}
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-desc"
      >
        <h2 id="delete-dialog-title">Are you sure to delete {nameToDelete}?</h2>
        <button type="button" className={classes.modalCloseBtn} onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>
        <p id="delete-dialog-desc" className={classes.modalAlert}>
          {warning}
        </p>
        <div className={cn(classes.modalActions, 'justify-center')}>
          <button type="button" ref={confirmBtnRef} className={classes.modalSubmitBtn} onClick={onConfirm}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  )
}
