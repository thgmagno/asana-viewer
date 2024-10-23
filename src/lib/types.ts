/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Entity {
  gid: string
  name: string
  resource_type: string
}

interface Parent extends Entity {
  resource_subtype: string
}

interface Membership {
  project: Entity
  section: Entity
}

export interface Task {
  gid: string
  actual_time_minutes: number | null
  assignee: Entity
  assignee_status: string
  completed: boolean
  completed_at: string | null
  created_at: string
  due_at: string | null
  due_on: string | null
  followers: Entity[]
  hearted: boolean
  hearts: any[]
  liked: boolean
  likes: any[]
  memberships: Membership[]
  modified_at: string
  name: string
  notes: string
  num_hearts: number
  num_likes: number
  parent: Parent | null
  permalink_url: string
  projects: Entity[]
  resource_type: string
  start_at: string | null
  start_on: string | null
  subtasks: Task[]
  tags: any[]
  resource_subtype: string
  workspace: Entity
}
