import React, { PropsWithChildren } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import style from './base-layout.module.scss'

import { selectIsLoggedIn } from '@/shared/api'
import { selectIsMobile } from '@/shared/api/services/app/app.slice'
import { isRenderSidebar } from '@/shared/utils/is-render-sidebar'
import { Header } from '@/widgets/header'
import { PublicPageHeader } from '@/widgets/public-page-header'
import { SideBar } from '@/widgets/sidebar'
import { SidebarMobile } from '@/widgets/sidebar/ui/sidebarMobile/sidebar-mobile'

const BaseLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const { pathname } = useRouter()
  const isMobile = useSelector(selectIsMobile)
  const isSidebar = isRenderSidebar(pathname)

  return (
    <>
      {isLoggedIn ? <Header isMobile={isMobile} /> : <PublicPageHeader />}
      <div className={style.contentBody}>
        {!isMobile && isLoggedIn && isSidebar && <SideBar />}
        <main className={isSidebar ? style.mainWithSidebar : style.main}>
          <div className={style.rightSideBody}>{children}</div>
        </main>
      </div>
      {isMobile && isLoggedIn && isSidebar && <SidebarMobile />}
    </>
  )
}

export default BaseLayout
