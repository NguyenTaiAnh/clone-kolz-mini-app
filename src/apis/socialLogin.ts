import fetcher from "./fetcher"

export const socialApi = {
  loginTwitter: async (param:any) => {
    try {
      const response = await fetcher.post<any>('/twitter/authenticate',param)
      return response.data
    } catch (error: any) {
      throw new Error(error)
    }
  },
  getInfo: async (token:any) => {
    try {
      const response = await fetcher.post("/twitter/info", token);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}