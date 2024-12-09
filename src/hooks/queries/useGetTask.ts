import { taskApi } from '@apis/task.api'
import { QueryKeys } from '@constants/queryKeys'
import { DataTask } from '@interfaces/task.interface'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type UseGetTask = Omit<UseQueryOptions<DataTask>, 'queryKey' | 'queryFn'>

const useGetTask = (options?: UseGetTask) => {
  const queryResult = useQuery({
    queryKey: [QueryKeys.TASKS],
    queryFn: () => taskApi.getTask(),
    ...options
  })
  return queryResult
}

export default useGetTask
