import React from 'react'

import { StoreProvider } from './store-provider'

export const StoreDecorator = (storyFn: () => React.ReactNode) => {
  return <StoreProvider>{storyFn()}</StoreProvider>
}
