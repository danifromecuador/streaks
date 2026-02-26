import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/EditOutlined'
import { cn, classes } from '../classes'
import { DEFAULT_LINK_ICON } from '../utils/linkItemForm'

const iconSize = 'calc((1.5vw + 1.5vh)/1.5)'

/** Single link tile: image, label, external link. Shows delete and edit buttons on hover. Optional drag props enable reorder. */
export const LinkCard = ({ name, image, url, onDelete, onEdit, id, index, onDragStart, onDragOver, onDrop, onDragEnd, isDragging }) => {
  const [visible, setVisible] = useState('hidden')
  const imgSrc = image || DEFAULT_LINK_ICON
  const isDraggable = typeof index === 'number' && onDragStart && onDragOver && onDrop && onDragEnd

  return (
    <div
      className={cn(
        classes.linkCard,
        isDraggable && classes.linkCardDraggable,
        isDragging && classes.linkCardDragging
      )}
      draggable={isDraggable}
      onMouseEnter={() => setVisible('')}
      onMouseLeave={() => setVisible('hidden')}
      onDragStart={isDraggable ? (e) => { e.dataTransfer.setData('text/plain', id); e.dataTransfer.effectAllowed = 'move'; onDragStart(); } : undefined}
      onDragOver={isDraggable ? (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; onDragOver(index); } : undefined}
      onDrop={isDraggable ? (e) => { e.preventDefault(); onDrop(index); } : undefined}
      onDragEnd={isDraggable ? onDragEnd : undefined}
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
        <DeleteIcon sx={{ fontSize: iconSize, color: 'white' }} />
      </button>
      <button type="button" className={cn(classes.linkCardActionBtn, 'right-0', visible)} onClick={onEdit}>
        <EditIcon sx={{ fontSize: iconSize, color: 'white' }} />
      </button>
      <span className={classes.linkCardLabel}>{name}</span>
    </div>
  )
}
