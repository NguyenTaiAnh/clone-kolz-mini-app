import { Gem } from 'lucide-react'
import React from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

// import { hamsterCoin, telegramIcon, tiktokIcon, xIcon, youtubeIcon } from '@assets/images'
import { Sheet, SheetContent, SheetTitle } from '@components/ui/sheet'
import { conditionSocial } from '@constants/conditionSocial'
import { TaskItem } from '@interfaces/task.interface'
// import { formatProfitPerHour } from '@utils'
import { TaskContent } from '../TaskContent'
import { CoinIcon, xIcon } from '@assets/images'

interface TaskItemListProps {
  task: TaskItem
}
const TaskItemList: React.FC<TaskItemListProps> = ({ task }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  console.log({ task })
  const renderSocialIcon = (param: number) => {
    console.log({ param })
    switch (param) {
      // case conditionSocial.TELEGRAM:
      //   return (
      //     <div>
      //       <img src={telegramIcon} alt='airdrop' className='h-[42px] rounded-full' />
      //     </div>
      //   )
      // case conditionSocial.TIKTOK:
      //   return (
      //     <div>
      //       <img src={tiktokIcon} alt='airdrop' className='h-[42px] rounded-full' />
      //     </div>
      //   )
      // case conditionSocial.YOUTUBE:
      //   return (
      //     <div>
      //       <img src={youtubeIcon} alt='airdrop' className='h-[42px] rounded-full' />
      //     </div>
      //   )
      case conditionSocial.X:
        return (
          <img src={xIcon} alt='airdrop' className='h-[42px]' />
          // <div>
          //   <Twitter className='h-[42px] w-[42px] bg-black'/>
          // </div>
        )

      default:
        return (
          <div>
            <Gem size={42} className='text-black' />
          </div>
        )
    }
  }
  return (
    <>
      <div
        // onClick={() => setIsOpen(true)}
        key={task.id}
        className='bg-white  rounded-2xl p-4 leading-3 flex justify-between items-center space-x-4 px-4 mb-5'
      >
        <div className='text-black flex items-center gap-2'>
          {renderSocialIcon(task.social_type_id)}
          <div className=''>
            <p className='text-lg'>{task.name}</p>
            <p className='flex gap-2 items-center'>
              {/* <span className='w-2 h-2 bg-yellow-400 rounded-full animate-blink'></span> */}
              <img src={CoinIcon} alt='airdrop' className='h-5' />
              <span className='text-yellow-400 text-sm'>{task.points} </span>
            </p>
          </div>
        </div>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-3xl flex items-center'
          onClick={() => setIsOpen(true)}
        >
          <ArrowRightIcon className='h-5 w-5' />
        </button>
      </div>

      <Sheet open={isOpen} onOpenChange={(open: boolean) => setIsOpen(open)}>
        <SheetContent
          aria-describedby=''
          onInteractOutside={(e) => e.preventDefault()}
          side={'bottom'}
          className='rounded-t-[38px] border-t-0 bg-[#7dc5db] top-glow p-0 text-white'
          // classNameIcon='right-4 top-5 focus:ring-0 '
        >
          <SheetTitle></SheetTitle>
          {isOpen && <TaskContent task={task} isOpen={isOpen} setIsOpen={setIsOpen} />}
        </SheetContent>
      </Sheet>
    </>
  )
}
export default TaskItemList
