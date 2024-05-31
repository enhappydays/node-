import { put, post, get } from '@/utils/request'

export const getUserProfile = () => {
  return get('/api/user/profile')
}
export const updatePassword = (params: any) => {
  return put('/api/user/profile/password', params)
}
export const updateAvatar = (avatar: string) => {
  return post('/api/user/profile/avatar', { avatar })
}
export const updateBaseInfo = (nickname: string) => {
  return put('/api/user/profile/baseinfo', { nickname })
}
