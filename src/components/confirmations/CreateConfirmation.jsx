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

  const ValidateStreak = () => {
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

  const addStreak = () => {
    if (ValidateStreak()) {
      const urlDomain = url.split(".")[1]
      const getDomainIcon = `https://icons.duckduckgo.com/ip3/${urlDomain}.com.ico`
      const id = Date.now()
      store.addStreak({ id: id, name: name, image: getDomainIcon, url: url })
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

  return (
    <div className={`confirmations ${visibility}`}>
      <h2>Create new Streak</h2>
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
      <button type="submit" className='btn create' onClick={addStreak}>CREATE</button>
    </div >
  )
}