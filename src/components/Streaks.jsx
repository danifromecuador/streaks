import { useState, useEffect } from 'react'
import { useStreakStore } from '../store/streaks'
import { LinkCard } from './LinkCard'
import { CreateEditModal } from './modals/CreateEditModal'
import { DeleteConfirmation } from './modals/DeleteConfirmation'
import { cn, classes } from '../classes'

export const Streaks = () => {
  const store = useStreakStore()
  const streaks = store.streaks
  const [addVisible, setAddVisible] = useState('hidden')

  const openCreate = () => {
    store.toggleCreateModal()
    if (store.deleteModalOpen) store.toggleDeleteModal()
  }

  const handleDelete = (name) => {
    store.setNameToDelete(name)
    if (!store.deleteModalOpen) store.toggleDeleteModal()
    if (store.createModalOpen) store.toggleCreateModal()
  }

  useEffect(() => {
    localStorage.setItem('streaks', JSON.stringify(store.streaks))
  }, [store.streaks])

  return (
    <div
      className={classes.section}
      onMouseEnter={() => setAddVisible(streaks.length < 10 ? '' : 'hidden')}
      onMouseLeave={() => setAddVisible('hidden')}
    >
      <div className={classes.sectionList}>
        {streaks.map((e, k) => (
          <LinkCard key={k} name={e.name} image={e.image} url={e.url} onDelete={() => handleDelete(e.name)} />
        ))}
        <button type="button" className={cn(classes.addBtn, addVisible)} onClick={openCreate}>
          +
        </button>
      </div>
      <CreateEditModal mode="streak" />
      <DeleteConfirmation type="streak" />
    </div>
  )
}
