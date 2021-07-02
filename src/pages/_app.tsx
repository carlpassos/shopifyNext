import {AppProps} from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { SidebarDrawerProvider } from '../contexts/navDrawerContext'
import { CommerceProvider } from 'nextjs-commerce-shopify'
import { CartDrawerProvider } from '../contexts/cartDrawerContext'
import { CartProvider } from '../contexts/cartContext'
import { CheckoutProvider } from '../contexts/checkoutContext'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
      <ChakraProvider theme={ theme }>
        <SidebarDrawerProvider>
          <CartDrawerProvider>
            <CartProvider>
              <CheckoutProvider>
                <CommerceProvider
                  config={{
                    domain: process.env.SHOPIFY_DOMAIN,
                    token: process.env.SHOPIFY_TOKEN,
                    currencyCode: 'BRL',
                    locale: 'pt-BR'
                  }}
                >
                  <Component {...pageProps} />
              </CommerceProvider>
              </CheckoutProvider>
            </CartProvider>
          </CartDrawerProvider>
        </SidebarDrawerProvider>
      </ChakraProvider>
  )
}

export default MyApp
