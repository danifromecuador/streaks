import { useState } from 'react'
import './Streak.css'

export const Streak = ({name, image, url}) => {
  const [visible, setVisible] = useState('hide')
  return (
    <div className='streak' onMouseEnter={() => setVisible('')} onMouseLeave={() => setVisible('hide')}>
      <a className='streak-container' href={`https://${url}`} target="_blank" rel='noopener noreferrer'>
        <img className='streak-bg' src={image} alt={name} />
      </a>
      <button className={`btn streak-edit-btn ${visible}`}>E</button>
      <button className={`btn streak-delete-btn ${visible}`}>D</button>
      <span>{name}</span>
    </div>
  )
}