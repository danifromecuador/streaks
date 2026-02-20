import { useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import { Config } from './components/Config'
import { LinkSection } from './components/LinkSection'
import { cn, classes } from './classes'

export const App = () => {
  const [configOpen, setConfigOpen] = useState(true)

  return (
    <div className={classes.app}>
      <div className={classes.appMain}>
        <LinkSection type="streak" />
        <LinkSection type="bookmark" />
      </div>
      <Config open={configOpen} onClose={() => setConfigOpen(false)} />
      <button
        type="button"
        className={cn(classes.configBtn, configOpen && 'hidden')}
        onClick={() => setConfigOpen(true)}
      >
        <SettingsIcon />
      </button>
    </div>
  )
}