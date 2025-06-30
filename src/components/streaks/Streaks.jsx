import { useState } from 'react'
import { Store } from '../../store/Store'
import { Streak } from './Streak'
import './Streaks.css'

export const Streaks = ({ className }) => {
  const store = Store()
  const streaks = store.streaks
  const [visible, setVisible] = useState('hide')

  const addStreak = () => {
    !store.visible2 && store.toggleVisible2() // show create streak dialog
    store.setStreakIdToEdit(null) // logic to hide edit streak dialog
    store.setStreakIdToDelete(null) // logic to hide delete streak dialog
  }

  const mouseEnter = () => {
    className ? setVisible(`${streaks.length < 60 ? '' : 'hide'}`) : setVisible(`${streaks.length < 10 ? '' : 'hide'}`)
  }

  return (
    <div className={`streaks ${className}`} onMouseEnter={() => mouseEnter()} onMouseLeave={() => setVisible('hide')} >
      {streaks.map(e => (<Streak key={e.id} id={e.id} name={e.name} image={e.image} url={e.url} />))}
      <button className={`btn add-streak-btn ${visible}`} onClick={addStreak}>+</button>
    </div>
  )
}