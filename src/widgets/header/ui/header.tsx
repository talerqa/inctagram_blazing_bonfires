'use client'
import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './header.module.scss'

import { NotificationIcon } from '@/shared/assets/icons'
import { LanguageSelect } from '@/widgets/lang-switcher'

export const Header = () => {
  const [count, setCounter] = useState(3)
  const router = useRouter()
  const mainPath = router.pathname.split('/')

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Inctagram
        {mainPath[1] === 'super-admin' && (
          <span className={styles.adminDescription}>
            <span className={styles.adminDescriptionThin}>Super</span>Admin
          </span>
        )}
      </Link>
      <div className={styles.option}>
        {mainPath[1] !== 'super-admin' && (
          <div className={styles.ball}>
            <NotificationIcon />
            <div className={styles.count}>{count}</div>
          </div>
        )}
        <div className={styles.langSwitcherContainer}>
          <LanguageSelect />
        </div>
      </div>
    </header>
  )
}
