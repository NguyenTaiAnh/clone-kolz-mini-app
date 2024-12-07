// import { Snowflake } from 'lucide-react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { PATH } from '@routes/path'
import NavItem from './NavItem'
import { CheckInTab, CollectEnergyTab, EditTab, PostTab, Referraltab } from '@assets/images'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskApi } from '@apis/task.api'
import { useToast } from '@hooks/use-toast'
import { ToastActionElement } from '@components/ui/toast'
import { QueryKeys } from '@constants/queryKeys'

const BottomNavigationBar = () => {
  const [activeButton, setActiveButton] = React.useState<string | null>(PATH.HOME)
  const { toast } = useToast()

  const navigate = useNavigate()
  const location = useLocation()
  // const [isLoading, setIsLoading] = React.useState(false)
  const queryClient = useQueryClient()

  const handleClick = (path: string) => {
    setActiveButton(path)
    navigate(path)
  }

  const getClassNames = (button: string) => {
    return `text-center text-[#85827d] w-1/5 m-1  p-2 ${activeButton === button ? 'rounded-2xl  text-[#C79B00] ' : ''}`
  }
  const showToast = (
    title: string,
    description: string,
    variant: 'default' | 'destructive' | null | undefined,
    action: ToastActionElement | undefined = undefined
  ) => {
    toast({
      title,
      description,
      action,
      duration: 3000,
      variant
    })
  }
  const handleError = (error: any) => {
    console.log("voooo")
    showToast('Error', error?.message, 'destructive')
  }
  const { mutateAsync } = useMutation({
    mutationFn: () => taskApi.postCheckIn(),
    onSuccess: () => {
      // setIsLoading(false)
      // setIsChecked(true)
      queryClient.refetchQueries({
        queryKey: [QueryKeys.SCHEDULE_TASK],
        type: 'active'
      })
      queryClient.refetchQueries({
        queryKey: [QueryKeys.CURRENT_USER],
        type: 'active'
      })
      showToast("Success", "Check-In success","default")
    },
    onError: (error) => {
      console.log('check on error: ', error)
      // setIsLoading(false)
      // setIsChecked(false)
      handleError(error)
    }
  })

  const handleCheckin = async () => {
    try {
      await mutateAsync()
    } catch (error) {
      console.log("vo")
    }
  }

  const memoizedClassNames = React.useMemo(
    () => ({
      home: getClassNames(PATH.HOME),
      referral: getClassNames(PATH.REFERRAL),
      mission: getClassNames(PATH.MISSION),
      chat: getClassNames(PATH.CHAT)
    }),
    [activeButton]
  )

  React.useEffect(() => {
    const path = location.pathname
    setActiveButton(path || PATH.HOME)
  }, [location])

  const navList = [
    {
      className: memoizedClassNames.home,
      onClick: () => handleClick(PATH.HOME),
      icon: <img src={CollectEnergyTab} alt='home' className='h-12 w-14 mx-auto' />,
      isCenter: false
    },
    {
      className: memoizedClassNames.chat,
      onClick: () => handleClick(PATH.CHAT),
      icon: <img src={PostTab} alt='home' className='h-12 w-14 mx-auto' />,
      isCenter: false
    },
    {
      className: 'text-center text-[#85827d] w-1/5 m-1  p-2 ',
      onClick: () => handleCheckin(),
      icon: <img src={CheckInTab} alt='home' className='h-16  object-cover rounded-full' />,
      isCenter: true
    },
    {
      className: memoizedClassNames.mission,
      onClick: () => handleClick(PATH.MISSION),
      icon: <img src={EditTab} alt='home' className='h-12 w-14 mx-auto' />,
      isCenter: false
    },
    {
      className: memoizedClassNames.referral,
      onClick: () => handleClick(PATH.REFERRAL),
      icon: <img src={Referraltab} alt='home' className='h-12 w-14 mx-auto' />,
      isCenter: false
    }
  ]
  if (activeButton !== PATH.HOME) {
    return
  }
  return (
    <div className='fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-xl w-full bg-white flex justify-around items-center z-50 rounded-t-3xl text-xs'>
      {navList.map(({ className, onClick, icon, isCenter }, index) => (
        <NavItem key={`nav-item-${index}`} className={className} onClick={onClick} icon={icon} isCenter={isCenter} />
      ))}
    </div>
  )
}

export default React.memo(BottomNavigationBar)
