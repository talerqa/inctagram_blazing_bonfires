import React from 'react'

import { clsx } from 'clsx'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import style from './public-profile-data.module.scss'

import { ProfileFollowing } from '@/entities/profile-following'
import { PublicProfileType } from '@/shared/api/services/public/public.api.types'
import { useFollowUserMutation, useGetUserDataQuery } from '@/shared/api/services/search/search.api'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { useTruncateText } from '@/shared/hooks'
import { Button, ButtonTheme, LinearLoader, Text } from '@/shared/ui'

type PropsType = {
  data: PublicProfileType
  amountPost: number
}

export const PublicProfileData = (props: PropsType) => {
  const {
    data: { userName, aboutMe, avatars, id },
    amountPost,
  } = props

  const { displayShowMore, isShowMoreActive, setIsShowMoreActive, fullText } = useTruncateText(
    aboutMe,
    150
  )

  const notImageClass = clsx(style.avatar, !avatars[0] && style.notAvatar)

  const { data: userData } = useGetUserDataQuery({ userName })
  const [followUser, { isLoading }] = useFollowUserMutation()
  const { t } = useTranslation('common', { keyPrefix: 'SearchPage' })

  return (
    <>
      {isLoading && <LinearLoader />}
      <div className={style.profileContainer}>
        <div className={style.avatarContainer}>
          <Image
            src={avatars[0]?.url ?? noImage}
            alt={'avatar'}
            width={204}
            height={204}
            className={notImageClass}
            priority
          />
        </div>
        <div className={style.profileDataContainer}>
          <div className={style.profileDataHeader}>
            <Text as={'p'} size={'xxl'} weight={'bold'} className={style.userName}>
              {userName}
            </Text>
            <div className={style.buttonsContainer}>
              {!userData?.isFollowing ? (
                <Button onClick={() => followUser({ selectedUserId: id })}>{t('Follow')}</Button>
              ) : (
                <Button
                  theme={ButtonTheme.CLEAR}
                  onClick={() => followUser({ selectedUserId: id })}
                >
                  {t('Unfollow')}
                </Button>
              )}

              <Button>SendMessage</Button>
            </div>
          </div>
          <div className={style.profileInfo}>
            <ProfileFollowing
              amountFollowing={userData?.followingCount}
              amountFollowers={userData?.followersCount}
              amountPublications={amountPost}
            />
          </div>

          <div className={style.profileTitleContainer}>
            <Text as={'p'} size={'regular'} weight={'regular'} className={style.fullText}>
              {aboutMe ? fullText : ''}{' '}
              {displayShowMore && (
                <Text
                  onClick={() => setIsShowMoreActive(!isShowMoreActive)}
                  size={'link'}
                  color={'info'}
                  as={'span'}
                  className={style.showMore}
                >
                  {isShowMoreActive ? 'Hide' : 'Show more'}
                </Text>
              )}
            </Text>
          </div>
        </div>
      </div>
    </>
  )
}
