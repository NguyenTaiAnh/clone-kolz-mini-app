import React from 'react'
import { Sheet, SheetContent, SheetTitle } from '@components/ui/sheet'
import { Telegram, Twitter } from '@assets/icons'
interface ModalInfoSocialProps {
  state: boolean
  setState: (state: boolean) => void
  title: string
  data: any
}
const ModalInfoSocial: React.FC<ModalInfoSocialProps> = ({ state, setState, title, data = null }) => {
  return (
    <Sheet open={state} onOpenChange={(open: boolean) => setState(open)}>
      <SheetContent
        aria-describedby=''
        onInteractOutside={(e) => e.preventDefault()}
        side={'bottom'}
        className='flex flex-col gap-3'
      >
        <SheetTitle className='flex items-center gap-3'>
          {title == 'X' ? (
            <Twitter className='w-[40px] h-[40px] bg-black ' />
          ) : (
            <Telegram className='w-[40px] h-[40px] bg-black rounded-full' />
          )}
          {title}
        </SheetTitle>
        <p className='text-black'>
          id:
          <span className='pl-2 font-semibold'>{data?.id}</span>
        </p>
        <p className='text-black'>
          username:
          <span className='pl-2 font-semibold'>{data?.username}</span>
        </p>
      </SheetContent>
    </Sheet>
  )
}
export default React.memo(ModalInfoSocial)
