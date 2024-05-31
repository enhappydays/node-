import { put, post, get } from '@/utils/request'

export const listCategories = () => {
  return get('/api/categories')
}
