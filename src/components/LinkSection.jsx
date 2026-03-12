import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import SettingsIcon from '@mui/icons-material/Settings'
import { useStreakStore } from '../store/streaks'
import { useBookmarkStore } from '../store/bookmarks'
import { LinkCard } from './LinkCard'
import { CreateEditModal } from './modals/CreateEditModal'
import { DeleteConfirmation } from './modals/DeleteConfirmation'
import { cn, classes } from '../classes'

/** Renders a list of link items (streaks or bookmarks), add button, and create/delete modals. Type is 'streak' or 'bookmark'. */
export const LinkSection = ({ type, configOpen, onConfigClick }) => {
  const isStreak = type === 'streak'
  const streakStore = useStreakStore()
  const bookmarkStore = useBookmarkStore()
  const store = isStreak ? streakStore : bookmarkStore
  const items = isStreak ? store.streaks : store.bookmarks

  const [modal, setModal] = useState(null) // null | 'create' | { delete: id } | { edit: id }
  const [draggingId, setDraggingId] = useState(null)

  const closeModal = () => setModal(null)
  const addItem = (item) => (isStreak ? streakStore.addStreak(item) : bookmarkStore.addBookmark(item))
  const updateItem = (id, item) => (isStreak ? streakStore.updateStreak(id, item) : bookmarkStore.updateBookmark(id, item))
  const removeItem = (id) => (isStreak ? streakStore.deleteStreak(id) : bookmarkStore.deleteBookmark(id))
  const reorder = (fromIndex, toIndex) => (isStreak ? streakStore.reorderStreaks(fromIndex, toIndex) : bookmarkStore.reorderBookmarks(fromIndex, toIndex))

  const editId = modal?.edit ?? null
  const deleteId = modal?.delete ?? null
  const initialItem = editId ? (items.find((i) => i.id === editId) ?? null) : null

  const onCreateSubmit = (item) => {
    addItem(item)
    closeModal()
  }

  const onEditSubmit = (item) => {
    if (editId) updateItem(editId, item)
    closeModal()
  }

  const onDeleteConfirm = () => {
    if (deleteId) removeItem(deleteId)
    closeModal()
  }

  const atMax = isStreak ? items.length >= 10 : items.length >= 40
  const sectionClass = isStreak ? classes.section : classes.sectionFull
  const listClass = isStreak ? classes.sectionList : classes.sectionListWrap

  return (
    <div className={sectionClass}>
      <div className={listClass}>
        {items.map((item, index) => (
          <LinkCard
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            url={item.url}
            onDelete={() => setModal({ delete: item.id })}
            onEdit={() => setModal({ edit: item.id })}
            index={index}
            onDragStart={() => setDraggingId(item.id)}
            onDragOver={() => {}}
            onDrop={(toIndex) => {
              const fromIndex = items.findIndex((i) => i.id === draggingId)
              if (fromIndex !== -1 && fromIndex !== toIndex) reorder(fromIndex, toIndex)
              setDraggingId(null)
            }}
            onDragEnd={() => setDraggingId(null)}
            isDragging={draggingId === item.id}
          />
        ))}
        <button type="button" className={cn(classes.addBtn, atMax && 'hidden')} onClick={() => setModal('create')}>
          <AddIcon sx={{ fontSize: 'calc((3vw + 3vh)/1)' }} />
        </button>
      </div>
      <CreateEditModal
        open={modal === 'create' || Boolean(editId)}
        onClose={closeModal}
        onSubmit={editId ? onEditSubmit : onCreateSubmit}
        type={type}
        isEdit={Boolean(editId)}
        initialItem={initialItem}
      />
      <DeleteConfirmation
        open={Boolean(deleteId)}
        onClose={closeModal}
        nameToDelete={deleteId ? (items.find((i) => i.id === deleteId)?.name ?? '') : ''}
        onConfirm={onDeleteConfirm}
        type={type}
      />
      {type === 'bookmark' && onConfigClick && (
        <div
          className={cn(classes.configBtnInSection, configOpen && 'hidden')}
          onClick={onConfigClick}
          role="button"
          aria-label="Open configuration"
        >
          <SettingsIcon />
        </div>
      )}
    </div>
  )
}
