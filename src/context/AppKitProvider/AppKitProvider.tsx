// import { createAppKit } from '@reown/appkit/react'

// import { WagmiProvider } from 'wagmi'
// import { arbitrum, mainnet } from '@reown/appkit/networks'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// // 0. Setup queryClient
// const queryClient = new QueryClient()

// // 1. Get projectId from https://cloud.reown.com
// const projectId = '5043c693c4e40c882d4bffcdab9fa43e'

// // 2. Create a metadata object - optional
// const metadata = {
//   name: 'AppKit',
//   description: 'AppKit Example',
//   url: 'https://example.com', // origin must match your domain & subdomain
//   icons: ['https://avatars.githubusercontent.com/u/179229932']
// }

// // 3. Set the networks
// // const networks: any = [mainnet, arbitrum]

// // 4. Create Wagmi Adapter
// const wagmiAdapter = new WagmiAdapter({
//   networks:[mainnet, arbitrum],
//   projectId,
//   // ssr: false
// })

// // 5. Create modal
// // createAppKit({
// //   adapters: [wagmiAdapter],
// //   networks,
// //   projectId,
// //   metadata,
// //   features: {
// //     analytics: true // Optional - defaults to your Cloud configuration
// //   }
// // })

// interface AppKitProviderProps {
//   children: React.ReactNode
// }

// export function AppKitProvider  ({ children }:AppKitProviderProps) {
//   return (
//     <WagmiProvider config={wagmiAdapter.wagmiConfig}>
//       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     </WagmiProvider>
//   )
// }

// // export default AppKitProvider
