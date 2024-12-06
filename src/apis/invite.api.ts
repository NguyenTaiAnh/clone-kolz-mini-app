import { DataInviteFriends } from "@interfaces/invite.interface"
import fetcher from "./fetcher"

export const inviteApi = {
  getInviteFriends: async () => {
    try {
      const response = await fetcher.get<DataInviteFriends>('/auth/friend-info')
      return response.data
    } catch (error: any) {
      throw new Error(error)
    }
  }
}