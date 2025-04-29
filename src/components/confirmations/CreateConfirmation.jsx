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

  const addStreak = () => {
    eraseAlerts()
    if (!name.trim().length) setNameAlert("Enter a name")
    if (!url.trim().length) setUrlAlert("Enter an URL")
    if (url.trim().length > 0 && !url.trim().includes("www.")) setUrlAlert("Enter a valid URL like www.example.com")
    if (name.trim().length && url.trim().length) {
      const urlDomain = url.split(".")[1]
      const getDomainIcon = `https://icons.duckduckgo.com/ip3/${urlDomain}.com.ico`
      store.addStreak({ name: name, image: getDomainIcon, url: url })
      eraseData()
      eraseAlerts()
      store.toggleVisible2()
    }
  }

  useEffect(() => localStorage.setItem("streaks", JSON.stringify(store.streaks)), [store.streaks])

  return (
    <div className={`confirmations ${visibility}`}>
      <h2>Create new Streak</h2>
      <button className='btn close-btn' onClick={() => store.toggleVisible2()}><CloseIcon /></button>
      <div>
        <p>name</p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <span className='warning'>{nameAlert}</span>
      </div>
      <div>
        <p>url</p>
        <input type="text" value={url} onChange={((e) => setUrl(e.target.value))} />
        <span className='warning'>{urlAlert}</span>
      </div>
      <button type="submit" className='btn create' onClick={() => addStreak()}>CREATE</button>
    </div >
  )
}