import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { Store } from '../../store/Store'
import './Streak.css'

export const Streak = ({ id, name, image, url }) => {
  const store = Store()
  const [visible, setVisible] = useState('hide')

  const editStreak = () => {
    // here we aren't editing the streak, just setting the id to the streak that is going to be edited
    // real edition of that streak takes place on edit confirmation dialog
    store.setStreakIdToEdit(id)
    store.visible2 && store.toggleVisible2()
    store.visible3 && store.toggleVisible3()
    !store.visible4 && store.toggleVisible4()
  }

  const deleteStreak = () => {
    // here we aren't deleting the streak, just setting the id to the streak that is going to be deleted
    // real deletion of that streak takes place on delete confirmation dialog
    store.setStreakIdToDelete(id)
    // show delete streak dialog and hide other dialogs
    store.visible2 && store.toggleVisible2()
    !store.visible3 && store.toggleVisible3()
    store.visible4 && store.toggleVisible4()
  }

  return (
    <div className='streak' onMouseEnter={() => setVisible('')} onMouseLeave={() => setVisible('hide')}>
      <a className='streak-container' href={url} target="_blank" rel='noopener noreferrer'>
        <img className='streak-bg' src={image} alt={name} />
      </a>
      <button className={`btn streak-edit-btn ${visible}`} onClick={editStreak}><EditIcon sx={{ fontSize: '1.5vw' }} /></button>
      <button className={`btn streak-delete-btn ${visible}`} onClick={deleteStreak}><DeleteIcon sx={{ fontSize: '1.5vw' }} /></button>
      <span>{name}</span>
    </div>
  )
}