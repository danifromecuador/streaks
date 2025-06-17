import { useState } from 'react'
import { Store } from '../../store/Store'
import { Streak } from './Streak'
import './Streaks.css'

export const Streaks = () => {
  const store = Store()
  const streaks = store.streaks
  const [visible, setVisible] = useState('hide')

  const addStreak = () => {
    // show add streak dialog and close other open dialogs
    !store.visible2 && store.toggleVisible2()
    store.visible3 && store.toggleVisible3()
    store.visible4 && store.toggleVisible4()
  }

  return (
    <div className='streaks' onMouseEnter={() => setVisible(`${streaks.length < 10 ? '' : 'hide'}`)} onMouseLeave={() => setVisible('hide')} >
      <div className="streaks-list">
        {streaks.map(e => (
          <Streak key={e.id} id={e.id} name={e.name} image={e.image} url={e.url} />
        ))}
        <button className={`btn add-streak-btn ${visible}`} onClick={addStreak}>+</button>
      </div>
    </div>
  )
}