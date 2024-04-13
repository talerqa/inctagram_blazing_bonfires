import React, { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import BaseLayout from '@/shared/layouts/base-layout/base-layout'

const ProfileLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <BaseLayout>{children}</BaseLayout>
    </>
  )
}

export default ProfileLayout
