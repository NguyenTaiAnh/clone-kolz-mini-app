// import { walletApi } from '@apis/wallet.api'
import { LoadingIcon } from '@assets/icons'
import { Button } from '@components/ui/button'
import { useToast } from '@hooks/use-toast'
import { cn } from '@lib/utils'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { Copy } from 'lucide-react'
import React from 'react'

interface ConnectWalletTonProps {
  task: any
  setIsOpen: (isOpent: boolean) => void
  handleStartTask: any
  handleClaim: any
  isClaimLoading: boolean
}
const ConnectWalletTon: React.FC<ConnectWalletTonProps> = ({
  task,
  setIsOpen,
  handleStartTask,
  handleClaim,
  isClaimLoading
}) => {
  const [tonConnectUI] = useTonConnectUI()
  const { toast } = useToast()
  // const [showModal, setShowModal] = useState(false)
  // const { clicks, handleCardClick, handleAnimationEnd } = useClickable()

  const rawAddress = useTonAddress(false)
  const userFriendlyAddress = useTonAddress()
  const shortAddress = userFriendlyAddress.slice(0, 6) + '...' + userFriendlyAddress.slice(-4)

  const disconnect = async () => {
    await tonConnectUI.disconnect()
    // await walletApi.disconnectWalletAddress({ wallet_address: userFriendlyAddress, wallet: 'ton' })
  }

  // const handleConnectWalletAddress = async () => {
  //   // await walletApi.connectWalletAddress({ wallet_address: userFriendlyAddress, wallet: 'ton' })
  // }
  const handleStart = () => {
    !task.started && handleStartTask()
    tonConnectUI.openModal()
    setIsOpen(false)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(userFriendlyAddress)
      // setShowModal(true)
      // setTimeout(() => {
      //   setShowModal(false)
      // }, 500)
      toast({
        title: 'Success',
        description: 'Address copied to clipboard!',
        duration: 3000,
        variant: 'default'
      })
    } catch (err) {
      console.error('Lỗi khi sao chép!', err)
    }
  }

  // React.useEffect(() => {
  //   if (rawAddress) handleConnectWalletAddress()
  // }, [rawAddress])
  return (
    <>
      {task.started && rawAddress ? (
        <div className='flex flex-col gap-3'>
          <div className='flex gap-2 items-center'>
            <p className='text-center'>{shortAddress}</p>

            <button
              onClick={handleCopyLink}
              className='relative  p-3 w-content text-xs rounded-xl text-gray-400'
            >
              <Copy size={18} />
            </button>
          </div>
          <button
            onClick={disconnect}
            className='relative px-4 py-2 w-content text-xs rounded-3xl border-[#417dc5] bg-slate-600'
          >
            disconnect
          </button>
          <div className='mt-3 flex justify-center pt-4'>
            {!task.claimed && (
              <Button
                className={cn(' h-auto font-bold px-5 py-3 bg-[#65C0E4] text-white rounded-3xl')}
                variant={'link'}
                size='lg'
                onClick={handleClaim}
                disabled={(task.claimed && task.started) || isClaimLoading || !task.started}
              >
                {isClaimLoading ?  <><LoadingIcon /> Receiving...</> : 'Claim'}
              </Button>
            )}
          </div>
        </div>
      ) : (
        <button className={cn('px-4 py-2 bg-[#65C0E4] justify-center rounded-3xl')} onClick={handleStart}>
          Connect
        </button>
      )}
    </>
  )
}
export default React.memo(ConnectWalletTon)
