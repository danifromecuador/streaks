import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { Store } from '../../store/Store'
import './Streak.css'

export const Streak = ({ name, image, url }) => {
  const store = Store()
  const [visible, setVisible] = useState('hide')
  const deleteStreak = () => {
    store.setStreakNameToDelete(name)
    // show delete streak dialog and hide other dialogs
    !store.visible3 && store.toggleVisible3()
    store.visible2 && store.toggleVisible2()
  }

  return (
    <div className='streak' onMouseEnter={() => setVisible('')} onMouseLeave={() => setVisible('hide')}>
      <a className='streak-container' href={url} target="_blank" rel='noopener noreferrer'>
        <img className='streak-bg' src={image} alt={name} />
      </a>
      <button className={`btn streak-delete-btn ${visible}`} onClick={deleteStreak}><DeleteIcon sx={{ fontSize: 'calc((1.5vw + 1.5vh)/1.5)' }}/></button>
      <span>{name}</span>
    </div>
  )
}