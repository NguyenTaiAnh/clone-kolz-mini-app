import fetcher from "./fetcher"

export const chatApi = {
  getConversations: async () => {
    try {
      const response = await fetcher.get<any>('/chat')
      return response.data
    } catch (error: any) {
      throw new Error(error)
    }
  }
}