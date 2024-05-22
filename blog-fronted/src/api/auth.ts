import { post, get } from '@/utils/request'

export const register = (data: { username: string; nickname: string; password: string }) => {
  return post('/api/register', data)
}

export const captcha = () => {
  return get<{ key: string; svg: string }>('/api/captcha')
}
export const login = (data: {
  username: string
  captchaKey: string
  password: string
  captchaCode: string
}) => {
  return post<string>('/api/login', data)
}
