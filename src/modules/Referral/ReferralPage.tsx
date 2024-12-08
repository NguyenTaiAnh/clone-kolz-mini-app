import React from 'react'
import { ArrowLeftIcon, ShareIcon } from '@heroicons/react/24/solid'
import { TELEGRAM_BOT_URL } from '@constants/config'
import { useGetInviteFriends } from '@hooks'
import { ReferralItem } from './_components/ReferralItem'
import { SketonReferral } from './_components/SketonReferral'

const ReferralPage = () => {
  // const [showModal, setShowModal] = React.useState(false)

  const queryResult = useGetInviteFriends()
  const isLoading = queryResult.isLoading

  const friendsData = queryResult.data?.friends || []
  // const tasksData = queryResult.data?.tasks || []
  const referralCode = queryResult.data?.referral_code
  const handleInviteFriend = async () => {
    const url = `${TELEGRAM_BOT_URL}?start=${referralCode}`
    const linkRedirect = `https://t.me/share/url?url=${url}`
    window.open(linkRedirect, '_blank')
  }
  return (
    <>
      <div className='bg-[#222326] text-white min-h-screen'>
        <div className='p-4'>
          <button
            className='text-white flex items-center mb-4 bg-gray-600 rounded-2xl p-2'
            onClick={() => window.history.back()}
          >
            <ArrowLeftIcon className='h-4 w-4 mr-1' /> Back
          </button>

          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-[#1E56F6]'>Your Referrals ({friendsData.length})</h3>
            <button onClick={handleInviteFriend} className='text-white'>
              <ShareIcon className='h-6 w-6' />
            </button>
          </div>

          <div>
            {isLoading && <SketonReferral size={3} keyName='Referral' />}
            {/* <SketonReferral size={3} keyName='Referral' /> */}
            {friendsData.map((referral: any) => (
              <ReferralItem key={referral.friend_id} name={referral.friend.username} reward={referral.friend.points} />
            ))}
          </div>
        </div>
      </div>

      {/* {showModal && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-black bg-opacity-50 absolute inset-0'></div>
          <div className='bg-white p-6 rounded-lg shadow-lg z-10'>
            <p className='text-black'>Đã sao chép vào clipboard!</p>
          </div>
        </div>
      )} */}
    </>
  )
}

export default React.memo(ReferralPage)
