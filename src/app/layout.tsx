'use client'

import './globals.css'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import '@rainbow-me/rainbowkit/styles.css';
import MainLayout from '@/components/Layout/Layout'

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    polygonMumbai,
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Web3 Email',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <CacheProvider>
              <ChakraProvider>
                <MainLayout>
                  {children}
                </MainLayout>
              </ChakraProvider>
            </CacheProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}
