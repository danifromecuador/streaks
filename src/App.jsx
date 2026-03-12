import { useState, useEffect } from 'react'
import { Config } from './components/Config'
import { LinkSection } from './components/LinkSection'
import { classes } from './classes'
import { fetchSeedData, applySeed } from './utils/seedLoader'

/** Root layout: streaks section, bookmarks section, and config panel. */
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
        <LinkSection
          type="bookmark"
          configOpen={configOpen}
          onConfigClick={() => setConfigOpen(true)}
        />
      </div>
      <Config open={configOpen} onClose={() => setConfigOpen(false)} />
    </div>
  )
}
