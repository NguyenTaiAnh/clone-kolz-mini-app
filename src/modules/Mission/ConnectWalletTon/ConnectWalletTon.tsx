import { walletApi } from '@apis/wallet.api'
import { useToast } from '@hooks/use-toast'
import { cn } from '@lib/utils'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { Copy } from 'lucide-react'
import React from 'react'

interface ConnectWalletTonProps {
  task: any
  setIsOpen: (isOpent: boolean) => void
}
const ConnectWalletTon: React.FC<ConnectWalletTonProps> = ({ task, setIsOpen }) => {
  const [tonConnectUI] = useTonConnectUI()
  const { toast } = useToast()
  // const [showModal, setShowModal] = useState(false)
  // const { clicks, handleCardClick, handleAnimationEnd } = useClickable()

  const rawAddress = useTonAddress(false)
  const userFriendlyAddress = useTonAddress()
  const shortAddress = userFriendlyAddress.slice(0, 6) + '...' + userFriendlyAddress.slice(-4)

  const disconnect = async () => {
    await tonConnectUI.disconnect()
    await walletApi.disconnectWalletAddress({ wallet_address: userFriendlyAddress, wallet: 'ton' })
  }

  const handleConnectWalletAddress = async () => {
    await walletApi.connectWalletAddress({ wallet_address: userFriendlyAddress, wallet: 'ton' })
  }
  const handleStart = () => {
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

  React.useEffect(() => {
    if (rawAddress) handleConnectWalletAddress()
  }, [rawAddress])

  return (
    <>
      {task.started && rawAddress ? (
        <div className='flex flex-col gap-3'>
          <p className='text-center'>{shortAddress}</p>
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
      )}
    </>
  )
}
export default React.memo(ConnectWalletTon)
