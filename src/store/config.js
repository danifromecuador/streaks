import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useConfigStore = create(devtools(set => ({
  configOpen: true,
  toggleConfig: () => set(state => ({ configOpen: !state.configOpen })),

  // Futuro: theme, backgroundColor, export/import, etc.
})))
