import React from 'react'

import { clsx } from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import s from './user-profile-view.module.scss'

import { User } from '@/__generated__/graphql'
import { ArrowBack } from '@/shared/assets/icons'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { RoutersPath } from '@/shared/constants/paths'
import { CircularLoader, Text } from '@/shared/ui'
import { findDate } from '@/shared/utils/find-date'

export const UserProfileView = ({ userName, profile, id }: User) => {
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
          <Link target="_blank" className={s.profileLink} href={`${RoutersPath.profile}/${id}`}>
            {profile.firstName} {profile.lastName}
          </Link>
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
