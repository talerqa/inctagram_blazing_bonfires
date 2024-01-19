import { FC, ReactNode } from 'react'

import { Provider } from 'react-redux'

import { makeStore, wrapper } from '@/shared/providers/storeProvider/model/store'

interface StoreProviderProps {
  children: ReactNode
}

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  return <Provider store={makeStore()}>{children}</Provider>
}

// export const StoreProvider: FC<StoreProviderProps> = ({ children, pageProps, Component }) => {
//   return <Component {...pageProps}>{children}</Component>
// }
