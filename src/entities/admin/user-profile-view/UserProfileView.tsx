import React from 'react'

import { clsx } from 'clsx'
import { prefix } from 'goober/prefixer'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import s from './UserProfileView.module.scss'

import { User } from '@/__generated__/graphql'
import { ArrowBack } from '@/shared/assets/icons'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { RoutersPath } from '@/shared/constants/paths'
import { CircularLoader, Text } from '@/shared/ui'
import { findDate } from '@/shared/utils/findDate'

export const UserProfileView = ({ userName, profile, id }: Omit<User, '__typename'>) => {
  const router = useRouter()
  const createdAtDate = findDate.formatToNumeric(profile.createdAt)
  const { t } = useTranslation('common', { keyPrefix: 'Profile' })

  if (!profile || !profile.avatars) return <CircularLoader />

  return (
    <div className={s.profileContainer}>
      <Text
        onClick={() => router.push(RoutersPath.superAdminUsersList)}
        as={'p'}
        size={'medium'}
        weight={'bold'}
        className={s.goBackLink}
      >
        <ArrowBack /> {t('BackToUsersList')}
      </Text>
      <div className={s.profileDataContainer}>
        <Image
          src={profile.avatars[0]?.url ?? noImage}
          alt={'avatar image'}
          width={60}
          height={60}
          className={clsx(s.avatar, !profile.avatars[0] && s.withoutAvatarImg)}
          priority
        />
        <div className={s.userNameAndLink}>
          <Text as={'p'} size={'xl'} weight={'bold'} className={s.userName}>
            {userName}
          </Text>
          <Text
            onClick={() => router.push(`${RoutersPath.profile}/${id}`)}
            as={'p'}
            size={'small_link'}
            className={s.profileLink}
          >
            {profile.firstName} {profile.lastName}
          </Text>
        </div>
      </div>
      <div className={s.userIdAndCreationDate}>
        <div className={s.userId}>
          {t('UserID')}
          <Text as={'div'} size={'regular'} className={s.userId_text}>
            {id}
          </Text>
        </div>
        <div className={s.creationDate}>
          {t('ProfileCreationDate')}
          <Text as={'p'} size={'regular'} className={s.creationDate_text}>
            {createdAtDate}
          </Text>
        </div>
      </div>
    </div>
  )
}
