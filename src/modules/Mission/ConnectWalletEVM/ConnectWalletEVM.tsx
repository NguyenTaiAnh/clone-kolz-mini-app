import { Web3Provider } from '@context/Web3Provider/Web3Provider'
import React from 'react'
import { ConnectKitButton } from 'connectkit'
import { WalletEVM } from '@components/WalletEVM'
import { Button } from '@components/ui/button'
import { cn } from '@lib/utils'

interface ConnectWalletEVMProps {
  task: any
  setIsOpen: (isOpent: boolean) => void
  handleStartTask: any
  handleClaim: any
  isClaimLoading: boolean
}
const ConnectWalletEVM: React.FC<ConnectWalletEVMProps> = ({
  task,
  setIsOpen,
  handleStartTask,
  handleClaim,
  isClaimLoading
}) => {
  const handleStart = () => {
    if(!task.started){
      handleStartTask()
      setIsOpen(false)
    }
  }
  return (
    <>
      <div onClick={handleStart}>
        <WalletEVM />
      </div>
      {!task.claimed && (
        <div>
          <Web3Provider>
            <ConnectKitButton.Custom>
              {({ isConnected, isConnecting, show, hide, address, ensName, chain }: any) => {
                return (
                  isConnected &&
                  address && (
                    <Button
                      className={cn(' h-auto font-bold px-5 py-3 bg-[#65C0E4] text-white rounded-3xl')}
                      variant={'link'}
                      size='lg'
                      onClick={handleClaim}
                      disabled={(task.claimed && task.started) || isClaimLoading || !task.started}
                    >
                      {isClaimLoading ? 'Receiving...' : 'Claim'}
                    </Button>
                  )
                )
              }}
            </ConnectKitButton.Custom>
          </Web3Provider>
        </div>
      )}
      {/* <appkit-button /> */}
      {/* {task.started && address ? (
        <div className='flex flex-col gap-3'>
          <p className='text-center'>{address}</p>
          <div className='flex gap-2'>
            <button
              onClick={disconnect}
              className='relative bg-gradient-to-b from-[#749099] p-3 w-content text-xs rounded-xl to-[#7dc5db]'
            >
              disconnect
            </button>
            <button
              onClick={handleCopyLink}
              className='relative bg-gradient-to-b from-[#749099] p-3 w-content text-xs rounded-xl to-[#7d99db]'
            >
              <Copy />
            </button>
          </div>
        </div>
      ) : (
        <button className={cn('py-2 bg-[#65C0E4] justify-center rounded-lg w-[100px]')} onClick={() => handleStart()}>
          Connect
        </button>
      )} */}
    </>
  )
}
export default React.memo(ConnectWalletEVM)
