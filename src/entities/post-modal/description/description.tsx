import React from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'

import styles from './description.module.scss'

import { PostResponseType, selectIsLoggedIn } from '@/shared/api'
import noImage from '@/shared/assets/icons/avatar-profile/not-photo.png'
import likeIcon from '@/shared/assets/icons/icons/like-icon.svg'
import { RoutersPath } from '@/shared/constants/paths'
import { findDate } from '@/shared/utils/find-date'

export const Description = ({
  avatarOwner,
  ownerId,
  userName,
  updatedAt,
  description,
}: PostResponseType) => {
  const router = useRouter()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const postUpdatedAt = findDate.difference(updatedAt)

  const { t } = useTranslation('common', { keyPrefix: 'Post' })

  return (
    <div className={styles.descriptionContainer}>
      <div
        className={styles.avatarContainer}
        onClick={() => router.push(`${RoutersPath.profile}/${ownerId}`)}
      >
        <Image src={avatarOwner || noImage} alt={'avatar'} objectFit="cover" fill={true} />
      </div>
      <div className={styles.descriptionTextAndLikeWrapper}>
        <div className={styles.descriptionTextContainer}>
          <p className={styles.descriptionText}>
            <span
              className={styles.descriptionTextName}
              onClick={() => router.push(`${RoutersPath.profile}/${ownerId}`)}
            >
              <strong>{userName}</strong>
            </span>
            {description}
          </p>
          {isLoggedIn && (
            <div className={styles.descriptionLikeContainer}>
              <Image src={likeIcon} alt={''} />
            </div>
          )}
        </div>
        <div className={styles.descriptionInfoContainer}>
          <p className={styles.descriptionTime}>{postUpdatedAt}</p>
          {isLoggedIn && (
            <>
              <p className={styles.descriptionLikes}>{t('Likes')}: 12</p>
              <p className={styles.descriptionAnswer}>{t('Answer')}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
