import { Streak } from './Streak'
import './Streaks.css'

export const Streaks = () => {
  return (
    <div className='streaks'>
      <div className="streaks-list">
        <Streak />
        <Streak />
        <Streak />
      </div>
      <button className='btn add-streak-btn'>+</button>
    </div>
  )
}