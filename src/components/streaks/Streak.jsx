import { useState } from 'react'
import './Streak.css'

export const Streak = () => {
  const [visible, setVisible] = useState('hide')
  return (
    <div className='streak' onMouseEnter={() => setVisible('')} onMouseLeave={() => setVisible('hide')}>
      <a className='streak-container' href="https://i.imgur.com/dqz5lqQ.jpeg" target="_blank" >
        <img className='streak-bg' src="https://i.imgur.com/dqz5lqQ.jpeg" alt="" />
      </a>
      <button className={`btn streak-edit-btn ${visible}`}>E</button>
      <button className={`btn streak-delete-btn ${visible}`}>D</button>
    </div>
  )
}