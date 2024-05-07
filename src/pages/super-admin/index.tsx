import { useEffect, useLayoutEffect } from 'react'

import { useRouter } from 'next/router'

import { RoutersPath } from '@/shared/constants/paths'
import { getAdminLayout } from '@/shared/layouts/admin-layout/admin-layout'

const SuperAdminHome = () => {
  const router = useRouter()

  useLayoutEffect(() => {
    if (!router.isReady) return

    router.replace(RoutersPath.superAdminUsersList).then()
  }, [])

  return <div></div>
}

SuperAdminHome.getLayout = getAdminLayout
export default SuperAdminHome
