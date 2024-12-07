import { StateCreator } from 'zustand'

type CharactersState = {
  characters: []
}

type CharactersActions = {
  setCharacters: (characters: any) => any
}

export type CharacterStore = CharactersState & CharactersActions

const initialState: CharactersState = {
  characters: []
}

const charactersSlice: StateCreator<CharacterStore> = (set) => {
  return {
    ...initialState,
    setCharacters: (characters) => set(() => ({ characters }))
  }
}

export default charactersSlice
