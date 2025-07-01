export const addShortcut = (data, set) => {
  set(state => ({
    shortcuts: [...state.shortcuts, data]
  }), undefined, 'addShortcut')
}

export const saveEditedShortcut = (name, set) => {
  set(state => {
    const newShortcutsArray = state.shortcuts
    const shortcutIndexToEdit = state.shortcuts.findIndex(shortcut => shortcut.id === state.shortcutIdToEdit)
    newShortcutsArray[shortcutIndexToEdit].name = name
    return ({
      shortcuts: newShortcutsArray, shortcutIdToEdit: null
    })
  }, undefined, 'saveEditedShortcut')
}