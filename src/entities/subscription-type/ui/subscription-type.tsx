import React from 'react'

import { useTranslation } from 'next-i18next'
import { Control, Controller } from 'react-hook-form'

import styles from './subscription-type.module.scss'

import { NewSubscriptionType } from '@/shared/api/services/subscriptions/subscriptions.api.types'
import { RoundCheckbox } from '@/shared/ui'

type PropsType = {
  control: Control<NewSubscriptionType>
}

export const SubscriptionType = (props: PropsType) => {
  const { control } = props

  const { t } = useTranslation('common', { keyPrefix: 'AccountManagement' })

  return (
    <div className={styles.listWrapper}>
      <Controller
        control={control}
        name="typeSubscription"
        render={({ field: { onChange, value } }) => (
          <>
            <RoundCheckbox
              key={'day'}
              value={'DAY'}
              label={t('$10per1Day')}
              onChange={onChange}
              checked={value === 'DAY'}
            />
            <RoundCheckbox
              key={'weekly'}
              value={'WEEKLY'}
              label={t('$50per7Days')}
              onChange={onChange}
              checked={value === 'WEEKLY'}
            />
            <RoundCheckbox
              key={'monthly'}
              value={'MONTHLY'}
              label={t('$100per1month')}
              onChange={onChange}
              checked={value === 'MONTHLY'}
            />
          </>
        )}
      />
    </div>
  )
}
