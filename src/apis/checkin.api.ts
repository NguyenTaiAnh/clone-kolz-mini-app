import fetcher from "./fetcher"

export const checkInApi = {
  getHistory: async () => {
    try {
      const response = await fetcher.get<any>('/daily-checkin')
      return response.data
    } catch (error: any) {
      throw Error(error)
    }
  },
  checkin: async () => {
    try {
      const response = await fetcher.post<any>('/daily-checkin',{})
      return response.data
    } catch (error: any) {
      throw Error(error)
    }
  },

}