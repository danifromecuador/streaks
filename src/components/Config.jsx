import CloseIcon from '@mui/icons-material/Close'
import { useConfigStore } from '../store/config'
import { cn, classes } from '../classes'

export const Config = () => {
  const configOpen = useConfigStore(s => s.configOpen)
  const toggleConfig = useConfigStore(s => s.toggleConfig)

  return (
    <div className={cn(classes.configPanel, classes.configSlide(configOpen))}>
      Config Component
      <button type="button" className={classes.configCloseBtn} onClick={toggleConfig}>
        <CloseIcon />
      </button>
    </div>
  )
}
