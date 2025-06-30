export const addShortcut = (data, set) => {
  set(state => ({
    shortcuts: [...state.shortcuts, data]
  }), undefined, 'addShortcut')
}