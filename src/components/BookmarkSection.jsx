import AddIcon from '@mui/icons-material/Add'
import SettingsIcon from '@mui/icons-material/Settings'
import { useBookmarkStore } from '../store/bookmarks'
import { useLinkSection } from '../hooks/useLinkSection'
import { LinkCard } from './LinkCard'
import { CreateEditModal } from './modals/CreateEditModal'
import { DeleteConfirmation } from './modals/DeleteConfirmation'
import { cn, classes } from '../classes'

export const BookmarkSection = ({ configOpen, onConfigClick }) => {
  const items = useBookmarkStore((s) => s.bookmarks)
  const addBookmark = useBookmarkStore((s) => s.addBookmark)
  const updateBookmark = useBookmarkStore((s) => s.updateBookmark)
  const deleteBookmark = useBookmarkStore((s) => s.deleteBookmark)
  const reorderBookmarks = useBookmarkStore((s) => s.reorderBookmarks)

  const {
    modal, setModal, closeModal,
    editId, deleteId, initialItem,
    onCreateSubmit, onEditSubmit, onDeleteConfirm,
    dragHandlers,
  } = useLinkSection({
    items,
    addItem: addBookmark,
    updateItem: updateBookmark,
    removeItem: deleteBookmark,
    reorder: reorderBookmarks,
  })

  const atMax = items.length >= 40

  return (
    <div className={classes.sectionFull}>
      <div className={classes.sectionListWrap}>
        {items.map((item, index) => (
          <LinkCard
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            url={item.url}
            onDelete={() => setModal({ delete: item.id })}
            onEdit={() => setModal({ edit: item.id })}
            {...dragHandlers(item, index)}
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
        type="bookmark"
        isEdit={Boolean(editId)}
        initialItem={initialItem}
      />
      <DeleteConfirmation
        open={Boolean(deleteId)}
        onClose={closeModal}
        nameToDelete={deleteId ? (items.find((i) => i.id === deleteId)?.name ?? '') : ''}
        onConfirm={onDeleteConfirm}
        type="bookmark"
      />
      {onConfigClick && (
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
