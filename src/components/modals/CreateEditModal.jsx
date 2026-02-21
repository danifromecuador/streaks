import { useEffect, useRef } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { cn, classes } from '../../classes'
import { getTitle, getSubmitLabel } from './createEditModalLabels'
import { useCreateEditForm } from '../../hooks/useCreateEditForm'

const NAME_ID = 'create-edit-name'
const URL_ID = 'create-edit-url'

/** Modal to create or edit a streak/bookmark. type: 'streak'|'bookmark', isEdit: boolean. initialItem for edit prefills form. onSubmit(item) is called with { name, image, url }. */
export const CreateEditModal = ({ open, onClose, onSubmit, type, isEdit = false, initialItem = null }) => {
  const firstInputRef = useRef(null)
  const { name, url, errors, setName, setUrl, submit } = useCreateEditForm(onSubmit, isEdit ? initialItem : null)
  const title = getTitle(type, isEdit)
  const submitLabel = getSubmitLabel(isEdit)

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => firstInputRef.current?.focus(), 0)
      return () => clearTimeout(t)
    }
  }, [open])

  const handleSubmit = (e) => {
    e.preventDefault()
    submit()
  }

  return (
    <div className={cn(classes.modalOverlay, !open && 'hidden')} onClick={onClose}>
      <div
        className={classes.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-edit-title"
      >
        <h2 id="create-edit-title">{title}</h2>
        <button type="button" className={classes.modalCloseBtn} onClick={onClose} aria-label="Cerrar">
          <CloseIcon />
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-[1vw]">
          <div>
            <label htmlFor={NAME_ID} className="block">
              name
            </label>
            <input
              id={NAME_ID}
              ref={firstInputRef}
              type="text"
              className={classes.modalInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            <span id="name-error" className={classes.modalAlert} role="alert">
              {errors.name}
            </span>
          </div>
          <div>
            <label htmlFor={URL_ID} className="block">
              url
            </label>
            <input
              id={URL_ID}
              type="text"
              className={classes.modalInput}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              autoComplete="off"
              aria-invalid={!!errors.url}
              aria-describedby={errors.url ? 'url-error' : undefined}
            />
            <span id="url-error" className={classes.modalAlert} role="alert">
              {errors.url}
            </span>
          </div>
          <div className="flex justify-center">
            <button type="submit" className={classes.modalSubmitBtn}>
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
