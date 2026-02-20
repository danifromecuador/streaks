import SettingsIcon from '@mui/icons-material/Settings'
import { useConfigStore } from './store/config'
import { Config } from './components/Config'
import { LinkSection } from './components/LinkSection'
import { cn, classes } from './classes'

export const App = () => {
  const configOpen = useConfigStore(s => s.configOpen)
  const toggleConfig = useConfigStore(s => s.toggleConfig)

  return (
    <div className={classes.app}>
      <div className={classes.appMain}>
        <LinkSection type="streak" />
        <LinkSection type="bookmark" />
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