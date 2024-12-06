export interface DataHistories {
  total: number
  data: Histories[]
}

export interface Histories {
  day_id: number
  rewards: number
  createdAt: string
}
