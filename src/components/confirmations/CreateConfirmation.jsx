import { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Store } from '../../store/Store'
import './Confirmations.css'

export const CreateConfirmation = () => {
  const store = Store()
  const visibility = store.visible2 ? "" : "hide"
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [nameAlert, setNameAlert] = useState("")
  const [urlAlert, setUrlAlert] = useState("")
  const eraseData = () => (setName(""), setUrl(""))
  const eraseAlerts = () => (setNameAlert(""), setUrlAlert(""))

  const validateStreak = () => {
    eraseAlerts()
    if (!name.trim()) {
      setNameAlert("Enter a name")
      return false
    }
    if (!url.trim()) {
      setUrlAlert("Enter a URL")
      return false
    }
    return true
  }

  const add = () => {
    if (validateStreak()) {
      const data = {
        id: Date.now(),
        name: name.trim(),
        image: `https://icons.duckduckgo.com/ip3/${url.split(".")[1]}.com.ico`,
        url: url.trim()
      }
      store.streakOrShortcut === 'streak' && store.addStreak(data)
      store.streakOrShortcut === 'shortcut' && store.addShortcut(data)
      eraseData()
      eraseAlerts()
      store.toggleVisible2()
    }
  }

  const closeBtn = () => {
    store.toggleVisible2()
    eraseData()
    eraseAlerts()
  }

  useEffect(() => localStorage.setItem("streaks", JSON.stringify(store.streaks)), [store.streaks])
  useEffect(() => localStorage.setItem("shortcuts", JSON.stringify(store.shortcuts)), [store.shortcuts])

  return (
    <div className={`confirmations ${visibility}`}>
      <h2>Create new {store.streakOrShortcut}</h2>
      <button className='btn close-btn' onClick={closeBtn}><CloseIcon /></button>
      <div>
        <p>name</p>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <span className='warning'>{nameAlert}</span>
      </div>
      <div>
        <p>url</p>
        <input type="text" value={url} onChange={(e => setUrl(e.target.value))} />
        <span className='warning'>{urlAlert}</span>
      </div>
      <button type="submit" className='btn create' onClick={add}>CREATE</button>
    </div >
  )
}