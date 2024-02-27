import React, { PropsWithChildren, ReactElement } from 'react'

import { useRouter } from 'next/router'
import { NextPage } from 'next/types'

import s from './AdminUserProfileLayout.module.scss'

import { UserProfileView } from '@/entities/admin'
import { Navbar } from '@/features/user-management'
import { getSelectedUserProfileData } from '@/features/user-management/lib/get-selected-user-profile-data'
import { Header } from '@/widgets/header'

const AdminUserProfileLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  const profileData = getSelectedUserProfileData(Number(router.query.id))

  return (
    <>
      <Header />
      <div className={s.AdminLayoutBody}>
        <main className={s.profileContainer}>
          {profileData && <UserProfileView {...profileData} />}
        </main>
        <Navbar />
        {children}
      </div>
    </>
  )
}

export const getAdminOnlyHeaderLayout = (page: ReactElement) => {
  return <AdminUserProfileLayout>{page}</AdminUserProfileLayout>
}
