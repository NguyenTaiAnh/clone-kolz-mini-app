import { useEffect, useMemo } from 'react'

import { authApi } from '@apis/auth.api'
import { inviteApi } from '@apis/invite.api'
import { QueryKeys } from '@constants/queryKeys'
import { useStore } from '@stores'
import { useQueries } from '@tanstack/react-query'
import { taskApi } from '@apis/task.api'

const useCombinedQueries = (token: string | null) => {
  const { setCurrentUser, setPoints } = useStore((state) => state)
  // const {set}

  const results = useQueries({
    queries: [
      {
        queryKey: [QueryKeys.CURRENT_USER],
        queryFn: () => authApi.getCurrentUserInfo(),
        enabled: !!token
      },
      // {
      //   queryKey: [QueryKeys.AUTH_MINING],
      //   queryFn: () => authApi.getMining(),
      //   enabled: !!token,
      //   gcTime: 0
      // },
      // {
      //   queryKey: [QueryKeys.AUTH_SYNC],
      //   queryFn: () => syncApi.getSync(),
      //   enabled: !!token
      // },
      {
        queryKey: [QueryKeys.AUTH_INVITE_FRIENDS],
        queryFn: () => inviteApi.getInviteFriends(),
        enabled: !!token
      },
      {
        queryKey: [QueryKeys.TASKS],
        queryFn: () => taskApi.getTask(),
        enabled: !!token
      }
    ]
  })

  const [currentUserResult] = useMemo(() => results, [results])
  // const [currentUserResult, miningResult] = useMemo(() => results, [results])

  useEffect(() => {
    if (currentUserResult.data) {
      setCurrentUser(currentUserResult.data)
      setPoints(Number(currentUserResult?.data.points || 0))
    }
  }, [currentUserResult.data])

  // const miningData = useMemo(() => miningResult?.data?.mining, [miningResult])
  // const comboData = useMemo(() => miningResult?.data?.combo, [miningResult])
  // const isFetchingMining = useMemo(() => miningResult.isFetching, [miningResult])

  // useEffect(() => {
  //   if (isFetchingMining) {
  //     setDisabledPoints(true)
  //   } else {
  //     setDisabledPoints(false)
  //     if (miningData) setMining(miningData)
  //     if (comboData) setCombo(comboData)
  //   }
  // }, [miningData, isFetchingMining])

  // const syncData = useMemo(() => syncResult?.data, [syncResult])

  // useEffect(() => {
  //   if (syncData) {
  //     setSyncData({ ...syncData, points: Number(syncData.points) })
  //     setShowSheetSync(Number(syncData.points) > 0 ? true : true)
  //   }
  // }, [syncData])

  return results
}

export default useCombinedQueries
