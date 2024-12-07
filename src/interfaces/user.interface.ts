export interface CurrentUser {
  id: string
  telegram_id: number
  username: string
  first_name: string
  last_name: null
  user_type_name: string
  points: string
  energies:string
  profit_per_hour: string
  coins_to_level_up: string
  coins_per_tap: string
  daily_booster: DailyBooster
  friends: Friend[]
  ceo_level: CeoLevel
  latest_checkin:any
}

export interface CeoLevel {
  name: string
  points_from: string
  points_to: string
}

export interface DailyBooster {
  refill_full_energy_remain: number
  refill_full_energy_total: number
  multiple_coins_gain_remain: number
  multiple_coins_gain_total: number
}

export interface Friend {
  id: string
  user_id: string
  friend_id: string
}
export interface AuthenticateRequest {
  telegram_id: number
  telegram_username: string
  telegram_firstname: string
  telegram_lastname: string
  user_type_id: string
  is_premium: boolean
}

export interface AuthenticateResponse {
  token: string
  is_new_user: boolean
  age: number
  is_premium: boolean
}

export interface DataCardAuth {
  data: DatumCard[]
  total: number
}

interface DatumCard {
  id: string
  name: string
  cards: CardItem[]
}

export interface CardItem {
  id: string
  name: string
  condition_type_id: number
  locked: boolean
  level_can_buy?: number
  level_coins?: string
  level_profit_per_hour?: string
  at_level_maximum?: boolean
  depend_on_card_id?: string
  depend_on_card_level?: number
  friends_amount?: number
  invited_friends?: number
  depend_on_card_name?: string
}
