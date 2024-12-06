import { useRoutes } from 'react-router-dom'
import { PATH } from './path'
import { MainLayout } from '@layouts/MainLayout'
import { HomePage } from '@modules/Home'
import { ChatPage } from '@modules/Chat'
import { MissionPage } from '@modules/Mission'
import { ReferralPage } from '@modules/Referral'

const useRouterElement = () => {
  const routes = useRoutes([
    {
      path: PATH.HOME,
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      )
    },
    {
      path: PATH.CHAT,
      element: (
        <MainLayout>
          <ChatPage />
        </MainLayout>
      )
    },
    {
      path: PATH.MISSION,
      element: (
        <MainLayout>
          <MissionPage />
        </MainLayout>
      )
    },
    {
      path: PATH.REFERRAL,
      element: (
        <MainLayout>
          <ReferralPage />
        </MainLayout>
      )
    }
  ])
  return routes
}

export default useRouterElement
