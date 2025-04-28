import { useState } from 'react'
import { Store } from '../../store/Store'
import './Streak.css'

export const Streak = ({ name, image, url }) => {
  const store = Store()
  const [visible, setVisible] = useState('hide')
  const deleteStreak = () => {
    store.setStreakNameToDelete(name)
    // show delete streak dialog and hide other dialogs
    store.toggleVisible3()
    store.visible2 && store.toggleVisible2()
  }

  return (
    <div className='streak' onMouseEnter={() => setVisible('')} onMouseLeave={() => setVisible('hide')}>
      <a className='streak-container' href={`https://${url}`} target="_blank" rel='noopener noreferrer'>
        <img className='streak-bg' src={image} alt={name} />
      </a>
      <button className={`btn streak-edit-btn ${visible}`}>E</button>
      <button className={`btn streak-delete-btn ${visible}`} onClick={deleteStreak}>D</button>
      <span>{name}</span>
    </div>
  )
}