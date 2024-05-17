import { ReactNode } from 'react'

import dynamic from 'next/dynamic'

// eslint-disable-next-line import/no-unresolved
const Messenger = dynamic(() => import('Messenger/messenger-component'), { ssr: false })

export const MessengerApp = (props: any) => <Messenger {...props} />
