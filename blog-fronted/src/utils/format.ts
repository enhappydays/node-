import { dayjs } from 'element-plus'

export function formatDate(date: string): string {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}
