import CardItem from '@components/CardItem/CardItem'
import { LoadingPopup } from '@components/LoadingPopup'
import ModalClaim from '@components/ModalClaim/ModalClaim'
import useGetEnergy from '@hooks/queries/useGetEnergy'
import { useStore } from '@stores'
import React from 'react'
import { useNavigate } from 'react-router'

const HomePage = () => {
  const { isFirstTime } = useStore()
  const [showModal, setShowModal] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const navigate = useNavigate()
  const handleChatClick = (characterId: string) => {
    navigate(`/chat/${characterId}`)
  }

  const { data } = useGetEnergy()

  console.log({ data })

  return (
    <div className='flex-1'>
      {isLoading && <LoadingPopup />}
      {!isFirstTime && showModal && (
        <ModalClaim
          setShowModal={setShowModal}
          showModal={showModal}
          points={data?.energies}
          setIsLoading={setIsLoading}
        />
      )}
      <CardItem onChatClick={handleChatClick} />
    </div>
  )
}

export default HomePage
