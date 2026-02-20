import CloseIcon from '@mui/icons-material/Close'
import { cn, classes } from '../classes'

export const Config = ({ open, onClose }) => (
  <div className={cn(classes.configPanel, classes.configSlide(open))}>
    Config Component
    <button type="button" className={classes.configCloseBtn} onClick={onClose}>
      <CloseIcon />
    </button>
  </div>
)
