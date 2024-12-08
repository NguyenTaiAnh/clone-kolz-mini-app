// import { Snowflake } from 'lucide-react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { PATH } from '@routes/path'
// import NavItem from './NavItem'
import { CheckInTab, CollectEnergyTab, EditTab, PostTab, Referraltab } from '@assets/images'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskApi } from '@apis/task.api'
import { useToast } from '@hooks/use-toast'
import { ToastActionElement } from '@components/ui/toast'
import { QueryKeys } from '@constants/queryKeys'
import { BackButton } from '@components/BackButton'
import { LoadingPopup } from '@components/LoadingPopup'

const BottomNavigationBar = () => {
  const [activeButton, setActiveButton] = React.useState<string | null>(PATH.HOME)
  const { toast } = useToast()
  // const [buttonState, setButtonState] = React.useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = React.useState(false)
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
    variant: 'default' | 'destructive' | 'checkInError' | null | undefined,
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
    showToast('', error?.message, 'checkInError')
  }
  const { mutateAsync } = useMutation({
    mutationFn: () => taskApi.postCheckIn(),
    onSuccess: () => {
      setIsLoading(false)
      // setIsChecked(true)
      queryClient.refetchQueries({
        queryKey: [QueryKeys.SCHEDULE_TASK],
        type: 'active'
      })
      queryClient.refetchQueries({
        queryKey: [QueryKeys.CURRENT_USER],
        type: 'active'
      })
      showToast('Success', 'Check-In success', 'default')
    },
    onError: (error) => {
      console.log('check on error: ', error)
      setIsLoading(false)
      // setIsChecked(false)
      handleError(error)
    }
  })

  const handleCheckin = async () => {
    try {
      setIsLoading(true)
      await mutateAsync()
    } catch (error) {
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

  const renderButtonHeader = () => {
    return <BackButton onClick={() => navigate('/')} />
  }

  React.useEffect(() => {
    const path = location.pathname
    setActiveButton(path || PATH.HOME)

    if(activeButton?.split('/')[1] == PATH.CHAT.split('/')[1]){
      renderButtonHeader() 
    }
  }, [location])

  const navList = [
    {
      className: memoizedClassNames.home,
      onClick: () => handleClick(PATH.HOME),
      icon:CollectEnergyTab,
      isCenter: false
    },
    {
      className: memoizedClassNames.chat,
      onClick: () => handleClick(PATH.CHAT),
      icon: PostTab,
      isCenter: false
    },
    {
      className: 'text-center text-[#85827d] w-1/5 m-1  p-2 ',
      onClick: () => handleCheckin(),
      icon: CheckInTab,
      isCenter: true
    },
    {
      className: memoizedClassNames.mission,
      onClick: () => handleClick(PATH.MISSION),
      icon: EditTab,
      isCenter: false
    },
    {
      className: memoizedClassNames.referral,
      onClick: () => handleClick(PATH.REFERRAL),
      icon: Referraltab,
      isCenter: false
    }
  ]
  if (activeButton !== PATH.HOME) {
    return
  }
  
  return (
    // <div className='fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-xl w-full bg-white flex justify-around items-center z-50 rounded-t-3xl text-xs'>
    //   {navList.map(({ className, onClick, icon, isCenter }, index) => (
    //     <NavItem key={`nav-item-${index}`} className={className} onClick={onClick} icon={icon} isCenter={isCenter} />
    //   ))}
    // </div>
    <div className="fixed bottom-0 left-0 right-0 bg-[#ffffff] grid grid-cols-5 items-center rounded-t-3xl">
      {isLoading && <LoadingPopup/>}
      {navList.map(({  onClick, icon, isCenter }, index) => (
        <div key={index} className="flex justify-center">
        <div
          key={index}
          className={`flex justify-center items-center ${
            isCenter
              ? "relative bg-[#ffffff] h-20 w-20 rounded-full shadow-lg -translate-y-8 border-4 border-[#222326]"
              : ""
          }`}
          onClick={() => onClick()}
        >
          <img
            src={icon}
            alt="nav-icon"
            className={`${
              isCenter
                ? "h-20 w-20 object-cover rounded-full"
                : "h-14 w-14"
            }`}
          />
        </div>
      </div>
        // <NavItem key={`nav-item-${index}`} className={className} onClick={onClick} icon={icon} isCenter={isCenter} />
      ))}
    </div>
  )
}

export default React.memo(BottomNavigationBar)
