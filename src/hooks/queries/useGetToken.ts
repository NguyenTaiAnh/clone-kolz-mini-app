import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

import { authApi } from '@apis/auth.api'
import { AuthenticateRequest } from '@interfaces/user.interface'
import { getLocalStorage } from '@utils'
import { useStore } from '@stores'

const useGetToken = () => {
  const { setToken, setNewUser, setPremiumAccount, setAgeAccount } = useStore((state) => state)
  const telegramId = getLocalStorage('telegram_id')
  const telegramUsername = getLocalStorage('telegram_username')
  const telegram_firstname = getLocalStorage('telegram_firstname')
  const telegram_lastname = getLocalStorage('telegram_lastname')
  const user_type_id = getLocalStorage('user_type_id')
  const is_premium = getLocalStorage('is_premium')

  const bodyRequest: AuthenticateRequest = {
    telegram_id: telegramId ? Number(telegramId) : 687612678,
    telegram_username: telegramUsername || 'nhut2236',
    telegram_firstname: telegram_firstname || 'Bob',
    telegram_lastname: telegram_lastname || '',
    user_type_id: user_type_id,
    is_premium: is_premium || false
  }
  // const bodyRequest: AuthenticateRequest = {
  //   telegram_id: telegramId ? Number(telegramId) : 6387347744,
  //   telegram_username: telegramUsername,
  //   telegram_firstname: telegram_firstname,
  //   telegram_lastname: telegram_lastname,
  //   user_type_id: user_type_id,
  //   is_premium: is_premium || false
  // }

  const mutateResult = useMutation({
    mutationFn: (bodyRequest: AuthenticateRequest) => authApi.authenticate(bodyRequest),
    onSuccess: (data) => {
      const token = data?.token
      console.log({token})
      const isNewUser = data?.is_new_user || false
      const age = data.age
      const isPremium = data?.is_premium || false
      setAgeAccount(age)
      // if (isNewUser) setIsVisible(true)
      setPremiumAccount(isPremium)
      setNewUser(isNewUser)
      setToken(token)
    }
  })

  useEffect(() => {
    mutateResult.mutate(bodyRequest)
  }, [])

  return mutateResult
}

export default useGetToken
