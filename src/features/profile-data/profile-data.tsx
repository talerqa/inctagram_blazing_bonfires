import React from 'react'

import Image from 'next/image'
import router from 'next/router'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'

import style from './profile-data.module.scss'

import { ProfileFollowing } from '@/entities/profile-following'
import { selectIsMobile } from '@/shared/api'
import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import { useGetUserDataQuery } from '@/shared/api/services/search/search.api'
import noImage from '@/shared/assets/icons/avatar-profile/not-photo.png'
import { ShortLangs } from '@/shared/types/lang-switcher-types'
import { Button, LinearLoader, Text } from '@/shared/ui'

type Props = {
  profileData: ProfileUserType | undefined
}
export const ProfileData = ({ profileData }: Props) => {
  const {
    i18n: { t: tRoot, language },
  } = useTranslation('common', { keyPrefix: 'Profile' })
  const isMobile = useSelector(selectIsMobile)

  const { data: userData, isLoading } = useGetUserDataQuery({ userName: profileData?.userName })

  return (
    <>
      {isLoading && <LinearLoader />}
    <div className={style.headerWrapper}>
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
            {!isMobile && (
              <>
                <b>{profileData?.userName}</b>
                <Button
                  className={style.buttonProfileSetting}
                  style={language === ShortLangs.RU ? { fontSize: '0.875rem' } : undefined}
                  onClick={() => router.push(`profile/general-information`)}
                >
                  {tRoot('ProfileSetting')}
                </Button>
              </>
            )}
          </div>
          <ProfileFollowing
            amountFollowing={userData?.followingCount}
            amountFollowers={userData?.followersCount}
            amountPublications={userData?.publicationsCount}
          />
          {!isMobile && (
            <div className={style.textWrapper}>
              <Text size={'regular'}>{profileData?.aboutMe}</Text>
            </div>
          )}
        </div>
      </div>
      {isMobile && (
        <>
          <div className={style.username}>
            <b>{profileData?.userName}</b>
          </div>
          <div className={style.textWrapperMobile}>
            <Text size={'regular'}>{profileData?.aboutMe}</Text>
          </div>
        </>
      )}
    </div>
    </>
  )
}
