import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/EditOutlined'
import { cn, classes } from '../classes'
import { DEFAULT_LINK_ICON } from '../utils/linkItemForm'

const iconSize = 'calc((1.5vw + 1.5vh)/1.5)'

/** Single link tile: image, label, external link. Shows delete and edit buttons on hover. */
export const LinkCard = ({ name, image, url, onDelete, onEdit }) => {
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
      <button type="button" className={cn(classes.linkCardActionBtn, 'left-0', visible)} onClick={onDelete}>
        <DeleteIcon sx={{ fontSize: iconSize, color: 'black' }} />
      </button>
      <button type="button" className={cn(classes.linkCardActionBtn, 'right-0', visible)} onClick={onEdit}>
        <EditIcon sx={{ fontSize: iconSize, color: 'black' }} />
      </button>
      <span className={classes.linkCardLabel}>{name}</span>
    </div>
  )
}
