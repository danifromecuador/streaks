export const addStreak = (data, set) => {
  set(state => ({
    streaks: [...state.streaks, data]
  }), undefined, 'toggleVisible1')
}

export const saveEditedStreak = (name, set) => {
  set(state => {
    const newStreaksArray = state.streaks
    const streakIndexToEdit = state.streaks.findIndex(streak => streak.id === state.streakIdToEdit)
    newStreaksArray[streakIndexToEdit].name = name
    return ({
      streaks: newStreaksArray, streakIdToEdit: null
    })
  }, undefined, 'saveEditedStreak')
}

export const deleteStreak = (set) => {
  set(state => {
    const newStreaksArray = state.streaks.filter(obj => obj.id !== state.streakIdToDelete)
    return ({
      streaks: newStreaksArray, streakIdToDelete: null
    })
  }, undefined, 'deleteStreak')
}