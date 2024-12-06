import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import userSlice from './slices/auth.slice'
type StoreState = ReturnType<typeof userSlice>

export const useStore = create<StoreState>()(
  devtools((...options) => ({
    ...userSlice(...options),
  }))
)
