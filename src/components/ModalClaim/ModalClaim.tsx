import React from 'react'
// import { useGetEnergy } from "../hooks";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { QueryKeys } from '@constants/queryKeys'
import { energyApi } from '@apis/energy.api'
import { useToast } from '@hooks/use-toast'
import { ToastActionElement } from '@components/ui/toast'
import { useStore } from '@stores'
import { CoinIcon } from '@assets/images'
import useConfig from '@hooks/useConfig'
import { useGetToken } from '@hooks'

interface ModalClaimProps {
  setShowModal: (showModal:boolean) => void
  showModal: boolean
  points: any
}
const ModalClaim: React.FC<ModalClaimProps> = ({ setShowModal, showModal, points }) => {
  console.log("vo day")
  const { data, isPending = true } = useGetToken()
  const { setIsFirstTime } = useStore()
  const queryClient = useQueryClient()
  const {toast} = useToast()
  const { isFetching } = useConfig(data?.token || null)

  const { isGlobalLoading } = useStore((state) => state)
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
  const { mutateAsync } = useMutation({
    mutationFn: () => energyApi.postEnergy(),
    onSuccess: async () => {
        showToast('success','Claim success ', 'default')
      queryClient.refetchQueries({
        queryKey: [QueryKeys.CURRENT_USER],
        type: 'active'
      })
    },
    onError: (error) => {
      console.log('check on error: ', error)
      showToast('error',error.message, 'destructive')
    }
  })

  const handleClaim = async () => {
    try {
      setIsFirstTime(true)
      setShowModal(false)

      await mutateAsync()
    } catch (error) {
      console.log('error:', error)
    }
  }

  const handleClose = () => {
    setShowModal(false)
    setIsFirstTime(true)
  }

  return (
    <>
      {(data || !isPending) && !isFetching && !isGlobalLoading && showModal && points > 0 ? (
        <>
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-end z-[9999]'>
            <div className='w-full bg-white rounded-t-3xl p-4'>
              <div className='flex justify-between items-center'>
                <div className='flex text-lg font-semibold text-black items-center'>
                  <img src={CoinIcon} className='w-14 h-14' alt='Coin Icon' />
                  <p>Energies</p>
                </div>
                <button onClick={handleClose} className='p-1 bg-[revert] rounded-full'>
                  <XMarkIcon className='h-6 w-6 text-black' />
                </button>
              </div>
              <div className='mt-4 flex justify-center gap-2'>
                <p className='text-black flex items-center justify-center my-4 text-blueGray-500 text-lg leading-relaxed'>
                  You received
                  <span className=' ml-2 text-xl text-yellow-400 font-bold'>+{points}</span>
                  <img src={CoinIcon} className='w-5 h-5' alt='Coin Icon' />
                </p>
              </div>
              <div className='flex items-center justify-center rounded-b'>
                <button
                  className='bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                  type='button'
                  onClick={() => handleClaim()}
                >
                  Claim
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}
export default React.memo(ModalClaim)
