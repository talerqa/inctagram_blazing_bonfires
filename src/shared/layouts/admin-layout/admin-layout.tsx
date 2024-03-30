import React, { PropsWithChildren, ReactElement, useEffect, useState } from 'react'

import { clsx } from 'clsx'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'
import { useDispatch, useSelector } from 'react-redux'

import s from './admin-layout.module.scss'

import { signInAdmin } from '@/pages/super-admin/modal/slices/admin-auth-reducer'
import { selectIsMobile } from '@/shared/api/services/app/app.slice'
import { RoutersPath } from '@/shared/constants/paths'
import { RootState } from '@/shared/providers/store-provider'
import { Header } from '@/widgets/header'
import { SideBar } from '@/widgets/sidebar'
import { SidebarMobile } from '@/widgets/sidebar/ui/sidebarMobile/sidebar-mobile'

const AdminLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const isAdminLogged = useSelector((state: RootState) => state.adminAuth.isAdminLogged)
  const isMobile = useSelector(selectIsMobile)
  const showSidebar =
    (router.pathname === RoutersPath.superAdminUsersList ||
      router.pathname === RoutersPath.superAdminPaymentsList) &&
    isAdminLogged

  useEffect(() => {
    const adminAuthenticated = Boolean(sessionStorage.getItem('adminAuth'))

    if (!adminAuthenticated) {
      router.replace(RoutersPath.superAdminSignIn)
    } else {
      dispatch(signInAdmin(Boolean(adminAuthenticated)))
    }
  }, [])

  const classNames = {
    superAdminRightSideBody: clsx(
      s.superAdminRightSideBody,
      router.pathname === RoutersPath.superAdminUsersList ? s.fullWidth : ''
    ),
    adminRightSideBodyContainer: clsx(s.adminRightSideBodyContainer, s.fullWidth),
  }

  return (
    <>
      <Header />
      <div className={s.AdminLayoutBody}>
        {showSidebar && !isMobile && <SideBar />}
        <div className={classNames.adminRightSideBodyContainer}>
          <main className={classNames.superAdminRightSideBody}>{children}</main>
        </div>
        {showSidebar && isMobile && <SidebarMobile />}
      </div>
    </>
  )
}

export const getAdminLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>
}
