import axios, { type AxiosRequestConfig } from 'axios'

import { ElMessage } from 'element-plus'
import router from '@/router'
import { useUserStore } from '@/stores/user'
// 后端基础路径
export const baseURL = 'http://localhost:8000'

// 创建 Axios 实例
const http = axios.create({
  baseURL,
  timeout: 20000
})

// 请求拦截器
http.interceptors.request.use((config) => {
  const { token, removeToken } = useUserStore()
  if (token) {
    // 从 Vuex 中获取 token 并进行请求头的设置
    // ! 告诉 ts 前面的这个对象, 不会为空, 不用你考虑
    config.headers!.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // 统一错误处理：根据后端返回的错误代码，显示提示消息
    const response = error.response
    const data = response.data
    ElMessage.error(`${data.message}（错误代码: ${data.code}）`)
    const { token, removeToken } = useUserStore()
    // 如果后台返回的 401 未授权通过,清除token信息, 跳转到登录 (token过期处理)
    if (response.status === 401 || !token) {
      removeToken()
      return router.replace('/sign/login')
    }

    return Promise.reject(error)
  }
)

// --------------------------------------------------------------------------------------
/* 
  封装四个工具函数: 发送 get post put del 请求
*/
export interface ApiResult<T = any> {
  code: number // 错误代码
  message: string // 提示消息
  data: T // 业务数据
}

export function get<T = any>(url: string, config?: AxiosRequestConfig | undefined) {
  const promise = http.get<ApiResult<T>>(url, config)
  return promise.then((res) => res.data.data)
}

export function del<T = any>(url: string, config?: AxiosRequestConfig | undefined) {
  const promise = http.delete<ApiResult<T>>(url, config)
  return promise.then((res) => res.data.data)
}

export function post<T = any>(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
  const promise = http.post<ApiResult<T>>(url, data, config)
  return promise.then((res) => res.data.data)
}

export function put<T = any>(url: string, data?: any, config?: AxiosRequestConfig | undefined) {
  const promise = http.put<ApiResult<T>>(url, data, config)
  return promise.then((res) => res.data.data)
}

// 导出 Axios 实例
export default http
