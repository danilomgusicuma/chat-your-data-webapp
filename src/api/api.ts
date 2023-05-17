import axios, { AxiosInstance } from 'axios'

const backendUrl = 'http://localhost:8088'

const api: AxiosInstance = axios.create({
  baseURL: backendUrl
})

api.interceptors.request.use(async config => {
  // TODO: setup authorization here
  return config
})

export default api