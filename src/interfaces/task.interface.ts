export interface DataTask {
  data: TaskItem[]
  total: number
}

export interface TaskItem {
  id: string
  name: string
  social_type_id: number
  social_info: string
  coins: string
  started: boolean
  claimed: boolean
  link?: string
}
