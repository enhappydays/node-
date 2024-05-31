import { put, post, get } from '@/utils/request'

export const listBlogArticles = (data: {
  categoryId: string
  pageNo: number
  pageSize: number
}) => {
  return get('/api/articles', {
    params: data
  })
}
export const getArticleDetail = (id: string) => {
  return get(`/api/articles/${id}`)
}
