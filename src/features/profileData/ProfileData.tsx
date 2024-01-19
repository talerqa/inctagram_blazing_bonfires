import React from 'react'

import Image from 'next/image'
import router from 'next/router'
import { useTranslation } from 'next-i18next'

import style from './ProfileData.module.scss'

import { ProfileFollowing } from '@/entities/profileFollowing'
import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import noImage from '@/shared/assets/icons/avatarProfile/notPhoto.png'
import { ShortLangs } from '@/shared/types/langSwitcherTypes'
import { Button } from '@/shared/ui'

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
        <Image src={noImage} alt={'avatar'} width={48} height={48} />
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
      </div>
    </div>
  )
}
