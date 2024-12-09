import { PATH_TON_WALLET, TELEGRAM_BOT_URL } from '@constants/config'
import WebApp from '@twa-dev/sdk'
import './App.css'
import useRouterElement from './routes/useRouterElement'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import React from 'react'
import { useGetToken } from '@hooks'
// import { CSSTransition } from 'react-transition-group'
// import { cn } from '@lib/utils'
import { Toaster } from 'react-hot-toast'
// import { KolzIcon } from '@assets/images'
import { useStore } from '@stores'
import useConfig from '@hooks/useConfig'
import FlashScreen from '@components/FlashScreen/FlashScreen'
import { Web3Provider } from '@context/Web3Provider/Web3Provider'
import { LoadingPopup } from '@components/LoadingPopup'
// import { GlobalLoading } from '@components/GlobalLoading'

function App() {
  // React.useEffect(() => {
  //   console.log('App mounted')
  //   WebApp.ready(); // Signal the app is ready
  //   WebApp.expand(); // Attempt to expand the app to full screen
  // }, [])
  const { data, isPending = true } = useGetToken()
  // const nodeRef = React.useRef(null) // Ref cho node trong CSSTransition
  const { isFetching } = useConfig(data?.token || null)

  const { isGlobalLoading } = useStore((state) => state)

  React.useEffect(() => {
    const initWebApp = async () => {
      WebApp.ready()
      WebApp.expand()
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
      <Web3Provider>

        {routeElements}
      </Web3Provider>

      {/* <CSSTransition nodeRef={nodeRef} in={!data || isPending} timeout={1500} unmountOnExit>
        <FlashScreen />
      </CSSTransition> */}
      {!data && isPending && (
        <>
          <FlashScreen />
        </>
      )}
      {isFetching && isGlobalLoading && <LoadingPopup/>}
      {/* <CSSTransition nodeRef={nodeRef} in={isFetching && isGlobalLoading} timeout={500} classNames='fade' unmountOnExit>
        <FlashScreen />
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
