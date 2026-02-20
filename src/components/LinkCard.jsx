import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/DeleteOutline'
import { cn, classes } from '../classes'
import { DEFAULT_LINK_ICON } from '../utils/linkItemForm'

/** Single link tile: image, label, external link. Shows delete button on hover; onDelete is called when it is clicked. */
export const LinkCard = ({ name, image, url, onDelete }) => {
  const [visible, setVisible] = useState('hidden')
  const imgSrc = image || DEFAULT_LINK_ICON

  return (
    <div
      className={classes.linkCard}
      onMouseEnter={() => setVisible('')}
      onMouseLeave={() => setVisible('hidden')}
    >
      <a className={classes.linkCardLink} href={url} target="_blank" rel="noopener noreferrer">
        <img
          className={classes.linkCardImg}
          src={imgSrc}
          alt={name}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = DEFAULT_LINK_ICON
          }}
        />
      </a>
      <button type="button" className={cn(classes.linkCardDeleteBtn, visible)} onClick={onDelete}>
        <DeleteIcon sx={{ fontSize: 'calc((1.5vw + 1.5vh)/1.5)' }} />
      </button>
      <span className={classes.linkCardLabel}>{name}</span>
    </div>
  )
}
