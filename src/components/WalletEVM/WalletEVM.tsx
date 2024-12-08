import React from 'react'

import { ConnectKitButton } from 'connectkit'

const WalletEVM = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address }: any) => {
        return (
          <button onClick={show} className='bg-blue-500 px-4 py-2 rounded-3xl'>
            {isConnected ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect'}
          </button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}
export default React.memo(WalletEVM)
