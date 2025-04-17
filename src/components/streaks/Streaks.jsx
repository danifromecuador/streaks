import { useState } from 'react'
import { Streak } from './Streak'
import './Streaks.css'

export const Streaks = () => {
  const [visible, setVisible] = useState('hide')

  return (
    <div className='streaks' onMouseEnter={() => setVisible('')} onMouseLeave={() => setVisible('hide')} >
      <Streak />
      <Streak />
      <Streak />
      <Streak />
      <button className={`btn add-streak-btn streak ${visible}`}>+</button>
    </div>
  )
}