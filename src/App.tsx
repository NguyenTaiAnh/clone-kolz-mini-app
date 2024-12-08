import { PATH_TON_WALLET, TELEGRAM_BOT_URL } from '@constants/config'
import WebApp from '@twa-dev/sdk'
import './App.css'
import useRouterElement from './routes/useRouterElement'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import React from 'react'
import { useGetToken } from '@hooks'
import { CSSTransition } from 'react-transition-group'
import { cn } from '@lib/utils'
import { Toaster } from 'react-hot-toast'
import { KolzIcon } from '@assets/images'
import { useStore } from '@stores'
import useConfig from '@hooks/useConfig'
import { GlobalLoading } from '@components/GlobalLoading'

function App() {
  // React.useEffect(() => {
  //   console.log('App mounted')
  //   WebApp.ready(); // Signal the app is ready
  //   WebApp.expand(); // Attempt to expand the app to full screen
  // }, [])
  const { data, isPending = true } = useGetToken()
  const nodeRef = React.useRef(null) // Ref cho node trong CSSTransition
  const { isFetching } = useConfig(data?.token || null)

  const { isGlobalLoading } = useStore((state) => state)

  React.useEffect(() => {
    const initWebApp = async () => {
      WebApp.ready()
      WebApp.expand();
      console.log('WebApp.initData', WebApp.initData)
      console.log('WebApp.initData isPremium', WebApp.initDataUnsafe.user?.is_premium)
      console.log('WebApp.initData ', WebApp.initDataUnsafe.user)
    }

    initWebApp()
  }, [])
  const routeElements = useRouterElement()
  return (
    <TonConnectUIProvider
      manifestUrl={PATH_TON_WALLET}
      actionsConfiguration={{
        twaReturnUrl: TELEGRAM_BOT_URL
      }}
    >
      {routeElements}

      <CSSTransition nodeRef={nodeRef} in={!data || isPending} timeout={1500} unmountOnExit>
        <div className={cn('fixed top-0 left-0 w-screen h-screen bg-black z-[9999] flex items-center justify-center')}>
          <img src={KolzIcon} className='w-3/4' />
          <p className='absolute bottom-5'>
            <span className='text-white font-semibold text-2xl text-gradient'>Let's Start</span>
          </p>
        </div>
      </CSSTransition>
      {!data && isPending && (
        <>
          <div
            className={cn('fixed top-0 left-0 w-screen h-screen bg-black z-[9999] flex items-center justify-center')}
          >
            <img src={KolzIcon} className='w-3/4' />
            <p className='absolute bottom-5'>
              <span className='text-white font-semibold text-2xl text-gradient'>Let's Start</span>
            </p>
          </div>
        </>
      )}
      {/* <CSSTransition nodeRef={nodeRef} in={isFetching && isGlobalLoading} timeout={500} classNames='fade' unmountOnExit>
        <GlobalLoading />
      </CSSTransition> */}

      <Toaster
        containerStyle={{
          top: '10%'
        }}
        position='top-right'
        toastOptions={{
          className: 'custom-toast',
          duration: 3000
        }}
      />
    </TonConnectUIProvider>
  )
}

export default App
