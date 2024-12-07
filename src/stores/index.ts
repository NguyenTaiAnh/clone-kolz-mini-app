import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import userSlice from './slices/auth.slice'
import globalSlice from './slices/global.slice'
import charactersSlice from './slices/characters.slice'
import miningSlice from './slices/mining.slice'
import visibleSlice from './slices/visible.slice'
import firstTimeSlice from './slices/firstTime.slice'
type StoreState = ReturnType<typeof userSlice> &
  ReturnType<typeof globalSlice> &
  ReturnType<typeof charactersSlice> &
  ReturnType<typeof miningSlice> &
  ReturnType<typeof visibleSlice> &
  ReturnType<typeof firstTimeSlice> 

export const useStore = create<StoreState>()(
  devtools((...options) => ({
    ...userSlice(...options),
    ...globalSlice(...options),
    ...charactersSlice(...options),
    ...miningSlice(...options),
    ...visibleSlice(...options),
    ...firstTimeSlice(...options)
  }))
)
