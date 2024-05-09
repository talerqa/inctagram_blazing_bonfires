import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { RoutersPath } from '@/shared/constants/paths'
import { getAdminLayout } from '@/shared/layouts/admin-layout/admin-layout'

const SuperAdminHome = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(RoutersPath.superAdminUsersList)
  }, [router])

  return <div></div>
}

SuperAdminHome.getLayout = getAdminLayout
export default SuperAdminHome
