import React, { PropsWithChildren, ReactElement, useEffect } from 'react'

import { useRouter } from 'next/router'
import { NextPage } from 'next/types'
import { useDispatch, useSelector } from 'react-redux'

import s from './admin-layout.module.scss'

import { signInAdmin } from '@/pages/super-admin/modal/slices/admin-auth-reducer'
import { RoutersPath } from '@/shared/constants/paths'
import { RootState } from '@/shared/providers/store-provider'
import { Header } from '@/widgets/header'
import { SideBar } from '@/widgets/sidebar'

const AdminLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const isAdminLogged = useSelector((state: RootState) => state.adminAuth.isAdminLogged)

  useEffect(() => {
    const adminAuthenticated = Boolean(sessionStorage.getItem('adminAuth'))

    if (!adminAuthenticated) {
      router.replace(RoutersPath.superAdminSignIn)
    } else {
      dispatch(signInAdmin(Boolean(adminAuthenticated)))
    }
  }, [])

  return (
    <>
      <Header />
      <div className={s.AdminLayoutBody}>
        {isAdminLogged && <SideBar />}
        <main className={s.superAdminBody}>{children}</main>
      </div>
    </>
  )
}

export const getAdminLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>
}
