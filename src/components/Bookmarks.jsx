import { useState, useEffect } from 'react'
import { useBookmarkStore } from '../store/bookmarks'
import { LinkCard } from './LinkCard'
import { CreateEditModal } from './modals/CreateEditModal'
import { DeleteConfirmation } from './modals/DeleteConfirmation'
import { cn, classes } from '../classes'

export const Bookmarks = () => {
  const store = useBookmarkStore()
  const bookmarks = store.bookmarks
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
    localStorage.setItem('bookmarks', JSON.stringify(store.bookmarks))
  }, [store.bookmarks])

  return (
    <div className={classes.sectionFull} onMouseEnter={() => setAddVisible('')} onMouseLeave={() => setAddVisible('hidden')}>
      <div className={classes.sectionListWrap}>
        {bookmarks.map((b, k) => (
          <LinkCard key={k} name={b.name} image={b.image} url={b.url} onDelete={() => handleDelete(b.name)} />
        ))}
        <button type="button" className={cn(classes.addBtnInline, addVisible)} onClick={openCreate}>
          +
        </button>
      </div>
      <CreateEditModal mode="bookmark" />
      <DeleteConfirmation type="bookmark" />
    </div>
  )
}
