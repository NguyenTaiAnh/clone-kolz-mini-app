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
    }
    setIsOpen(false)
  }


  return (
    <section className='flex flex-col items-center justify-center gap-5 mb-4'>
      <div onClick={handleStart}>
        <WalletEVM />
      </div>
      {!task.claimed && isConnected  && (
        <div >
            <ConnectKitButton.Custom>
              {({ isConnected,  address, }: any) => {
                return (
                  isConnected &&
                  address && (
                    <Button
                      className={cn(' h-auto font-bold px-5 py-3 bg-[#65C0E4] text-white rounded-3xl ')}
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
    </section>
  )
}
export default React.memo(ConnectWalletEVM)
