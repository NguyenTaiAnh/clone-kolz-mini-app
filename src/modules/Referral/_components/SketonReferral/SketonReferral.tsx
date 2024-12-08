import { Skeleton } from '@components/ui/skeleton'
import React from 'react'
interface SketonReferralProps {
    size: number
    keyName: string
  }
 const SketonReferral:React.FC<SketonReferralProps> = ({size, keyName}) => {
  return (
    <>
    {Array.from({ length: size }).map((_, index) => {
        return (
          <div
            key={`${keyName}-${index}`}
            className='bg-white  rounded-lg p-4 leading-3 flex justify-between items-center space-x-4 px-4 mb-5'
          >
            <div className='flex items-center gap-2'>
              <Skeleton className='w-10 h-[42px]' />
              <div className='flex flex-col justify-center gap-2'>
                <Skeleton className='w-[110px] h-5 rounded-full' />
              </div>
            </div>
            <div className='flex items-center gap-3'>

              <Skeleton className='w-5 h-5 rounded-full' />
              <Skeleton className='w-5 h-5 rounded-full' />
            </div>
          </div>
        )
      })}
    </>
  )
}

export default React.memo(SketonReferral)