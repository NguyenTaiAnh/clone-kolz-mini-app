import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'

import { taskApi } from '@apis/task.api'
import { QueryKeys } from '@constants/queryKeys'
import { useToast } from '@hooks/use-toast'
import { DataTask, TaskItem } from '@interfaces/task.interface'
import { useStore } from '@stores'
import { useEffect } from 'react'

type UseGetClaim = Omit<UseQueryOptions<DataTask>, 'queryKey' | 'queryFn'>

const useGetClaim = (task: TaskItem, options?: UseGetClaim, signal?: any) => {
  const { initialPoints,setPoints } = useStore()
  const queryClient = useQueryClient()

  const { toast } = useToast()
  const { token } = useStore((state) => state)
  const queryResult = useQuery({
    queryKey: [QueryKeys.CLAIM, task.id],
    queryFn: () => taskApi.getClaim(task.id, signal),
    enabled: !!token,

    ...options
  })

  useEffect(() => {
    console.log('task : ,', task)
    if (queryResult.isFetched && queryResult.isSuccess && queryResult.data) {
      toast({
        title: 'Success',
        description: 'You got ' + task.points,
        duration: 3000,
        variant: 'default'
      })
      const point = Number(task.points || 0) + Number(initialPoints)
      setPoints(point)
      // queryClient.refetchQueries({
      //   queryKey: [QueryKeys.AUTH_MINING],
      //   type: 'active'
      // })
      queryClient.refetchQueries({
        queryKey: [QueryKeys.TASKS],
        type: 'active'
      })
    }
  }, [queryResult.isFetched, queryResult.isSuccess, queryResult.data, toast])

  useEffect(() => {
    if (queryResult.isFetched && queryResult.isError && queryResult.error) {
      toast({
        title: 'Error',
        description: queryResult.error.message,
        duration: 3000,
        variant: 'destructive'
      })
    }
  }, [queryResult.isFetched, queryResult.isError, queryResult.error, toast])

  return queryResult
}

export default useGetClaim
