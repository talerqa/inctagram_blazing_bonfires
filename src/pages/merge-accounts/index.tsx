import React from 'react'

import { GetStaticProps } from 'next'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import styles from './merge-accounts.module.scss'

import broImage from '@/shared/assets/icons/login/bro.svg'
import { getLayout } from '@/shared/layouts/main-layout/main-layout'
import { Button, ButtonSize, ButtonTheme, FormContainer } from '@/shared/ui'

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
    <div className={styles.mergeAccounts}>
      <FormContainer title={'Merge of Accounts'} className={styles.mergeAccountsContainer}>
        <p>
          The user with email <b>Epam@epam.com</b> is already in the system. Could we merge this
          accounts?
        </p>
        <Image src={broImage} alt={'women login accaunt in her phone'} />
        <div className={styles.mergeAccounts__btns}>
          <Button theme={ButtonTheme.CLEAR} size={ButtonSize.STRETCHED}>
            Yes, merge
          </Button>
          <Button theme={ButtonTheme.CLEAR} size={ButtonSize.STRETCHED}>
            No
          </Button>
        </div>
      </FormContainer>
    </div>
  )
}

MergeAccountsPage.getLayout = getLayout
export default MergeAccountsPage
