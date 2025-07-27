export const addShortcut = (data, set) => {
  set(state => ({
    shortcuts: [...state.shortcuts, data]
  }), undefined, 'addShortcut')
}

export const saveEditedShortcut = (data, set) => {
  set(state => {
    const newShortcutsArray = state.shortcuts
    const shortcutIndexToEdit = state.shortcuts.findIndex(shortcut => shortcut.id === state.shortcutIdToEdit)
    newShortcutsArray[shortcutIndexToEdit].name = data.name
    newShortcutsArray[shortcutIndexToEdit].image = data.image
    newShortcutsArray[shortcutIndexToEdit].url = data.url
    return ({
      shortcuts: newShortcutsArray, shortcutIdToEdit: null
    })
  }, undefined, 'saveEditedShortcut')
}

export const deleteShortcut = (set) => {
  set(state => {
    const newShortcutsArray = state.shortcuts.filter(obj => obj.id !== state.shortcutIdToDelete)
    return ({
      shortcuts: newShortcutsArray, shortcutIdToDelete: null
    })
  }, undefined, 'deleteShortcut')
} 