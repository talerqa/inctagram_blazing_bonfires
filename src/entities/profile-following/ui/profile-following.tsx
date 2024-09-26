import React from 'react'

import { useTranslation } from 'next-i18next'

import style from './profile-following.module.scss'

import { Text } from '@/shared/ui'

type ProfileFollowingType = {
  amountFollowing: number | undefined
  amountFollowers: number | undefined
  amountPublications: number | undefined
  className?: string
}

export const ProfileFollowing = (props: ProfileFollowingType) => {
  const { amountFollowing, amountFollowers, amountPublications, className } = props

  const { t } = useTranslation('common', { keyPrefix: 'Profile' })

  return (
    <div className={style.subscribersContainer + ' ' + className}>
      <div className={style.item}>
        <Text as={'p'} weight={'bold'} size={'medium'} className={style.amount}>
          {amountFollowing}
        </Text>{' '}
        <Text as={'p'} size={'medium'} className={style.text}>
          {t('Following')}
        </Text>
      </div>
      <div className={style.item}>
        <Text as={'p'} weight={'bold'} size={'medium'} className={style.amount}>
          {amountFollowers}
        </Text>
        <Text as={'p'} size={'medium'} className={style.text}>
          {t('Followers')}
        </Text>
      </div>
      <div className={style.item}>
        <Text as={'p'} weight={'bold'} size={'medium'} className={style.amount}>
          {amountPublications}
        </Text>
        <Text as={'p'} size={'medium'} className={style.text}>
          {t('Publications')}
        </Text>
      </div>
    </div>
  )
}
