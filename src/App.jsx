import SettingsIcon from '@mui/icons-material/Settings';
import { Store } from './store/Store'
import { Config } from './components/config/Config'
import { Grid } from './components/grid/Grid'
import { Streaks } from './components/streaks/Streaks'

export const App = () => {
  const store = Store()
  const visibility = store.visible1 ? 'hidden' : ''

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[90%] h-[90%] flex flex-col justify-between gap-[8vh]">
        <Streaks />
        <Grid />
      </div>
      <Config />
      <button
        className={`btn cursor-pointer w-[2vw] aspect-square fixed right-[calc((1vw+1vh)/2)] bottom-[calc((1vw+1vh)/2)] flex justify-center items-center ${visibility}`}
        onClick={() => store.toggleVisible1()}
      ><SettingsIcon /></button>
    </div>
  )
}