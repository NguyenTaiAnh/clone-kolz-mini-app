import { AuthenticateRequest, AuthenticateResponse, CurrentUser } from "@interfaces/user.interface"
import { AxiosResponse } from "axios"
import fetcher from "./fetcher"

export const authApi = {
  authenticate: async (bodyRequest: AuthenticateRequest) => {
    try {
      const response = await fetcher.post<AuthenticateRequest, AxiosResponse<AuthenticateResponse>>(
        'auth/authenticate',
        {
          ...bodyRequest
        }
      )

      return response.data
    } catch (error: any) {
      throw Error(error)
    }
  },

  getCurrentUserInfo: async () => {
    try {
      const response = await fetcher.get<CurrentUser>('/auth/info')
      return response.data
    } catch (error: any) {
      throw Error(error)
    }
  },

}