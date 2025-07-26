import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutline'
import { Store } from '../../store/Store'
import './Streak.css'

export const Streak = ({ id, name, image, url, type }) => {
  const store = Store()
  const [visible, setVisible] = useState('hide')

  const edit = () => {
    // here we aren't editing, just setting the id to the streak or shortcut that is going to be edited
    // real edition takes place on edit confirmation dialog
    // show edit dialog and hide other dialogs
    store.visible2 && store.toggleVisible2()
    store.setStreakIdToEdit(null)
    store.setStreakIdToDelete(null)
    store.setShortcutIdToEdit(null)
    store.setShortcutIdToDelete(null)
    if (type === 'streaks') store.setStreakIdToEdit(id)
    if (type === 'shortcuts') store.setShortcutIdToEdit(id)
  }

  const deleteFn = () => {
    // here we aren't deleting the streak, just setting the id to the streak that is going to be deleted
    // real deletion of that streak takes place on delete confirmation dialog
    // show delete streak dialog and hide other dialogs
    store.visible2 && store.toggleVisible2()
    store.setStreakIdToEdit(null)
    store.setStreakIdToDelete(null)
    store.setShortcutIdToEdit(null)
    store.setShortcutIdToDelete(null)
    if (type === 'streaks') store.setStreakIdToDelete(id)
    if (type === 'shortcuts') store.setShortcutIdToDelete(id)
  }

  return (
    <div className='streak' onMouseEnter={() => setVisible('')} onMouseLeave={() => setVisible('hide')}>
      <a className='streak-container' href={url}>
        <img className='streak-bg' src={image} alt={name}
          onError={e => {
            const domain = new URL(url).hostname
            e.target.onerror = null
            e.target.src = `https://icons.duckduckgo.com/ip3/${domain}.ico`
          }}
        />
      </a>
      <button className={`btn streak-edit-btn ${visible}`} onClick={edit}><EditIcon sx={{ fontSize: '1.5vw' }} /></button>
      <button className={`btn streak-delete-btn ${visible}`} onClick={deleteFn}><DeleteIcon sx={{ fontSize: '1.5vw' }} /></button>
      <span>{name}</span>
    </div>
  )
}