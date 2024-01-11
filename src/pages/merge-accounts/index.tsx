import React from 'react'

import { GetStaticProps } from 'next'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import styles from './MergeAccounts.module.scss'

import broImage from '@/shared/assets/icons/login/bro.svg'
import { getLayout } from '@/shared/layouts/mainLayout/MainLayout'
import { Button, ButtonTheme } from '@/shared/ui'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const MergeAccountsPage = () => {
  return (
    <div className={styles.mergeAccContainer}>
      <h3>Merge of Accounts</h3>
      <p>
        The user with email <b>Epam@epam.com</b> is already in the system. Could we merge this
        accounts?
      </p>
      <Button theme={ButtonTheme.CLEAR}>Yes, merge</Button>
      <Button theme={ButtonTheme.CLEAR}>No</Button>
      <Image src={broImage} alt={'women login accaunt in her phone'} />
    </div>
  )
}

MergeAccountsPage.getLayout = getLayout
export default MergeAccountsPage
