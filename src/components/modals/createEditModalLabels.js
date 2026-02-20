export const getTitle = (type, isEdit) => {
  if (type === 'streak') return isEdit ? 'Edit Streak' : 'Create Streak'
  return isEdit ? 'Edit bookmark' : 'Create bookmark'
}

export const getSubmitLabel = (isEdit) => (isEdit ? 'SAVE' : 'CREATE')
