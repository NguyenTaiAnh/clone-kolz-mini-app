import { DataEnergy } from "@interfaces/energy.interface"
import fetcher from "./fetcher"

export const energyApi = {
  getEnergy: async () => {
    try {
      const response = await fetcher.get<DataEnergy>('/user-energy')
      return response.data
    } catch (error: any) {
      throw Error(error)
    }
  },
  postEnergy: async () => {
    try {
      const response = await fetcher.post<DataEnergy>('/user-energy',{})
      return response.data
    } catch (error: any) {
      throw Error(error)
    }
  },
}