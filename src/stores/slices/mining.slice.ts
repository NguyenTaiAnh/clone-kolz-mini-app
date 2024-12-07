import { StateCreator } from 'zustand'

type MiningState = {
  initialPoints: number
}

type MiningActions = {
  setPoints: (points: number) => void
}

export type MiningStore = MiningState & MiningActions

const initialState: MiningState = {
  initialPoints: 0
}

const miningSlice: StateCreator<MiningStore> = (set) => {
  return {
    ...initialState,
    setPoints: (initialPoints) => set(() => ({ initialPoints }))
  }
}

export default miningSlice
