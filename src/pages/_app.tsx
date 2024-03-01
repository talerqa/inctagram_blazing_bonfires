import '../shared/styles/globals.scss'
import { ReactElement, ReactNode, useEffect } from 'react'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GetStaticProps } from 'next'
import type { AppProps } from 'next/app'
import { NextPage } from 'next/types'
import { appWithTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Provider, useDispatch } from 'react-redux'

import { setIsMobile } from '@/shared/api/services/app/app.slice'
import { WithAuth } from '@/shared/hoc/with-auth/with-auth'
import { wrapper } from '@/shared/providers/store-provider/model/store'

const client = new ApolloClient({
  uri: 'https://inctagram.work/api/v1/graphql',
  cache: new InMemoryCache(),
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)
  const dispatch = useDispatch()

  useEffect(() => {
    handleResize()
    function handleResize() {
      dispatch(setIsMobile(window.innerWidth < 768))
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return getLayout(
    <WithAuth>
      <Component {...pageProps} />
    </WithAuth>
  )
}

const TranslateApp = appWithTranslation(App)

function myApp(props: AppProps) {
  const { store } = wrapper.useWrappedStore({ ...props })

  return (
    <ApolloProvider client={client}>
      <GoogleOAuthProvider
        clientId={'617342613759-f3kbvgm8l310fn40vh6qna2pv8u2uccr.apps.googleusercontent.com'}
      >
        <Provider store={store}>
          <TranslateApp {...props} />
        </Provider>
      </GoogleOAuthProvider>
    </ApolloProvider>
  )
}

export default myApp
