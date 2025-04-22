import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const Store = create(devtools((set) => ({
  visible1: true,
  toggleVisible1: () => set((state) => ({ visible1: !state.visible1 })),
  streaks: [],
  addStreak: (data)=> set((state)=>({streaks: [...state.streaks, data]}))
})))
