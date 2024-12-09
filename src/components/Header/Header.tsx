import { AppIcon } from '@assets/images'
import { useStore } from '@stores'
import { EnergyIcon, PointIcon, Wallet } from '@assets/icons'
import { useLocation } from 'react-router'

import { PATH } from '@routes/path'
import { BackButton } from '@components/BackButton'
import React from 'react'
import { ModalWalletEVM } from '@components/ModalWalletEVM'
import { formatNumber } from '@utils'

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const currentUser = useStore((state) => state.currentUser)
  // const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname == PATH.HOME
  const { initialPoints } = useStore()
  return (
    <div className='w-full flex items-center justify-between p-4 bg-[#222326] text-white'>
      {!isHome && <BackButton onClick={() => window.history.back()} />}
      <img src={AppIcon} className='h-8 w-h-8 mr-2' />
      <div className='flex flex-col items-center'>
        <span className='text-white text-[24px] font-semibold leading-none'>{currentUser?.username}</span>
        <div className=' flex items-center justify-center p-1 gap-4 min-w-[200px]'>
          <p className='flex items-center gap-2 text-lg text-[#7FA2FF]'>
            <EnergyIcon />
            {currentUser?.energies}
          </p>
          <p className='flex items-center gap-2 text-lg text-[#FFD649]'>
            <PointIcon />
            {formatNumber(initialPoints)}
          </p>
        </div>
      </div>
      <div className='flex items-center' onClick={() => setIsOpen(true)}>
        <Wallet className='w-[30px] h-[30px]' />
      </div>
      <ModalWalletEVM isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default Header
