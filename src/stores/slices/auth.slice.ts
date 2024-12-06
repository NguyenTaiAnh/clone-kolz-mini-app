import { StateCreator } from 'zustand'

import { CurrentUser } from '@interfaces/user.interface'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@utils'

type AuthState = {
  currentUser: CurrentUser | null
  token: string | null
  isNewUser: boolean
  isPremiumAccount: boolean
  ageAccount: number
}

type AuthActions = {
  setCurrentUser: (user: CurrentUser) => void
  setToken: (token: string) => void
  logout: () => void
  setNewUser: (isNewUser: boolean) => void
  setPremiumAccount: (isPremiumAccount: boolean) => void
  setAgeAccount: (age: number) => void
}

export type AuthStore = AuthState & AuthActions

const initialState: AuthState = {
  currentUser: getLocalStorage<CurrentUser>('currentUser'),
  token: getLocalStorage('token'),
  isNewUser: false,
  isPremiumAccount: false,
  ageAccount: 0
}

const userSlice: StateCreator<AuthStore> = (set) => {
  return {
    ...initialState,
    setCurrentUser: (currentUser: CurrentUser) => {
      setLocalStorage('currentUser', currentUser)
      set({ currentUser })
    },
    setToken: (token: string) => {
      setLocalStorage('token', token)
      set({ token })
    },
    setNewUser: (isNewUser: boolean) => {
      set({ isNewUser })
    },
    setPremiumAccount: (isPremiumAccount: boolean) => {
      set({ isPremiumAccount })
    },
    setAgeAccount: (ageAccount: number) => {
      set({ ageAccount })
    },
    logout: () => {
      set({ currentUser: null })
      removeLocalStorage('currentUser')
    }
  }
}

export default userSlice
