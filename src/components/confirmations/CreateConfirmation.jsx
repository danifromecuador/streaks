import { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Store } from '../../store/Store'

export const CreateConfirmation = () => {
  const store = Store()
  const visibility = store.visible2 ? '' : 'hidden'
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [nameAlert, setNameAlert] = useState("")
  const [urlAlert, setUrlAlert] = useState("")
  const eraseData = () => (setName(""), setUrl(""))
  const eraseAlerts = () => (setNameAlert(""), setUrlAlert(""))

  const addStreak = () => {
    eraseAlerts()
    if (!name.trim().length) setNameAlert("Enter a name")
    if (!url.trim().length) setUrlAlert("Enter a URL")
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
    <div className={`w-fit h-fit p-[calc((1vw+1vh)/0.5)] rounded-[calc((1vw+1vh)/3)] relative mx-auto bg-[#171f25] flex flex-col gap-[1vw] ${visibility}`}>
      <h2>Create new Streak</h2>
      <button className="btn cursor-pointer w-[2vw] aspect-square absolute top-[calc((1vw+1vh)/3)] right-[calc((1vw+1vh)/3)] flex justify-center items-center" onClick={() => store.toggleVisible2()}><CloseIcon /></button>
      <div>
        <p>name</p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <span className="text-[#c90a02] ml-[1vw]">{nameAlert}</span>
      </div>
      <div>
        <p>url</p>
        <input type="text" value={url} onChange={((e) => setUrl(e.target.value))} />
        <span className="text-[#c90a02] ml-[1vw]">{urlAlert}</span>
      </div>
      <button type="submit" className="btn cursor-pointer w-fit mt-[3vh] px-[0.5vw] create" onClick={() => addStreak()}>CREATE</button>
    </div >
  )
}