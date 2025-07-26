import { useState, useEffect } from 'react'
import { Store } from '../../store/Store'
import { Streak } from './Streak'
import './Streaks.css'

export const Streaks = ({ type }) => {
  const store = Store()
  let streaksOrShortcutsArray = store[type]
  const [visible, setVisible] = useState('')

  const add = () => {
    !store.visible2 && store.toggleVisible2() // show create dialog
    store.setStreakIdToEdit(null) // logic to hide edit streak dialog
    store.setStreakIdToDelete(null) // logic to hide delete streak dialog
    store.setStreakOrShortcut(type.slice(0, -1)) // set type for rendering properly the create dialog 
  }

  useEffect(() => {
    if (type === 'streaks') { setVisible(`${streaksOrShortcutsArray.length < 10 ? '' : 'hide'}`) }
    if (type === 'shortcuts') { setVisible(`${streaksOrShortcutsArray.length < 40 ? '' : 'hide'}`) }
  }, [type, streaksOrShortcutsArray.length])

  useEffect(() => {
    localStorage.setItem("streaks", JSON.stringify(store.streaks))
    localStorage.setItem("shortcuts", JSON.stringify(store.shortcuts))
  }, [store.streaks, store.shortcuts])

  return (
    <div className={type} >
      {streaksOrShortcutsArray.map(e => (<Streak key={e.id} id={e.id} name={e.name} image={e.image} url={e.url} type={type} />))}
      <div className={`${visible} streak`}>
        <button className={`btn add-streak-btn ${visible}`} onClick={add}>+</button>
        <span className='invisible-filler'>Invisible filler</span>
      </div>
    </div>
  )
}