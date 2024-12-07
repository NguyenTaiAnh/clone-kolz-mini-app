import { DataTask } from '@interfaces/task.interface'
import fetcher from './fetcher'

export const taskApi = {
  getTask: async () => {
    try {
      const response = await fetcher.get<DataTask>('/auth/task')
      return response.data
    } catch (error: any) {
      throw Error(error)
    }
  },
  getClaim: async (id: string, signal: any) => {
    try {
      const response = await fetcher.get<DataTask>(`/social-task/${id}/claim`, {
        signal
      })
      return response.data
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error)
    }
  },
  postStartTask: async (id: string) => {
    try {
      const response = await fetcher.post<any>(`/social-task/${id}/start`, {})
      return response.data
    } catch (error: any) {
      throw new Error(error)
    }
  },
  postCheckIn: async () => {
    try {
      const response = await fetcher.post<any>('/daily-checkin', {})
      return response.data
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || error)
    }
  },
  getHistories: async () => {
    try {
      const response = await fetcher.get<any>('/daily-checkin')
      return response.data
    } catch (error: any) {
      throw new Error(error)
    }
  },
  getSchedule: async () => {
    try {
      const response = await fetcher.get<any>('/daily-checkin/schedule')
      return response.data
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
