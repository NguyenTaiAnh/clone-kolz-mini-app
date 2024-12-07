import fetcher from './fetcher'

export const walletApi = {
  connectWalletAddress: async (payload: { wallet_address: string; wallet: string }) => {
    try {
      const response = await fetcher.post<any>('/wallet/link', payload)
      return response.data
    } catch (error: any) {
      console.log(error)
    }
  },
  disconnectWalletAddress: async (payload: { wallet_address: string; wallet: string }) => {
    try {
      const response = await fetcher.post<any>('/wallet/unlink', payload)
      return response.data
    } catch (error: any) {
      console.log(error)
    }
  },
  saveTransaction: async (payload: { wallet_address: string; amount: number; transaction_id: string }) => {
    try {
      const response = await fetcher.post<any>('/wallet/transaction', payload)
      return response.data
    } catch (error: any) {
      console.log(error)
    }
  }
}
