import { Skeleton } from '@components/ui/skeleton'
import React from 'react'
interface SketonCharacterProps {
    size: number
    keyName: string
  }
 const SketonCharacter:React.FC<SketonCharacterProps> = ({size, keyName}) => {
  return (
    <>
    {Array.from({ length: size }).map((_, index) => {
        return (
          <div
            key={`${keyName}-${index}`}
            className='rounded-3xl p-4 flex flex-col items-center bg-[#193782]'
          >
            <Skeleton className='w-24 h-24 rounded-full' />
            <div className='space-y-2'>
              {/* <Skeleton className='w-[10px] h-4' /> */}
              <div className='flex items-center gap-2'>
                <Skeleton className='w-[100px] p-5 mt-3 h-3 rounded-full' />
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default React.memo(SketonCharacter)