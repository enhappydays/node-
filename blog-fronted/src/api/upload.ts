import { post, get } from '@/utils/request'

export const uploadImage = (data: FormData) => {
  return post('/api/user/image/upload', data)
}
