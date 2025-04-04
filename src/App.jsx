import { Store } from './store/Store'
import { Config } from './components/config/Config'
import { Grid } from './components/grid/Grid'
import { Streaks } from './components/streaks/Streaks'

import './App.css'


export const App = () => {
  const store = Store()
  
  return (
    <div className="app">
      <div className='main'>
        <Streaks />
        <Grid />
      </div>
      <Config />
      <button
        className='config-btn'
        onClick={() => store.toggleShow1()}
      >Config</button>
    </div>
  )
}