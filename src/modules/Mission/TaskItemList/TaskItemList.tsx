import { Check, Gem } from 'lucide-react'
import React from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

// import { hamsterCoin, telegramIcon, tiktokIcon, xIcon, youtubeIcon } from '@assets/images'
import { Sheet, SheetContent, SheetTitle } from '@components/ui/sheet'
import { conditionSocial } from '@constants/conditionSocial'
import { TaskItem } from '@interfaces/task.interface'
// import { formatProfitPerHour } from '@utils'
import { TaskContent } from '../TaskContent'
import { CoinIcon, EvmIcon, TonIcon, xIcon } from '@assets/images'
import { useAccount } from 'wagmi'
import { taskApi } from '@apis/task.api'

interface TaskItemListProps {
  task: TaskItem
}
const TaskItemList: React.FC<TaskItemListProps> = ({ task }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { isConnected } = useAccount()
  React.useEffect(() => {
    console.log('vchecl')
    const startTask = async () => {
      await taskApi.postStartTask(task.id)
    }
    if (task.social_type_id == 7 && !task.started && isConnected) {
      startTask()
    }
  }, [isConnected,task])
  const renderSocialIcon = (param: number) => {
    switch (param) {
      case conditionSocial.X:
        return <img src={xIcon} alt='airdrop' className='h-[42px]' />

      case 6:
        return <img src={TonIcon} alt='airdrop' className='h-[42px]' />

      case 7:
        return <img src={EvmIcon} alt='airdrop' className='h-[42px]' />

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
        key={task.id}
        className='bg-white  rounded-2xl  py-2 leading-3 flex justify-between items-center space-x-4 px-4 mb-5'
      >
        <div className='text-black flex items-center gap-2'>
          {renderSocialIcon(task.social_type_id)}
          <div className=''>
            <p className='text-base leading-none font-semibold'>{task.name}</p>
            <p className='flex gap-2 items-center'>
              <span className='text-yellow-400 text-sm'>+{task.points} </span>
              <img src={CoinIcon} alt='airdrop' className='h-5' />
            </p>
          </div>
        </div>
        {task.claimed ? (
          <Check className='h-8 w-8 text-green-400 ' />
        ) : (
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-3xl flex items-center'
            onClick={() => setIsOpen(true)}
          >
            <ArrowRightIcon className='h-5 w-5' />
          </button>
        )}
      </div>

      <Sheet open={isOpen} onOpenChange={(open: boolean) => setIsOpen(open)}>
        <SheetContent
          aria-describedby=''
          onInteractOutside={(e) => e.preventDefault()}
          side={'bottom'}
          className='rounded-t-[38px] border-t-0 bg-[#417dc5] top-glow p-0 text-white'
          classNameIcon='right-4 top-8 focus:ring-0 '
        >
          <SheetTitle></SheetTitle>
          {isOpen && <TaskContent task={task} isOpen={isOpen} setIsOpen={setIsOpen} />}
        </SheetContent>
      </Sheet>
    </>
  )
}
export default TaskItemList
