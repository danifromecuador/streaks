import { useState } from 'react'
import { Store } from '../../store/Store'
import './Confirmations.css'

export const CreateConfirmation = () => {
  const store = Store()
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [nameAlert, setNameAlert] = useState("")
  const [urlAlert, setUrlAlert] = useState("")

  const addStreak = () => {
    setNameAlert("")
    setUrlAlert("")
    if (!name.trim().length) setNameAlert("Enter a name")
    if (!url.trim().length) setUrlAlert("Enter an URL")
    if (url.trim().length > 0 && !url.trim().includes("www.")) setUrlAlert("Enter a valid URL like www.example.com")
    if (name.trim().length && url.trim().length && url.trim().includes("www.")) {
      const urlDomain = url.split(".")[1]
      const getDomainIcon = `https://icons.duckduckgo.com/ip3/${urlDomain}.com.ico`
      const data = {
        name: name,
        image: getDomainIcon,
        url: url
      }
      store.addStreak(data)
      eraseInput()
    }
  }

  const eraseInput = () => {
    setName("")
    setUrl("")
    setNameAlert("")
    setUrlAlert("")
  }

  return (
    <div className='confirmations'>
      <h2>Create new Streak</h2>
      <div>
        <p>name</p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <span>{nameAlert}</span>
      </div>
      <div>
        <p>url</p>
        <input type="text" value={url} onChange={((e) => setUrl(e.target.value))} />
        <span>{urlAlert}</span>
      </div>
      <button type="submit" onClick={() => addStreak()}>Create</button>
    </div >
  )
}