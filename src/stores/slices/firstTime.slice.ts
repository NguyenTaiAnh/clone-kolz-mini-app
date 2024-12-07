import { StateCreator } from 'zustand'

type FirstTimeState = {
  isFirstTime: boolean
}

type FirstTimeActions = {
  setIsFirstTime: (isFirstTime: boolean) => void
}

export type FirstTimeStore = FirstTimeState & FirstTimeActions

const initialState: FirstTimeState = {
  isFirstTime: false
}

const firstTimeSlice: StateCreator<FirstTimeStore> = (set) => {
  return {
    ...initialState,
    setIsFirstTime: (isFirstTime) => set(() => ({ isFirstTime }))
  }
}

export default firstTimeSlice
