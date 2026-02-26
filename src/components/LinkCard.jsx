import { useState, useMemo, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/EditOutlined'
import { cn, classes } from '../classes'
import { DEFAULT_LINK_ICON, getDomainIconUrls } from '../utils/linkItemForm'

const iconSize = 'calc((1.5vw + 1.5vh)/1.5)'
const MIN_ICON_SIZE = 64

/** Single link tile: image, label, external link. Shows delete and edit buttons on hover. Optional drag props enable reorder. Tries icon providers in order; on error or low-res (naturalWidth < MIN_ICON_SIZE) falls back to next provider. */
export const LinkCard = ({ name, image, url, onDelete, onEdit, id, index, onDragStart, onDragOver, onDrop, onDragEnd, isDragging }) => {
  const [visible, setVisible] = useState('hidden')
  const [iconIndex, setIconIndex] = useState(0)
  const [useDefaultIcon, setUseDefaultIcon] = useState(false)
  const iconUrls = useMemo(() => getDomainIconUrls(url ?? ''), [url])
  useEffect(() => {
    setIconIndex(0)
    setUseDefaultIcon(false)
  }, [url])
  const imgSrc = useDefaultIcon || !iconUrls.length
    ? DEFAULT_LINK_ICON
    : iconUrls[iconIndex] ?? DEFAULT_LINK_ICON
  const isDraggable = typeof index === 'number' && onDragStart && onDragOver && onDrop && onDragEnd

  const tryNextProvider = () => {
    if (iconIndex < iconUrls.length - 1) setIconIndex((i) => i + 1)
    else setUseDefaultIcon(true)
  }

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
          onError={() => {
            tryNextProvider()
          }}
          onLoad={(e) => {
            if (e.target.naturalWidth < MIN_ICON_SIZE && iconIndex < iconUrls.length - 1) {
              tryNextProvider()
            }
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
