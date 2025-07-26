import { useState, useRef, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Store } from '../../store/Store'
import './Confirmations.css'

export const CreateConfirmation = () => {
  const store = Store()
  const visibility = store.visible2 ? "" : "hide"
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [nameAlert, setNameAlert] = useState("")
  const [urlAlert, setUrlAlert] = useState("")
  const nameInputRef = useRef(null)

  const eraseData = () => (setName(""), setUrl(""))
  const eraseAlerts = () => (setNameAlert(""), setUrlAlert(""))

  const validate = () => {
    eraseAlerts()
    if (!name.trim()) {
      setNameAlert("Enter a name")
      return false
    }
    if (!url.trim()) {
      setUrlAlert("Enter a URL")
      return false
    }
    try {
      new URL(url).hostname
    }
    catch {
      setUrlAlert("Invalid URL format (copy and paste from the address bar)")
      return false
    }
    return true
  }

  const add = () => {
    if (validate()) {
      const domain = new URL(url.trim()).hostname
      const data = {
        id: Date.now(),
        name: name.trim(),
        image: `https://images.weserv.nl/?url=logo.clearbit.com/${domain}`,
        url: url.trim()
      }
      if (store.streakOrShortcut === 'streak') {
        store.addStreak(data)
        localStorage.setItem("streaks", JSON.stringify(store.streaks))
      }
      if (store.streakOrShortcut === 'shortcut') {
        store.addShortcut(data)
        localStorage.setItem("shortcuts", JSON.stringify(store.shortcuts))
      }
      eraseData()
      eraseAlerts()
      store.toggleVisible2()
    }
  }

  const enterKey = event => {
    if (event.key === 'Enter') add()
  }

  const closeBtn = () => {
    store.toggleVisible2()
    eraseData()
    eraseAlerts()
  }

  useEffect(() => {
    if (store.visible2 && nameInputRef.current) nameInputRef.current.focus()
  }, [store.visible2])

  return (
    <div className={`confirmations ${visibility}`} onKeyDown={enterKey}>
      <h2>Create new {store.streakOrShortcut}</h2>
      <button className='btn close-btn' onClick={closeBtn}><CloseIcon /></button>
      <div>
        <p>name</p>
        <input type="text" value={name} ref={nameInputRef} onChange={e => setName(e.target.value)} />
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