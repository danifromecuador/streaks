import { useState } from 'react'
import './Confirmations.css'

export const CreateConfirmation = () => {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  console.log(name);
  

  return (
    <div className='confirmations'>
      <h2>Create new Streak</h2>
      <div>
        <p>name</p>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
      </div>
      <div>
        <p>url</p>
        <input type="text" value={url} onChange={((e)=>setUrl(e.target.value))}/>
      </div>
      <button type="submit">Create</button>
    </div>
  )
}