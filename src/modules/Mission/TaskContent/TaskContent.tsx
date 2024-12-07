import { taskApi } from '@apis/task.api'
import { Gem } from 'lucide-react'

// import { hamsterCoin, mainCharacter, telegramIcon, tiktokIcon, xIcon, youtubeIcon } from '@assets/images'
import { Button } from '@components/ui/button'
import { conditionSocial, urlSocial } from '@constants/conditionSocial'
import { QueryKeys } from '@constants/queryKeys'
// import { useGetClaim } from '@hooks'
import { TaskItem } from '@interfaces/task.interface'
import { cn } from '@lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { formatProfitPerHour } from '@utils'
import React, { useEffect, useMemo, useState } from 'react'
import { DialogConfirm } from '../DialogConfirm'
import { Twitter } from '@assets/icons'
import { CoinIcon } from '@assets/images'
import useGetClaim from '@hooks/queries/useGetClaim'
import { ConnectWalletTon } from '../ConnectWalletTon'

interface TaskContentProps {
  task: TaskItem
  isOpen?: boolean
  setIsOpen: (open: boolean) => void
}

const TaskContent: React.FC<TaskContentProps> = ({ task, isOpen, setIsOpen }) => {
  const queryClient = useQueryClient()

  const [isClaiming, setIsClaiming] = useState(false)
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const urlSocialMapping: Record<number, string> = useMemo(
    () => ({
      [conditionSocial.YOUTUBE]: urlSocial.YOUTUBE,
      [conditionSocial.TIKTOK]: urlSocial.TIKTOK,
      [conditionSocial.TELEGRAM]: urlSocial.TELEGRAM
    }),
    []
  )
  const controller = new AbortController()
  const signal = controller.signal

  const { mutateAsync: startTask } = useMutation({
    mutationFn: (id: string) => taskApi.postStartTask(id),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QueryKeys.TASKS],
        type: 'active'
      })

      setIsLoading(false)
      
      // if (task.link) {
      //   window.open(task.link || '', '_blank', 'noopener noreferrer')
      // } else {
      //   window.open(urlSocialMapping[task.social_type_id] + task.social_info || '', '_blank', 'noopener noreferrer')
      // }
      if (task.link) {
        window.location.href = task.link || ''
        
      } else {
        window.location.href = urlSocialMapping[task.social_type_id] + task.social_info || ''
      }

      setIsDialogVisible(false)

      setIsClaiming(false)
    },
    onError: () => {
      setIsClaiming(false)
      setIsLoading(false)
    },
    onSettled: () => {
      setIsClaiming(false)
    }
  })

  const renderSocialIcon = (param: number) => {
    switch (param) {
      // case conditionSocial.TELEGRAM:
      //   return <img src={telegramIcon} alt='Main Character' className='w-[80%] h-[80%] rounded-full' />
      // case conditionSocial.TIKTOK:
      //   return <img src={tiktokIcon} alt='Main Character' className='w-[80%] h-[80%] rounded-full' />
      // case conditionSocial.YOUTUBE:
      //   return <img src={youtubeIcon} alt='Main Character' className='w-[80%] h-[80%] rounded-full' />
      case conditionSocial.X:
        return <Twitter className='w-[80%] h-[80%] rounded-full' />
      // return <img src={xIcon} alt='Main Character' className='w-[80%] h-[80%] rounded-full' />

      default:
        return <Gem size={42} />
    }
  }

  const claimQuery = useGetClaim(
    task,
    {
      enabled: isClaiming,
      gcTime: 0,
      staleTime: 0
    },
    signal
  )

  const isClaimLoading = useMemo(() => claimQuery.isLoading, [claimQuery])

  useEffect(() => {
    if (claimQuery.isFetched && claimQuery.isSuccess && claimQuery.data) {
      setIsOpen(false)
    }
  }, [claimQuery.isFetched && claimQuery.isSuccess && claimQuery.data])

  useEffect(() => {
    return () => {
      controller.abort()
    }
  }, [isOpen])

  const handleClaim = () => {
    setIsClaiming(true)
    claimQuery.refetch()
  }

  const handleStartTask = async (id: string) => {
    setIsLoading(true)
    try {
      await startTask(id)
    } catch (error) {
      setIsLoading(false)

      console.error(error)
    }
  }

  const renderButtonStartTask = () => {
    if (task.link) {
      return (
        <button
          className={cn('py-2 bg-slate-400 justify-center rounded-lg w-[100px]', {
            'bg-[#65C0E4]': !task.started
          })}
          onClick={() => !task.started && setIsDialogVisible(true)}
        >
          {task.started ? 'Joined' : 'Join'}
        </button>
      )
    }
    if (task.social_type_id == 7) {
    }

    if (task.social_type_id == 6) {
      return (
        <ConnectWalletTon task={task} setIsOpen={setIsOpen}/>
        
      )
    }
  }

  return (
    <>
      <div className='bg-[black] h-full w-full rounded-t-[38px] mt-[2px] py-6 px-4'>
        <div className='bg-[#272a2f] py-8 px-6 rounded-3xl relative mt-8'>
          <div className='absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-black rounded-full p-2'>
            <div className='bg-[#272a2f] rounded-full w-full h-full flex items-center justify-center'>
              {renderSocialIcon(task.social_type_id)}
              {/* <img src={mainCharacter} alt='Main Character' className='w-[80%] h-[80%]' /> */}
            </div>
          </div>
          <div className='flex flex-col items-center gap-4 mt-4'>
            <div className='flex justify-center items-center gap-3 '>
              <img src={CoinIcon} alt='Task Icon' className='h-14 w-14' />
              <span className='text-[32px] text-white font-extrabold font-jetbrains text-gradient'>
                {/* {formatProfitPerHour(Number(task.coins || 0))} */}
                {task.points || 0}
              </span>
            </div>

            <p className='text-base font-semibold text-center'>{task.claimed? 'You are claimed' :task.name }</p>
            <div className='flex justify-center'>{renderButtonStartTask()}</div>
          </div>
        </div>

        <div className='mt-3 flex justify-center'>
          <Button
            // loading={!!isClaimLoading}
            className={cn(
              ' h-auto font-bold px-5 py-3',
              (task.claimed && task.started) || isClaimLoading || !task.started
                ? 'bg-slate-400 text-white'
                : 'bg-[#65C0E4] text-white'
            )}
            variant={'link'}
            size='lg'
            onClick={handleClaim}
            disabled={(task.claimed && task.started) || isClaimLoading || !task.started}
          >
            {isClaimLoading ? 'Receiving...' : 'Check'}
          </Button>
        </div>
      </div>
      <DialogConfirm
        task={task}
        isShow={isDialogVisible}
        setIsShow={setIsDialogVisible}
        onClickAction={handleStartTask}
        urlSocialMapping={urlSocialMapping}
        isLoading={isLoading}
      />
    </>
  )
}

export default TaskContent
