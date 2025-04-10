import { useState } from 'react'
import { Streak } from './Streak'
import './Streaks.css'

export const Streaks = () => {
  const [visible, setVisible] = useState('hidden')

  return (
    <div className='streaks' onMouseEnter={() => setVisible('')} onMouseLeave={() => setVisible('hidden')} >
      <div className="streaks-list">
        <Streak />
        <Streak />
        <Streak />
      </div>
      <button className={`btn add-streak-btn ${visible}`}>+</button>
    </div>
  )
}