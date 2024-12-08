import { EvmIcon } from '@assets/images'
import { Sheet, SheetContent, SheetTitle } from '@components/ui/sheet'
import { WalletEVM } from '@components/WalletEVM'
import React from 'react'
interface ModalWalletEVMProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}
const ModalWalletEVM: React.FC<ModalWalletEVMProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Sheet open={isOpen} onOpenChange={(open: boolean) => setIsOpen(open)}>
      <SheetContent
        aria-describedby=''
        onInteractOutside={(e) => e.preventDefault()}
        side={'bottom'}
        className='rounded-t-[38px] border-t-0 bg-[#7dc5db] top-glow p-0 text-white'
        classNameIcon='right-4 top-8 focus:ring-0 '
      >
        <SheetTitle></SheetTitle>
        <div className='bg-[#222326] h-full w-full rounded-t-[38px] mt-[2px] py-6 px-4'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-2'>
            {/* {renderSocialIcon(task.social_type_id)} */}
            <img src={EvmIcon} alt='airdrop' className='h-[42px]' />
            <span>EVM Wallet</span>
          </div>
          <p className='text-base font-semibold text-center flex items-center justify-center py-4'>
          <WalletEVM />
          </p>
        </div>

       
      </div>
      </SheetContent>
    </Sheet>
  )
}
export default React.memo(ModalWalletEVM)
