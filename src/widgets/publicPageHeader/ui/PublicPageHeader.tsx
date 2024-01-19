'use client'
import React from 'react'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import s from './PublicPageHeader.module.scss'

import { RoutersPath } from '@/shared/constants/paths'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui'
import { LanguageSelect } from '@/widgets/langSwitcher'

export const PublicPageHeader = () => {
  const { t } = useTranslation('common', { keyPrefix: 'Auth' })

  return (
    <header className={s.header}>
      <Link href="/" className={s.logo}>
        Instagram
      </Link>
      <div className={s.headerRightSide}>
        <div className={s.langSwitcherContainer}>
          <LanguageSelect />
        </div>
        <div className={s.headerBtns}>
          <Link href={RoutersPath.signIn}>
            <Button size={ButtonSize.CLEAN} theme={ButtonTheme.CLEAR}>
              {/*{t('SignIn')}*/}
              Sign in
            </Button>
          </Link>
          <Link href={RoutersPath.signUp}>
            <Button size={ButtonSize.CLEAN}>
              {/*{t('SignUp')}*/}
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
