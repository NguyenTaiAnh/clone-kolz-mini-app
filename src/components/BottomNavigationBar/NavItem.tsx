import { cn } from '@lib/utils'
import React from 'react'

interface NavItemProps {
  className: string
  onClick: () => void
  icon: React.ReactNode
  isCenter: boolean
}

const NavItem: React.FC<NavItemProps> = ({ className, onClick, icon, isCenter = false }) => (
  <div
    className={cn(
      className,
      {
        'min-h-16 flex flex-col justify-between': true
      },
      isCenter && 'relative bg-[#ffffff] h-[75px] w-[80px] rounded-full shadow-lg -translate-y-8 border-4 border-[#222326]'
    )}
    onClick={onClick}
  >
    {icon}
    {/* <p className='mt-1'>{label}</p> */}
  </div>
)

export default NavItem
