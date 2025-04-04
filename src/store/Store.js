import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const Store = create(devtools((set) => ({
  show1: true,
  toggleShow1: () => set((state) => ({ show1: !state.show1 }))
})))
