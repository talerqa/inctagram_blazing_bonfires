import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import styles from './navbar.module.scss'

import { RoutersPath } from '@/shared/constants/paths'

export const Navbar = () => {
  const { t } = useTranslation('common', { keyPrefix: 'Navbar' })
  const router = useRouter()

  return (
    <nav className={styles.navbar}>
      <Link href={RoutersPath.profileGeneralInformation}>
        <h3
          className={
            router.pathname === RoutersPath.profileGeneralInformation ? styles['current-page'] : ''
          }
        >
          {t('GeneralInformation')}
        </h3>
      </Link>
      <Link href={RoutersPath.profileDevices}>
        <h3
          className={router.pathname === RoutersPath.profileDevices ? styles['current-page'] : ''}
        >
          {t('Devices')}
        </h3>
      </Link>
      <Link href={RoutersPath.profileAccountManagement}>
        <h3
          className={
            router.pathname === RoutersPath.profileAccountManagement ? styles['current-page'] : ''
          }
        >
          {t('AccountManagement')}
        </h3>
      </Link>
      <Link href={RoutersPath.profileMyPayments}>
        <h3
          className={
            router.pathname === RoutersPath.profileMyPayments ? styles['current-page'] : ''
          }
        >
          {t('MyPayments')}
        </h3>
      </Link>
    </nav>
  )
}
