export const setLocalStorage = <T = any>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = <T = any>(key: string): T | null => {
  const value = localStorage.getItem(key)
  try {
    if (!value) return null
    return JSON.parse(value)
  } catch {
    return value as any
  }
}

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}
export const formatNumber = (num: number) => {
  const integerPart = Math.floor(num)
  const decimalPart = num - integerPart

  if (decimalPart >= 0.5) {
    return Math.ceil(num)
  } else {
    return Math.floor(num)
  }
}
