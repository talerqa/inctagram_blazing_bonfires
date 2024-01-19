import React, { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'
import { useSelector } from 'react-redux'

import BaseLayout from '@/shared/layouts/baseLayout/BaseLayout'
import { RootState } from '@/shared/providers/storeProvider'
import { PublicPageHeader } from '@/widgets/publicPageHeader'

export const MainLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <BaseLayout>{children}</BaseLayout>
    </>
  )
}

export const getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}
