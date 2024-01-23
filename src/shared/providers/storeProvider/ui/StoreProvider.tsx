import { ReactNode, useRef } from 'react'

import { Provider } from 'react-redux'

import { AppStore, makeStore } from '@/shared/providers/storeProvider/model/store'

interface StoreProviderProps {
  children: ReactNode
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<AppStore>()

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return <Provider store={makeStore()}>{children}</Provider>
}

// export const StoreProvider: FC<StoreProviderProps> = ({ children, pageProps, Component }) => {
//   return <Component {...pageProps}>{children}</Component>
// }
