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

  const streaks = useStreakStore((s) => s.streaks)
  const addStreak = useStreakStore((s) => s.addStreak)
  const updateStreak = useStreakStore((s) => s.updateStreak)
  const deleteStreak = useStreakStore((s) => s.deleteStreak)
  const reorderStreaks = useStreakStore((s) => s.reorderStreaks)

  const bookmarks = useBookmarkStore((s) => s.bookmarks)
  const addBookmark = useBookmarkStore((s) => s.addBookmark)
  const updateBookmark = useBookmarkStore((s) => s.updateBookmark)
  const deleteBookmark = useBookmarkStore((s) => s.deleteBookmark)
  const reorderBookmarks = useBookmarkStore((s) => s.reorderBookmarks)

  const items = isStreak ? streaks : bookmarks

  const [modal, setModal] = useState(null) // null | 'create' | { delete: id } | { edit: id }
  const [draggingId, setDraggingId] = useState(null)

  const closeModal = () => setModal(null)
  const addItem = (item) => (isStreak ? addStreak(item) : addBookmark(item))
  const updateItem = (id, item) => (isStreak ? updateStreak(id, item) : updateBookmark(id, item))
  const removeItem = (id) => (isStreak ? deleteStreak(id) : deleteBookmark(id))
  const reorder = (fromIndex, toIndex) => (isStreak ? reorderStreaks(fromIndex, toIndex) : reorderBookmarks(fromIndex, toIndex))

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
