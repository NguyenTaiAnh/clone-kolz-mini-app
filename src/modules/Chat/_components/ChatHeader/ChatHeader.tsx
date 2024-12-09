import { ArrowLeftIcon } from '@assets/icons'
import { Progress, ProgressIndicator } from '@radix-ui/react-progress'
import React from 'react'
import { useNavigate } from 'react-router-dom'
interface ChatHeaderProps {
  characterId: any
}
const ChatHeader: React.FC<ChatHeaderProps> = ({ characterId }) => {
  console.log({ characterId })
  const imgSrc = 'https://pbs.twimg.com/profile_images/1828407448132083713/Rt-7Q0dK_400x400.png'

  const navigate = useNavigate()
  return (
    <section className='p-4'>
      <div className='  flex items-center justify-between'>
        <button
          className='flex items-center space-x-2 text-white hover:text-gray-300 bg-gray-600 rounded-2xl p-2'
          onClick={() => navigate('/')}
        >
          <ArrowLeftIcon className=' mr-1' /> Back
        </button>
        <h2 className='text-lg font-bold'>The Crypto Lord</h2>
        <div>
          <img src={imgSrc} alt='avatar' className='w-11 h-11 rounded-full' />
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <Progress value={33} className='w-[75%] h-1 bg-white'>
          <ProgressIndicator className='bg-[#007AFF] h-1 w-[50%]'></ProgressIndicator>
        </Progress>
        <p className='text-sm text-gray-400 pr-2'>Lvl 5</p>
      </div>
    </section>
  )
}

export default ChatHeader
