import React from 'react'

import { clsx } from 'clsx'
import Image from 'next/image'

import style from './PublicProfileData.module.scss'

import { ProfileFollowing } from '@/entities/profileFollowing'
import { PublicProfileType } from '@/shared/api/services/public/public.api.types'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { useTruncateText } from '@/shared/hooks'
import { Text } from '@/shared/ui'

type PropsType = {
  data: PublicProfileType
  amountPost: number
}

export const PublicProfileData = (props: PropsType) => {
  const {
    data: { userName, aboutMe, avatars },
    amountPost,
  } = props

  const { displayShowMore, isShowMoreActive, setIsShowMoreActive, fullText } = useTruncateText(
    aboutMe,
    150
  )

  const notImageClass = clsx(style.avatar, !avatars[0] && style.notAvatar)

  return (
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
      <div className={style.profileInfoContainer}>
        <ProfileFollowing
          amountFollowing={212}
          amountFollowers={212}
          amountPublications={amountPost}
        />
      </div>
      <div>
        <Text as={'p'} size={'xxl'} weight={'bold'} className={style.userName}>
          {userName}
        </Text>
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
  )
}
