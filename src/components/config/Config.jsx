import { Store } from '../../store/Store'
import './Config.css'

export const Config = () => {
  const store = Store()
  const visibility = store.visible1 ? 'hidden' : ''

  return (
    <div className={`config ${visibility}`}>
      Config Component
      <button
        className='btn close-config-btn'
        onClick={() => store.toggleVisible1()}
      >Close</button>
    </div>
  )
}