import { Config } from './components/config/Config'
import { Grid } from './components/grid/Grid'
import { Streaks } from './components/streaks/Streaks'
import './App.css'


export const App = () => {
  return (
    <div className="app">
      <div className='main'>
        <Streaks />
        <Grid />
      </div>
      <Config />
    </div>
  )
}