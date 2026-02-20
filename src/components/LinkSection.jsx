import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { useStreakStore } from '../store/streaks'
import { useBookmarkStore } from '../store/bookmarks'
import { LinkCard } from './LinkCard'
import { CreateEditModal } from './modals/CreateEditModal'
import { DeleteConfirmation } from './modals/DeleteConfirmation'
import { cn, classes } from '../classes'

/** Renders a list of link items (streaks or bookmarks), add button, and create/delete modals. Type is 'streak' or 'bookmark'. */
export const LinkSection = ({ type }) => {
  const isStreak = type === 'streak'
  const streakStore = useStreakStore()
  const bookmarkStore = useBookmarkStore()
  const store = isStreak ? streakStore : bookmarkStore
  const items = isStreak ? store.streaks : store.bookmarks

  const [modal, setModal] = useState(null) // null | 'create' | { delete: name } | { edit: item }

  const closeModal = () => setModal(null)
  const addItem = (item) => (isStreak ? streakStore.addStreak(item) : bookmarkStore.addBookmark(item))
  const updateItem = (name, item) => (isStreak ? streakStore.updateStreak(name, item) : bookmarkStore.updateBookmark(name, item))
  const removeItem = (name) => (isStreak ? streakStore.deleteStreak(name) : bookmarkStore.deleteBookmark(name))

  const onCreateSubmit = (item) => {
    addItem(item)
    closeModal()
  }

  const onEditSubmit = (item) => {
    if (modal?.edit) updateItem(modal.edit.name, item)
    closeModal()
  }

  const onDeleteConfirm = () => {
    if (modal?.delete) removeItem(modal.delete)
    closeModal()
  }

  const atMax = isStreak ? items.length >= 10 : items.length >= 40
  const sectionClass = isStreak ? classes.section : classes.sectionFull
  const listClass = isStreak ? classes.sectionList : classes.sectionListWrap

  return (
    <div className={sectionClass}>
      <div className={listClass}>
        {items.map((item, k) => (
          <LinkCard
            key={k}
            name={item.name}
            image={item.image}
            url={item.url}
            onDelete={() => setModal({ delete: item.name })}
            onEdit={() => setModal({ edit: item })}
          />
        ))}
        <button type="button" className={cn(classes.addBtn, atMax && 'hidden')} onClick={() => setModal('create')}>
          <AddIcon sx={{ fontSize: 'calc((3vw + 3vh)/1)' }} />
        </button>
      </div>
      <CreateEditModal
        open={modal === 'create' || Boolean(modal?.edit)}
        onClose={closeModal}
        onSubmit={modal?.edit ? onEditSubmit : onCreateSubmit}
        type={type}
        isEdit={Boolean(modal?.edit)}
        initialItem={modal?.edit ?? null}
      />
      <DeleteConfirmation
        open={Boolean(modal?.delete)}
        onClose={closeModal}
        nameToDelete={modal?.delete ?? ''}
        onConfirm={onDeleteConfirm}
        type={type}
      />
    </div>
  )
}
