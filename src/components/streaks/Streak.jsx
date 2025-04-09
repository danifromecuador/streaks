import './Streak.css'

export const Streak = () => {
  return (
    <div className='streak'>
      <a className='streak-container' href="https://i.imgur.com/dqz5lqQ.jpeg"  target="_blank" >
        <img className='streak-bg' src="https://i.imgur.com/dqz5lqQ.jpeg" alt="" />
      </a>
      <button className='btn streak-edit-btn'>E</button>
      <button className='btn streak-delete-btn'>D</button>
    </div>
  )
}