import { taskApi } from '@apis/task.api'
import { QueryKeys } from '@constants/queryKeys'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type UseGetSchedule = Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>

const useGetScheduleTask = (options?: UseGetSchedule) => {
  const queryResult = useQuery({
    queryKey: [QueryKeys.SCHEDULE_TASK],
    queryFn: () => taskApi.getSchedule(),
    ...options
  })
  return queryResult
}

export default useGetScheduleTask
