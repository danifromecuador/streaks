import CloseIcon from '@mui/icons-material/Close'
import { cn, classes } from '../../classes'
import { getTitle, getSubmitLabel } from './createEditModalLabels'
import { useCreateEditForm } from '../../hooks/useCreateEditForm'

/** Modal to create or edit a streak/bookmark. type: 'streak'|'bookmark', isEdit: boolean. onSubmit(item) is called with { name, image, url }. */
export const CreateEditModal = ({ open, onClose, onSubmit, type, isEdit = false }) => {
  const { name, url, errors, setName, setUrl, submit } = useCreateEditForm(onSubmit)
  const title = getTitle(type, isEdit)
  const submitLabel = getSubmitLabel(isEdit)

  return (
    <div className={cn(classes.modalOverlay, !open && 'hidden')}>
      <div className={classes.modal}>
      <h2>{title}</h2>
      <button type="button" className={classes.modalCloseBtn} onClick={onClose}>
        <CloseIcon />
      </button>
      <div>
        <p>name</p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <span className={classes.modalAlert}>{errors.name}</span>
      </div>
      <div>
        <p>url</p>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        <span className={classes.modalAlert}>{errors.url}</span>
      </div>
      <button type="button" className={classes.modalSubmitBtn} onClick={submit}>
        {submitLabel}
      </button>
      </div>
    </div>
  )
}
