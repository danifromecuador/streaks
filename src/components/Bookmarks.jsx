import { useState, useEffect } from 'react'
import { useBookmarkStore } from '../store/bookmarks'
import { LinkCard } from './LinkCard'
import { CreateEditModal } from './modals/CreateEditModal'
import { DeleteConfirmation } from './modals/DeleteConfirmation'

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
    <div
      className="w-full h-full border border-[calc((1vw+1vh)/10)] border-[#8fc9b9] rounded-[calc((1vw+1vh)/1.5)] flex justify-center items-center relative"
      onMouseEnter={() => setAddVisible('')}
      onMouseLeave={() => setAddVisible('hidden')}
    >
      <div className="w-fit relative flex flex-wrap items-center justify-center gap-[2vw] p-4">
        {bookmarks.map((b, k) => (
          <LinkCard
            key={k}
            name={b.name}
            image={b.image}
            url={b.url}
            onDelete={() => handleDelete(b.name)}
          />
        ))}
        <button
          type="button"
          className={`btn cursor-pointer w-[4vw] aspect-square border-none rounded-[calc((1vw+1vh)/3)] text-[calc((1vw+1vh)/0.5)] flex justify-center items-center ${addVisible}`}
          onClick={openCreate}
        >
          +
        </button>
      </div>
      <CreateEditModal mode="bookmark" />
      <DeleteConfirmation type="bookmark" />
    </div>
  )
}
