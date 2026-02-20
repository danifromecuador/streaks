import CloseIcon from '@mui/icons-material/Close'
import { cn, classes } from '../classes'

/** Slide-in settings panel. Controlled by parent via open and onClose. */
export const Config = ({ open, onClose }) => (
  <div className={cn(classes.configPanel, classes.configSlide(open))}>
    Config Component
    <button type="button" className={classes.configCloseBtn} onClick={onClose}>
      <CloseIcon />
    </button>
  </div>
)
