import { StateCreator } from 'zustand'

type GlobalState = {
  isGlobalLoading: boolean
}

type GlobalActions = {
  setGlobalLoading: (isGlobalLoading: boolean) => void
}

export type GlobalStore = GlobalState & GlobalActions

const initialState: GlobalState = {
  isGlobalLoading: true
}

const globalSlice: StateCreator<GlobalStore> = (set) => {
  return {
    ...initialState,
    setGlobalLoading: (isGlobalLoading) => set(() => ({ isGlobalLoading }))
  }
}

export default globalSlice
