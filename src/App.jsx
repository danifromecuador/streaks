import SettingsIcon from '@mui/icons-material/Settings';
import { Store } from './store/Store'
import { Config } from './components/config/Config'
import { Streaks } from './components/streaks/Streaks'
import { CreateConfirmation } from './components/confirmations/CreateConfirmation'
import { EditConfirmation } from './components/confirmations/EditConfirmation'
import { DeleteConfirmation } from './components/confirmations/DeleteConfirmation';
import './App.css'


export const App = () => {
  const store = Store()
  const visibility = store.visible1 ? "" : "hidden"

  return (
    <div className="app">
      <div className='main'>
        <Streaks type='streaks' />
        <Streaks type='shortcuts' />
        <CreateConfirmation />
        {(store.streakIdToEdit || store.shortcutIdToEdit) && <EditConfirmation />}
        {store.streakIdToDelete && <DeleteConfirmation />}
      </div>
      <Config />
      <button
        className={`btn config-btn ${visibility}`}
        onClick={() => store.toggleVisible1()}
      ><SettingsIcon /></button>
    </div>
  )
}