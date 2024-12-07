import { StateCreator } from 'zustand'

type VisibleState = {
  isVisible: boolean
}

type VisibleActions = {
  setIsVisible: (isVisible: boolean) => void
}

export type VisibleStore = VisibleState & VisibleActions

const initialState: VisibleState = {
  isVisible: false
}

const visibleSlice: StateCreator<VisibleStore> = (set) => {
  return {
    ...initialState,
    setIsVisible: (isVisible) => set(() => ({ isVisible }))
  }
}

export default visibleSlice
