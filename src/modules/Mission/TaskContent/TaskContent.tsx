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
import { LoadingIcon, Twitter } from '@assets/icons'
import { CoinIcon, EvmIcon, TonIcon } from '@assets/images'
import useGetClaim from '@hooks/queries/useGetClaim'
import { ConnectWalletTon } from '../ConnectWalletTon'
import { ConnectWalletEVM } from '../ConnectWalletEVM'

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
        return <Twitter className='w-[10%] h-[10%] rounded-full' />
      // return <img src={xIcon} alt='Main Character' className='w-[80%] h-[80%] rounded-full' />
      case 6:
        return <img src={TonIcon} alt='airdrop' className='h-[42px]' />

      case 7:
        return <img src={EvmIcon} alt='airdrop' className='h-[42px]' />
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

  const handleStartTask = async () => {
    setIsLoading(true)
    try {
      await startTask(task.id)
    } catch (error) {
      setIsLoading(false)

      console.error(error)
    }
  }

  const renderButtonStartTask = () => {
    if (task.link && !task.started) {
      return (
        <button
          className={cn('px-4 py-2 bg-slate-400 justify-center rounded-3xl mb-4', {
            'bg-[#65C0E4]': !task.started
          })}
          onClick={() => !task.started && setIsDialogVisible(true)}
        >
          start
        </button>
      )
    }
    if (task.social_type_id == 7) {
      return <ConnectWalletEVM task={task} setIsOpen={setIsOpen} handleStartTask={handleStartTask} handleClaim={handleClaim} isClaimLoading={isClaimLoading}/>
    }

    if (task.social_type_id == 6) {
      return <ConnectWalletTon task={task} setIsOpen={setIsOpen} handleStartTask={handleStartTask} handleClaim={handleClaim} isClaimLoading={isClaimLoading}/>
    }
  }
  

  return (
    <>
      <div className='bg-[#222326] h-full w-full rounded-t-[38px] mt-[2px] py-6 px-4'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-2'>
            {renderSocialIcon(task.social_type_id)}
            <span>{task.name}</span>
          </div>
          <p className='text-base font-semibold text-center flex items-center justify-center py-4'>
            {task.claimed ? (
              'You are claimed'
            ) : (
              <>
                <span className=' text-white  font-bold mr-2'>To get +{task.points || 0}</span>
                <img src={CoinIcon} className='w-5 h-5' alt='Coin Icon' />
              </>
            )}
          </p>
          <div className='flex justify-center'>{renderButtonStartTask()}</div>
        </div>

        {!((task.claimed && task.started) || !task.started) && task.link && (
          <div className='mt-1 flex justify-center pb-4'>
            <Button
              className={cn(
                ' h-auto font-bold px-4 py-2 rounded-3xl',
                (task.claimed && task.started) || isClaimLoading || !task.started
                  ? 'bg-slate-400 text-white'
                  : 'bg-[#65C0E4] text-white'
              )}
              variant={'link'}
              size='lg'
              onClick={handleClaim}
              disabled={(task.claimed && task.started) || isClaimLoading || !task.started}
            >
              
              {isClaimLoading ? <><LoadingIcon /> Receiving...</> : 'Claim'}
            </Button>
          </div>
        )}
        
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
