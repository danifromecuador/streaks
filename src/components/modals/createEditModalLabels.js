/** Modal title from type ('streak'|'bookmark') and isEdit. */
export const getTitle = (type, isEdit) => {
  if (type === 'streak') return isEdit ? 'Edit Streak' : 'Create Streak'
  return isEdit ? 'Edit bookmark' : 'Create bookmark'
}

/** Submit button label: 'CREATE' when creating, 'SAVE' when editing. */
export const getSubmitLabel = (isEdit) => (isEdit ? 'SAVE' : 'CREATE')
