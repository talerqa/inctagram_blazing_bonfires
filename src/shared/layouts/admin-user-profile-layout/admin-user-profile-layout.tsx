import React, { PropsWithChildren } from 'react'

import { useRouter } from 'next/router'
import { NextPage } from 'next/types'

import s from './admin-user-profile-layout.module.scss'

import { UserProfileView } from '@/entities/admin'
import { Navbar } from '@/features/super-admin-user-management'
import { getSelectedUserProfileData } from '@/features/super-admin-user-profile/lib/get-selected-user-profile-data'

export const AdminUserProfileLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  const profileData = getSelectedUserProfileData(Number(router.query.id))

  return (
    <div className={s.profileWrapper}>
      {profileData && <UserProfileView {...profileData} />}
      <Navbar />
      {children}
    </div>
  )
}
