import { useState } from 'react'
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

  const [addVisible, setAddVisible] = useState('hidden')
  const [modal, setModal] = useState(null) // null | 'create' | { delete: name }

  const closeModal = () => setModal(null)
  const addItem = (item) => (isStreak ? streakStore.addStreak(item) : bookmarkStore.addBookmark(item))
  const removeItem = (name) => (isStreak ? streakStore.deleteStreak(name) : bookmarkStore.deleteBookmark(name))

  const onCreateSubmit = (item) => {
    addItem(item)
    closeModal()
  }

  const onDeleteConfirm = () => {
    if (modal?.delete) removeItem(modal.delete)
    closeModal()
  }

  const showAddOnHover = () => setAddVisible(isStreak && items.length >= 10 ? 'hidden' : '')

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
            onDelete={() => setModal({ delete: item.name })}
          />
        ))}
        <button type="button" className={cn(addBtnClass, addVisible)} onClick={() => setModal('create')}>
          +
        </button>
      </div>
      <CreateEditModal
        open={modal === 'create'}
        onClose={closeModal}
        onSubmit={onCreateSubmit}
        type={type}
        isEdit={false}
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
