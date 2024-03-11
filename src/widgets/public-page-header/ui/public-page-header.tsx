import React from 'react'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import s from './public-page-header.module.scss'

import { RoutersPath } from '@/shared/constants/paths'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui'
import { LanguageSelect } from '@/widgets/lang-switcher'

export const PublicPageHeader = () => {
  const { t } = useTranslation('common', { keyPrefix: 'Auth' })

  return (
    <header className={s.header}>
      <div className={s.headerWrapper}>
        <Link href="/" className={s.logo}>
          Inctagram
        </Link>
        <div className={s.headerRightSide}>
          <div className={s.langSwitcherContainer}>
            <LanguageSelect />
          </div>
          <div className={s.headerBtns}>
            <Link href={RoutersPath.signIn}>
              <Button size={ButtonSize.CLEAN} theme={ButtonTheme.CLEAR}>
                {t('SignIn')}
              </Button>
            </Link>
            <Link href={RoutersPath.signUp}>
              <Button size={ButtonSize.CLEAN}>{t('SignUp')}</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
