import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { inviteApi } from '@apis/invite.api'
import { QueryKeys } from '@constants/queryKeys'
import { DataInviteFriends } from '@interfaces/invite.interface'

type UseGetInviteFriends = Omit<UseQueryOptions<DataInviteFriends>, 'queryKey' | 'queryFn'>

const useGetInviteFriends = (options?: UseGetInviteFriends) => {
  const queryResult = useQuery({
    queryKey: [QueryKeys.AUTH_INVITE_FRIENDS],
    queryFn: () => inviteApi.getInviteFriends(),
    ...options
  })
  return queryResult
}

export default useGetInviteFriends
