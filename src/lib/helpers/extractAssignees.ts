import { Task } from '../types'

export const extractAssignees = (data: Task[] | null) => {
  if (!data) return []

  const assignees = data
    .map((task) => task.assignee?.name ?? 'N/A')
    .filter((name) => name !== 'N/A')

  return Array.from(new Set(assignees))
}
