import React from 'react'

import Image from 'next/image'
import router from 'next/router'
import { useTranslation } from 'next-i18next'

import style from './profile-data.module.scss'

import { ProfileFollowing } from '@/entities/profile-following'
import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import noImage from '@/shared/assets/icons/avatar-profile/not-photo.png'
import { ShortLangs } from '@/shared/types/lang-switcher-types'
import { Button, Text } from '@/shared/ui'

type Props = {
  profileData: ProfileUserType | undefined
}
export const ProfileData = ({ profileData }: Props) => {
  const {
    i18n: { t: tRoot, language },
  } = useTranslation('common', { keyPrefix: 'Profile' })

  return (
    <div className={style.headerContainer}>
      <div className={style.avatarContainer}>
        <Image
          src={profileData?.avatars?.[0]?.url ?? noImage}
          alt={'avatar'}
          width={204}
          height={204}
        />
      </div>
      <div className={style.profileInfoContainer}>
        <div className={style.profileTitleContainer}>
          <div>{profileData?.userName}</div>
          <Button
            className={style.buttonProfileSetting}
            style={language === ShortLangs.RU ? { fontSize: '0.875rem' } : undefined}
            onClick={() => router.push(`profile/general-information`)}
          >
            {tRoot('ProfileSetting')}
          </Button>
        </div>
        <ProfileFollowing amountFollowing={2128} amountFollowers={2128} amountPublications={2128} />
        <div className={style.textWrapper}>
          <Text size={'regular'}>{profileData?.aboutMe}</Text>
        </div>
      </div>
    </div>
  )
}
