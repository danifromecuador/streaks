import { useState } from 'react'
import { Store } from '../../store/Store'
import { Streak } from './Streak'
import './Streaks.css'

export const Streaks = () => {
  const store = Store()
  const streaks = store.streaks
  const [visible, setVisible] = useState('hide')

  return (
    <div className='streaks' onMouseEnter={() => setVisible('')} onMouseLeave={() => setVisible('hide')} >
      <div className="streaks-list">
        {streaks.map((e) => (
          <Streak name={e.name} image={e.image} url={e.url} />
        ))}
        <button className={`btn add-streak-btn ${visible}`} onClick={() => store.toggleVisible2()}>+</button>
      </div>
    </div>
  )
}