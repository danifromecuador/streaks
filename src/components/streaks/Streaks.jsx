import { useState, useEffect } from 'react'
import { useStreakStore } from '../../store/streaks'
import { Streak } from './Streak'
import { CreateEditModal } from '../modals/CreateEditModal'
import { DeleteConfirmation } from '../modals/DeleteConfirmation'

export const Streaks = () => {
  const store = useStreakStore()
  const streaks = store.streaks
  const [addVisible, setAddVisible] = useState('hidden')

  const openCreate = () => {
    store.toggleCreateModal()
    if (store.deleteModalOpen) store.toggleDeleteModal()
  }

  useEffect(() => {
    localStorage.setItem('streaks', JSON.stringify(store.streaks))
  }, [store.streaks])

  return (
    <div
      className="w-full aspect-[10/1] border border-[calc((1vw+1vh)/10)] border-[#8fc9b9] rounded-[calc((1vw+1vh)/1.5)] flex justify-center items-center"
      onMouseEnter={() => setAddVisible(streaks.length < 10 ? '' : 'hidden')}
      onMouseLeave={() => setAddVisible('hidden')}
    >
      <div className="w-fit relative flex items-center gap-[2vw]">
        {streaks.map((e, k) => (
          <Streak name={e.name} image={e.image} url={e.url} key={k} />
        ))}
        <button
          type="button"
          className={`btn cursor-pointer w-[4vw] aspect-square absolute right-[-7vw] border-none rounded-[calc((1vw+1vh)/3)] text-[calc((1vw+1vh)/0.5)] flex justify-center items-center ${addVisible}`}
          onClick={openCreate}
        >
          +
        </button>
      </div>
      <CreateEditModal mode="streak" />
      <DeleteConfirmation type="streak" />
    </div>
  )
}
