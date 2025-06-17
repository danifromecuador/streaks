import { useState } from 'react'
import { Store } from '../../store/Store'
import { Streak } from './Streak'
import './Streaks.css'

export const Streaks = () => {
  const store = Store()
  const streaks = store.streaks
  const [visible, setVisible] = useState('hide')

  const addStreak = () => {
    !store.visible2 && store.toggleVisible2() // show create streak dialog
    store.setStreakIdToEdit(null) // hide edit streak dialog
    store.setStreakIdToDelete(null) // hide delete streak dialog
  }

  return (
    <div className='streaks' onMouseEnter={() => setVisible(`${streaks.length < 10 ? '' : 'hide'}`)} onMouseLeave={() => setVisible('hide')} >
      <div className="streaks-list">
        <button className={`btn add-streak-btn ${visible}`} onClick={addStreak}>+</button>
      </div>
    </div>
  )
}