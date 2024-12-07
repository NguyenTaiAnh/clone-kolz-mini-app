import { chatApi } from '@apis/chat.api'
import { QueryKeys } from '@constants/queryKeys'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

type UseGetConversations = Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>

const useGetConversations = (options?: UseGetConversations) => {
  const queryResult = useQuery({
    queryKey: [QueryKeys.CONVERSATIONS],
    queryFn: () => chatApi.getConversations(),
    ...options
  })
  return queryResult
}

export default useGetConversations
