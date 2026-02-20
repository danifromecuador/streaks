import SettingsIcon from '@mui/icons-material/Settings'
import { useConfigStore } from './store/config'
import { Config } from './components/Config'
import { Bookmarks } from './components/Bookmarks'
import { Streaks } from './components/Streaks'
import { cn, classes } from './classes'

export const App = () => {
  const configOpen = useConfigStore(s => s.configOpen)
  const toggleConfig = useConfigStore(s => s.toggleConfig)

  return (
    <div className={classes.app}>
      <div className={classes.appMain}>
        <Streaks />
        <Bookmarks />
      </div>
      <Config />
      <button
        type="button"
        className={cn(classes.configBtn, configOpen && 'hidden')}
        onClick={toggleConfig}
      >
        <SettingsIcon />
      </button>
    </div>
  )
}