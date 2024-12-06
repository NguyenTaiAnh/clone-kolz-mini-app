export interface DataInviteFriends {
  friends: FriendElement[]
  tasks: Task[]
  referral_code: string
}

export interface FriendElement {
  id: string
  friend_id: string
  friend: Friend
}

export interface Friend {
  id: string
  telegram_id: number
  telegram_username: string
  telegram_firstname: string
  telegram_lastname: null
  points: string
  profit_per_hour: string
}

export interface Task {
  id: string
  name: string
  social_type_id: number
  social_info: string
  coins: string
  started: boolean
  claimed: boolean
}
