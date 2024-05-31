import { baseURL } from './request'
import defaulturl from '@/assets/logo.svg'
export const getAvatarImage = (path: string): string => {
  return path ? baseURL + path : defaulturl
}
