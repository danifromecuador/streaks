import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/DeleteOutline'
import { cn, classes } from '../classes'

export const LinkCard = ({ name, image, url, onDelete }) => {
  const [visible, setVisible] = useState('hidden')

  return (
    <div
      className={classes.linkCard}
      onMouseEnter={() => setVisible('')}
      onMouseLeave={() => setVisible('hidden')}
    >
      <a className={classes.linkCardLink} href={url} target="_blank" rel="noopener noreferrer">
        <img className={classes.linkCardImg} src={image} alt={name} />
      </a>
      <button type="button" className={cn(classes.linkCardDeleteBtn, visible)} onClick={onDelete}>
        <DeleteIcon sx={{ fontSize: 'calc((1.5vw + 1.5vh)/1.5)' }} />
      </button>
      <span className={classes.linkCardLabel}>{name}</span>
    </div>
  )
}
