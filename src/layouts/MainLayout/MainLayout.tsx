import { BottomNavigationBar } from '@components'
import { Header } from '@components/Header'
import React from 'react'
interface MainLayoutProps {
  children: React.ReactNode
}
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className='h-screen w-full max-w-xl mx-auto bg-black text-white'>
      <div className='flex flex-col h-full overflow-y-auto'>
      <Header/>
      {children} 
      <BottomNavigationBar />
      </div>
    </div>
  )
}

export default MainLayout
