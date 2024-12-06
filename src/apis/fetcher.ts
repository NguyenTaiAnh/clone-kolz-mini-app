import { API_URL } from '@constants/config'
import { getLocalStorage } from '@utils'
import axios, { InternalAxiosRequestConfig } from 'axios'

const enhanceConfig = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = getLocalStorage('token')
  if (token) {
    config.headers = config.headers || {}
    config.headers['Authorization'] = `Bearer ${token}`
  }
  if (config.signal?.addEventListener) {
    config.signal?.addEventListener('abort', () => {
      console.log('Request aborted')
    })
  }
  return config
}

const fetcher = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

fetcher.interceptors.request.use(enhanceConfig)

fetcher.interceptors.request.use((config) => {
  const token = getLocalStorage('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

export default fetcher
