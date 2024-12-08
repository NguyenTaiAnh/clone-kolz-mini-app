import React from 'react'

import { ArrowLeftIcon, Telegram, Twitter, Wallet } from '@assets/icons'
// import { CoinIcon } from '@assets/images'
import { LoginSocialTwitter } from '@components/LoginSocialTwitter'
// import { useListTask } from '@hooks'
import { getLocalStorage } from '@utils'
import { memo } from 'react'
import { DailyCheckIn } from './DailyCheckIn'
import { ListTask } from './ListTask'
import { REDIRECT_URI, TWITTER_V2_APP_KEY } from '@constants/config'
import { ModalInfoSocial } from '@components/ModalInfoSocial'
import { useStore } from '@stores'
import { ModalWalletEVM } from '@components/ModalWalletEVM'

const MissionPage = () => {
  const infoX = getLocalStorage('twitter_token')
  const currentUser = useStore((state) => state.currentUser)
  const [provider, setProvider] = React.useState('')
  const [profile, setProfile] = React.useState()
  console.log({ provider })
  console.log({ profile })
  const [showPopup, setShowPopup] = React.useState(false)
  const [showPopupTele, setShowPopupTele] = React.useState(false)
  const [showPopupX, setShowPopupX] = React.useState(false)
  console.log({ showPopupX })
  const onLoginStart = React.useCallback(() => {
    // alert("login start");
  }, [])

  // const onLogoutSuccess = React.useCallback(() => {
  //   // setProfile(null);
  //   // setProvider("");
  //   alert("logout success");
  // }, []);
  // const taskList = data?.data?.filter((_) => _.social_type_id != 1) || []

  return (
    <div className='p-4'>
      <button
        className='text-white flex items-center mb-4 bg-[#474646] rounded-2xl p-2 px-3 font-medium'
        onClick={() => window.history.back()}
      >
        <ArrowLeftIcon className=' mr-1' /> Back
      </button>
      <div className='flex justify-center  gap-5 mb-5'>
        <div onClick={() => setShowPopupTele(true)}>
          <Telegram className=' text-white' />
        </div>
        {!!infoX ? (
          <div onClick={() => setShowPopupX(true)}>
            <Twitter className=' text-white' />
          </div>
        ) : (
          <LoginSocialTwitter
            client_id={TWITTER_V2_APP_KEY || 'NVA3ZGpaRkl2OUZ2NnFxeHZYenE6MTpjaQ'}
            //  client_secret={process.env.REACT_APP_TWITTER_V2_APP_SECRET || 'HPUyFhgSuyOYo5Ro0AZzR4QKSb1FxRoGkoGPgmpdJE5F0ApmA7'}
            redirect_uri={REDIRECT_URI}
            onLoginStart={onLoginStart}
            // onLogoutSuccess={onLogoutSuccess}
            onResolve={({ provider, data }: any) => {
              setProvider(provider)
              setProfile(data)
            }}
            onReject={(err: any) => {
              console.log(err)
            }}
            className='flex items-center'
          >
            <Twitter className=' text-white' />
          </LoginSocialTwitter>
        )}
        <div onClick={() => setShowPopup(true)}>
          <Wallet className=' text-white' />
        </div>
      </div>
      <DailyCheckIn />
      <ListTask />
      <ModalWalletEVM isOpen={showPopup} setIsOpen={setShowPopup} />
      <ModalInfoSocial state={showPopupTele} setState={setShowPopupTele} data={currentUser} title='Telegram' />
      <ModalInfoSocial state={showPopupX} setState={setShowPopupX} data={infoX} title='X' />
    </div>
  )
}

export default memo(MissionPage)
