import { useState } from 'react'
import { Store } from '../../store/Store'
import './Confirmations.css'

export const CreateConfirmation = () => {
  const store = Store()
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")

  const addStreak = () => {
    const urlDomain = url.split(".")[1]
    const getDomainIcon = `https://icons.duckduckgo.com/ip3/${urlDomain}.com.ico`
    const data = {
      name: name,
      image: getDomainIcon,
      url: url
    }
    store.addStreak(data)
  }

  return (
    <div className='confirmations'>
      <h2>Create new Streak</h2>
      <div>
        <p>name</p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <p>url</p>
        <input type="text" value={url} onChange={((e) => setUrl(e.target.value))} />
      </div>
      <button type="submit" onClick={() => addStreak()}>Create</button>
    </div >
  )
}