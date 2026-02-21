import { useState, useEffect } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import { Config } from './components/Config'
import { LinkSection } from './components/LinkSection'
import { cn, classes } from './classes'
import { fetchSeedData, applySeed } from './utils/seedLoader'

/** Root layout: streaks section, bookmarks section, config panel, and settings button. */
export const App = () => {
  const [configOpen, setConfigOpen] = useState(false)

  useEffect(() => {
    if (import.meta.env.VITE_LOAD_SEED === 'true') {
      fetchSeedData().then((data) => data && applySeed(data))
    }
  }, [])

  return (
    <div className={classes.app}>
      <div className={classes.appMain}>
        <LinkSection type="streak" />
        <LinkSection type="bookmark" />
      </div>
      <Config open={configOpen} onClose={() => setConfigOpen(false)} />
      <div
        className={cn(classes.configBtn, configOpen && 'hidden')}
        onClick={() => setConfigOpen(true)}
      >
        <SettingsIcon />
      </div>
    </div>
  )
}
