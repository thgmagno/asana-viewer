import { Task } from '../types'

export const orderByDateDesc = (data: Task[] | null) => {
  if (!data) return []

  return data.sort((a, b) => b.created_at.localeCompare(a.created_at))
}
