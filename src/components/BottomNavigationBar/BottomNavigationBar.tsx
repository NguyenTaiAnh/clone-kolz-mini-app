import { Snowflake } from 'lucide-react'
import { memo, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { PATH } from '@routes/path'
import NavItem from './NavItem'

const BottomNavigationBar = () => {
  const [activeButton, setActiveButton] = useState<string | null>(PATH.HOME)
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (path: string) => {
    setActiveButton(path)
    navigate(path)
  }

  const getClassNames = (button: string) => {
    return `text-center text-[#85827d] w-1/5 m-1  p-2 ${activeButton === button ? 'rounded-2xl bg-[#1c1f24] opacity-1 text-[#C79B00]' : ''}`
  }

  const memoizedClassNames = useMemo(
    () => ({
      home: getClassNames(PATH.HOME),
      referral: getClassNames(PATH.REFERRAL),
      mission: getClassNames(PATH.MISSION),
      chat: getClassNames(PATH.CHAT)
    }),
    [activeButton]
  )

  useEffect(() => {
    const path = location.pathname
    setActiveButton(path || PATH.HOME)
  }, [location])

  const navList = [
    {
      className: memoizedClassNames.home,
      onClick: () => handleClick(PATH.HOME),
      icon: <img src={''} alt='home' className='w-7 h-7 mx-auto' />,
      isCenter:false
    },
    {
      className: memoizedClassNames.chat,
      onClick: () => handleClick(PATH.CHAT),
      icon: '',
      isCenter:false
    },
    {
      className: memoizedClassNames.mission,
      onClick: () => handleClick(PATH.MISSION),
      icon: '',
      isCenter:false
    },
    {
      className: memoizedClassNames.referral,
      onClick: () => handleClick(PATH.REFERRAL),
      icon: <Snowflake className='w-6 h-6 mx-auto' />,
      isCenter:false
    },
    {
      className: '',
      onClick: () => {},
      icon: <Snowflake className='w-6 h-6 mx-auto' />,
      isCenter:true
    }
  ]

  return (
    <div className='fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-xl w-full bg-white flex justify-around items-center z-50 rounded-t-3xl text-xs'>
      {navList.map(({ className, onClick, icon, isCenter }, index) => (
        <NavItem key={`nav-item-${index}`} className={className} onClick={onClick} icon={icon} isCenter={isCenter} />
      ))}
    </div>
  )
}

export default memo(BottomNavigationBar)
