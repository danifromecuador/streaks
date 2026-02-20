import SettingsIcon from '@mui/icons-material/Settings'
import { useConfigStore } from './store/config'
import { Config } from './components/config/Config'
import { Bookmarks } from './components/bookmarks/Bookmarks'
import { Streaks } from './components/streaks/Streaks'

export const App = () => {
  const configOpen = useConfigStore(s => s.configOpen)
  const toggleConfig = useConfigStore(s => s.toggleConfig)
  const visibility = configOpen ? 'hidden' : ''

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[90%] h-[90%] flex flex-col justify-between gap-[8vh]">
        <Streaks />
        <Bookmarks />
      </div>
      <Config />
      <button
        type="button"
        className={`btn cursor-pointer w-[2vw] aspect-square fixed right-[calc((1vw+1vh)/2)] bottom-[calc((1vw+1vh)/2)] flex justify-center items-center ${visibility}`}
        onClick={toggleConfig}
      >
        <SettingsIcon />
      </button>
    </div>
  )
}