import CloseIcon from '@mui/icons-material/Close'
import { useConfigStore } from '../../store/config'

export const Config = () => {
  const configOpen = useConfigStore(s => s.configOpen)
  const toggleConfig = useConfigStore(s => s.toggleConfig)
  const slideOff = configOpen ? 'translate-x-0' : 'translate-x-[120%]'

  return (
    <div className={`fixed right-0 w-[30%] h-full bg-black/70 backdrop-blur-[1px] transform transition-transform duration-500 ease-in-out z-[1] ${slideOff}`}>
      Config Component
      <button
        type="button"
        className="btn cursor-pointer w-[2vw] aspect-square fixed right-[calc((1vw+1vh)/2)] top-[calc((1vw+1vh)/2)] flex justify-center items-center"
        onClick={toggleConfig}
      >
        <CloseIcon />
      </button>
    </div>
  )
}