import { post, get, del, put } from '@/utils/request'

export const getArticle = (data: {
  categoryId?: string
  keyword?: string
  pageNo?: number
  pageSize?: number
}) => {
  return get<{ total: number; items: any[] }>('/api/user/articles', { params: data })
}
export const removeArticle = (id: string) => {
  return del(`/api/user/articles/${id}`)
}
export const getArticleType = () => {
  return get(`/api/categories`)
}
export function createArticle(data: {
  categoryId: string
  title: string
  summary: string
  content: string
}) {
  return post<boolean>('/api/user/articles', data)
}

export function updateArticle(data: {
  _id: string
  title: string
  summary: string
  content: string
  categoryId: string
}) {
  return put<boolean>(`/api/user/articles/${data._id}`, data)
}

export function getArticleDetail(id: string) {
  return get(`/api/user/articles/${id}`)
}
