import { useState, useEffect } from 'react'
import { useStreakStore } from '../store/streaks'
import { useBookmarkStore } from '../store/bookmarks'
import { LinkCard } from './LinkCard'
import { CreateEditModal } from './modals/CreateEditModal'
import { DeleteConfirmation } from './modals/DeleteConfirmation'
import { cn, classes } from '../classes'

export const LinkSection = ({ type }) => {
  const isStreak = type === 'streak'
  const streakStore = useStreakStore()
  const bookmarkStore = useBookmarkStore()
  const store = isStreak ? streakStore : bookmarkStore
  const items = isStreak ? store.streaks : store.bookmarks
  const storageKey = isStreak ? 'streaks' : 'bookmarks'

  const [addVisible, setAddVisible] = useState('hidden')
  const [createOpen, setCreateOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [nameToDelete, setNameToDelete] = useState('')

  const openCreate = () => {
    setCreateOpen(true)
    setDeleteOpen(false)
  }

  const handleDelete = (name) => {
    setNameToDelete(name)
    setDeleteOpen(true)
    setCreateOpen(false)
  }

  const handleCreateSubmit = (item) => {
    if (isStreak) streakStore.addStreak(item)
    else bookmarkStore.addBookmark(item)
    setCreateOpen(false)
  }

  const handleDeleteConfirm = () => {
    if (isStreak) streakStore.deleteStreak(nameToDelete)
    else bookmarkStore.deleteBookmark(nameToDelete)
    setDeleteOpen(false)
  }

  const showAddOnHover = () => {
    if (isStreak) setAddVisible(items.length < 10 ? '' : 'hidden')
    else setAddVisible('')
  }

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items))
  }, [storageKey, items])

  const sectionClass = isStreak ? classes.section : classes.sectionFull
  const listClass = isStreak ? classes.sectionList : classes.sectionListWrap
  const addBtnClass = isStreak ? classes.addBtn : classes.addBtnInline

  return (
    <div className={sectionClass} onMouseEnter={showAddOnHover} onMouseLeave={() => setAddVisible('hidden')}>
      <div className={listClass}>
        {items.map((item, k) => (
          <LinkCard
            key={k}
            name={item.name}
            image={item.image}
            url={item.url}
            onDelete={() => handleDelete(item.name)}
          />
        ))}
        <button type="button" className={cn(addBtnClass, addVisible)} onClick={openCreate}>
          +
        </button>
      </div>
      <CreateEditModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreateSubmit}
        mode={type}
      />
      <DeleteConfirmation
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        nameToDelete={nameToDelete}
        onConfirm={handleDeleteConfirm}
        type={type}
      />
    </div>
  )
}
