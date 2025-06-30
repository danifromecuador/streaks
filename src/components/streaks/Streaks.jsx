import { useState, useEffect } from 'react'
import { Store } from '../../store/Store'
import { Streak } from './Streak'
import './Streaks.css'

export const Streaks = ({ type }) => {
  const store = Store()
  const streaks = store.streaks
  const [visible, setVisible] = useState('')

  const add = () => {
    if (type === 'streaks') {
      !store.visible2 && store.toggleVisible2() // show create streak dialog
      store.setStreakIdToEdit(null) // logic to hide edit streak dialog
      store.setStreakIdToDelete(null) // logic to hide delete streak dialog
    }
    if (type === 'shortcuts') {
      console.log(23)
    }
  }

  useEffect(() => {
    if (type === 'streaks') { setVisible(`${streaks.length < 11 ? '' : 'hide'}`) }
    if (type === 'shortcuts') { setVisible(`${streaks.length < 44 ? '' : 'hide'}`) }
  }, [type, streaks.length])

  return (
    <div className={type} >
      {streaks.map(e => (<Streak key={e.id} id={e.id} name={e.name} image={e.image} url={e.url} />))}
      <button className={`btn add-streak-btn ${visible}`} onClick={add}>+</button>
    </div>
  )
}