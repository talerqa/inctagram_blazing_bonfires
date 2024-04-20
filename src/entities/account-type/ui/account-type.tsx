import React from 'react'

import { useTranslation } from 'next-i18next'

import styles from './account-type.module.scss'

import { SubscriptionDataType } from '@/shared/api/services/subscriptions/subscriptions.api.types'
import { RoundCheckbox } from '@/shared/ui'

type PropsType = {
  setAccountType: () => void
  accType: string
  setAccType: (value: string) => void
  currentLocalSubs: SubscriptionDataType[]
}

export const AccountType = (props: PropsType) => {
  const { setAccountType, accType, setAccType, currentLocalSubs } = props

  const { t } = useTranslation('common', { keyPrefix: 'AccountManagement' })

  return (
    <div className={styles.listWrapper}>
      <RoundCheckbox
        name={'accType'}
        onChange={setAccountType}
        label={t('Personal')}
        checked={accType === 'personal'}
      />
      <RoundCheckbox
        name={'accType'}
        onChange={() => setAccType('business')}
        label={t('Business')}
        checked={accType === 'business' || (currentLocalSubs && currentLocalSubs.length > 0)}
      />
    </div>
  )
}
