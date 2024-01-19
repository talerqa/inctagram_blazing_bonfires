import React, { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import s from './PublicPageLayout.module.scss'

import { PublicPageHeader } from '@/widgets/publicPageHeader'

const PublicPageLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <PublicPageHeader />
      <main className={s.main}>{children}</main>
    </>
  )
}

export const makePublicPageLayout = (page: ReactElement) => {
  return <PublicPageLayout>{page}</PublicPageLayout>
}
