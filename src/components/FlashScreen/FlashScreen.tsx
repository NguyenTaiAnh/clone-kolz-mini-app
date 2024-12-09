import React, { useState } from 'react'
// import { useStore } from "@stores";
import { KolzIcon } from '@assets/images'

const DURATION = 5000 // 5s

const FlashScreen: React.FC = () => {
  // const { setGlobalLoading } = useStore((state) => state)

  const [progress, setProgress] = useState(0)
  // const [apiResponseReceived, setApiResponseReceived] = useState(false);
  // const [startTime] = useState(Date.now());
  // const { setUser } = useAuth();

  React.useEffect(() => {
    const targetValue = 98
    const increment = (targetValue - progress) / (DURATION / 100) // increment per 100ms

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= targetValue) {
          clearInterval(interval)
          return targetValue
        }
        return prev + increment
      })
    }, 100)

    return () => clearInterval(interval)
  }, [progress])
  // useEffect(() => {
  //   return () => {
  //     setGlobalLoading(false)
  //   }
  // }, [])
  return (
    <div className='fixed inset-0 bg-[#222326] text-white flex flex-col justify-center items-center z-50'>
      <div className='z-10 mb-6'>
        <img src={KolzIcon} alt='Kolz Icon' className='w-25 h-25' />
      </div>

      <div className='relative w-3/4 h-4 bg-gray-700 rounded-full overflow-hidden z-10'>
        <div style={{ width: `${progress}%` }} className='h-full bg-[#193782] transition-all ease-out duration-300' />
      </div>
    </div>
  )
}

export default FlashScreen
