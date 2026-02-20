import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/DeleteOutline'

export const LinkCard = ({ name, image, url, onDelete }) => {
  const [visible, setVisible] = useState('hidden')

  return (
    <div
      className="w-[6vw] aspect-[10/13] flex flex-col justify-between items-center relative"
      onMouseEnter={() => setVisible('')}
      onMouseLeave={() => setVisible('hidden')}
    >
      <a className="w-full flex justify-center items-center" href={url} target="_blank" rel="noopener noreferrer">
        <img className="w-full aspect-square rounded-[calc((1vw+1vh)/3)]" src={image} alt={name} />
      </a>
      <button
        type="button"
        className={`btn cursor-pointer w-[25%] aspect-square absolute top-0 left-0 border-none flex justify-center items-center ${visible}`}
        onClick={onDelete}
      >
        <DeleteIcon sx={{ fontSize: 'calc((1.5vw + 1.5vh)/1.5)' }} />
      </button>
      <span className="w-[130%] text-center whitespace-nowrap overflow-hidden text-ellipsis text-[1vw]">{name}</span>
    </div>
  )
}
