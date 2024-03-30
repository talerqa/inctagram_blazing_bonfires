import React from 'react'

import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import styles from './confirmed-email.module.scss'

import broConfirmImage from '@/shared/assets/icons/login/bro-congratulations.svg'
import { RoutersPath } from '@/shared/constants/paths'
import { getLayout } from '@/shared/layouts/main-layout/main-layout'
import { Button, ButtonTheme } from '@/shared/ui'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const ConfirmedEmailPage = () => {
  const { t } = useTranslation('common', { keyPrefix: 'Auth' })

  return (
    <div className={styles.confirmedContainer}>
      <h3>{t('Congratulations')}</h3>
      <p>{t('EmailConfirmed')}</p>
      <Link href={RoutersPath.signIn}>
        <Button theme={ButtonTheme.FILLED}>{t('SignIn')}</Button>
      </Link>
      <Image src={broConfirmImage} alt={'women login account in her phone'} />
    </div>
  )
}

ConfirmedEmailPage.getLayout = getLayout
export default ConfirmedEmailPage
