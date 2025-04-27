import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const Store = create(devtools((set) => ({
  visible1: true, // show or hide config main menu
  visible2: false, // show or hide create new streak dialog
  visible3: false, // show or hide delete streak dialog
  toggleVisible1: () => set((state) => ({ visible1: !state.visible1 })),
  toggleVisible2: () => set((state) => ({ visible2: !state.visible2 })),
  toggleVisible3: () => set((state) => ({ visible3: !state.visible3 })),
  streaks: [{name: "facebook", image:"https://icons.duckduckgo.com/ip3/facebook.com.ico", url:"www.facebook.com"}],
  addStreak: (data)=> set((state)=>({streaks: [...state.streaks, data]}))
})))
