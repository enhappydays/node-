import { post, get } from '@/utils/request'

export const getUserProfile = () => {
  return get('/api/user/profile')
}
