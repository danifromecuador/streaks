import { useState } from 'react'

/** Shared CRUD and drag state for a link section. Returns items, modal state, and drag handlers. */
export const useLinkSection = ({ items, addItem, updateItem, removeItem, reorder }) => {
  const [modal, setModal] = useState(null) // null | 'create' | { delete: id } | { edit: id }
  const [draggingId, setDraggingId] = useState(null)

  const closeModal = () => setModal(null)

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

  const dragHandlers = (item, index) => ({
    index,
    onDragStart: () => setDraggingId(item.id),
    onDrop: (toIndex) => {
      const fromIndex = items.findIndex((i) => i.id === draggingId)
      if (fromIndex !== -1 && fromIndex !== toIndex) reorder(fromIndex, toIndex)
      setDraggingId(null)
    },
    onDragEnd: () => setDraggingId(null),
    isDragging: draggingId === item.id,
  })

  return {
    modal,
    setModal,
    closeModal,
    editId,
    deleteId,
    initialItem,
    onCreateSubmit,
    onEditSubmit,
    onDeleteConfirm,
    dragHandlers,
  }
}
