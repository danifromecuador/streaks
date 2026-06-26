import AddIcon from '@mui/icons-material/Add'
import { useStreakStore } from '../store/streaks'
import { useLinkSection } from '../hooks/useLinkSection'
import { LinkCard } from './LinkCard'
import { CreateEditModal } from './modals/CreateEditModal'
import { DeleteConfirmation } from './modals/DeleteConfirmation'
import { cn, classes } from '../classes'

export const StreakSection = () => {
  const items = useStreakStore((s) => s.streaks)
  const addStreak = useStreakStore((s) => s.addStreak)
  const updateStreak = useStreakStore((s) => s.updateStreak)
  const deleteStreak = useStreakStore((s) => s.deleteStreak)
  const reorderStreaks = useStreakStore((s) => s.reorderStreaks)

  const {
    modal, setModal, closeModal,
    editId, deleteId, initialItem,
    onCreateSubmit, onEditSubmit, onDeleteConfirm,
    dragHandlers,
  } = useLinkSection({
    items,
    addItem: addStreak,
    updateItem: updateStreak,
    removeItem: deleteStreak,
    reorder: reorderStreaks,
  })

  const atMax = items.length >= 10

  return (
    <div className={classes.section}>
      <div className={classes.sectionList}>
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
        type="streak"
        isEdit={Boolean(editId)}
        initialItem={initialItem}
      />
      <DeleteConfirmation
        open={Boolean(deleteId)}
        onClose={closeModal}
        nameToDelete={deleteId ? (items.find((i) => i.id === deleteId)?.name ?? '') : ''}
        onConfirm={onDeleteConfirm}
        type="streak"
      />
    </div>
  )
}
