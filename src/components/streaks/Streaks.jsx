import { useState } from 'react'
import { Store } from '../../store/Store'
import { Streak } from './Streak'

export const Streaks = () => {
  const store = Store()
  const streaks = store.streaks
  const [visible, setVisible] = useState('hidden')

  const addStreak = () => {
    // show add streak dialog and close other open dialogs
    store.toggleVisible2()
    store.visible3 && store.toggleVisible3()
  }

  return (
    <div className="w-full aspect-[10/1] border border-[calc((1vw+1vh)/10)] border-[#8fc9b9] rounded-[calc((1vw+1vh)/1.5)] flex justify-center items-center" onMouseEnter={() => setVisible(streaks.length < 10 ? '' : 'hidden')} onMouseLeave={() => setVisible('hidden')}>
      <div className="w-fit relative flex items-center gap-[2vw]">
        {streaks.map((e, k) => (
          <Streak name={e.name} image={e.image} url={e.url} key={k} />
        ))}
        <button className={`btn cursor-pointer w-[4vw] aspect-square absolute right-[-7vw] border-none rounded-[calc((1vw+1vh)/3)] text-[calc((1vw+1vh)/0.5)] flex justify-center items-center ${visible}`} onClick={addStreak}>+</button>
      </div>
    </div>
  )
}