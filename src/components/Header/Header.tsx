import { AppIcon } from '@assets/images'
import { useStore } from '@stores'
import { Wallet } from '@assets/icons'
import { useLocation, useNavigate } from 'react-router'

import { PATH } from '@routes/path'
import { BackButton } from '@components/BackButton'

const Header = () => {
  const currentUser = useStore((state) => state.currentUser)
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname == PATH.HOME
  const { initialPoints } = useStore()
  return (
    <div className='w-full flex items-center justify-between p-4 bg-[#222326] text-white'>
      {!isHome && <BackButton onClick={() => navigate('/')} />}
      <div className='flex items-center'>
        <img src={AppIcon} className='h-14 w-14 mr-2' />
        <div className='flex flex-col items-start p-1 min-w-[200px]'>
          <span className='text-white font-semibold'>{currentUser?.username}</span>
          <span className='text-yellow-500 font-bold text-xl'>{initialPoints}</span>
        </div>
      </div>
      <div className='flex items-center'>
        <Wallet className='w-[40px] h-[40px]' />
      </div>
    </div>
  )
}

export default Header
