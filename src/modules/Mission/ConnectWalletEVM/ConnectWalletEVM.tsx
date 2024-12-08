import React from 'react'
import { ConnectKitButton } from 'connectkit'
import { WalletEVM } from '@components/WalletEVM'
import { Button } from '@components/ui/button'
import { cn } from '@lib/utils'
import { LoadingIcon } from '@assets/icons'
import { useAccount } from 'wagmi'

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
  const {isConnected} = useAccount()
  const handleStart = () => {
    if(!task.started){
      handleStartTask()
      setIsOpen(false)
    }
  }


  return (
    <section className='flex flex-col items-center justify-center gap-5'>
      <div onClick={handleStart}>
        <WalletEVM />
      </div>
      {!task.claimed && isConnected  && (
        <div>
            <ConnectKitButton.Custom>
              {({ isConnected,  address, }: any) => {
                return (
                  isConnected &&
                  address && (
                    <Button
                      className={cn(' h-auto font-bold px-5 py-3 bg-[#65C0E4] text-white rounded-3xl')}
                      variant={'link'}
                      size='lg'
                      onClick={handleClaim}
                      disabled={(task.claimed && isConnected) || isClaimLoading}
                    >
                      {isClaimLoading ?  <><LoadingIcon /> Receiving...</> : 'Claim'}
                    </Button>
                  )
                )
              }}
            </ConnectKitButton.Custom>
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
    </section>
  )
}
export default React.memo(ConnectWalletEVM)
