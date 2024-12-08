import React from 'react'

import { Web3Provider } from '@context/Web3Provider/Web3Provider'
import { ConnectKitButton } from 'connectkit'

 const WalletEVM = () => {
  return (
    <Web3Provider>
      <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName, chain }:any) => {
        return (
          <button onClick={show} className="bg-blue-500 px-4 py-2 rounded-3xl">
            {isConnected ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect"}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
    </Web3Provider>
  )
}
export default React.memo(WalletEVM)