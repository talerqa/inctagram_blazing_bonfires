import React from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import styles from './some-comment.module.scss'

import { CommentType } from '@/shared/api/services/posts/posts.api.types'
import noImage from '@/shared/assets/icons/avatar-profile/not-photo.png'
import likeIcon from '@/shared/assets/icons/icons/like-icon.svg'
import { RoutersPath } from '@/shared/constants/paths'
import { findDate } from '@/shared/utils'

export const SomeComment = ({
  from,
  content,
  createdAt,
  isLoggedIn,
}: CommentType & { key: number; isLoggedIn: boolean }) => {
  const router = useRouter()
  const { t } = useTranslation('common', { keyPrefix: 'Post' })
  const commentCreatedAt = findDate.difference(createdAt)

  return (
    <div className={styles.commentContainer}>
      <div
        className={styles.avatarContainer}
        onClick={() => router.push(`${RoutersPath.profile}/${from.id}`)}
      >
        <Image src={noImage} alt={'avatar'} objectFit="cover" fill={true} />
      </div>
      <div className={styles.commentTextAndLikeWrapper}>
        <div className={styles.commentTextContainer}>
          <p className={styles.commentText}>
            <span
              className={styles.commentTextName}
              onClick={() => router.push(`${RoutersPath.profile}/${from.id}`)}
            >
              <strong>{from.username}</strong>
            </span>
            {content}
          </p>
          <div className={styles.commentLikeContainer}>
            <Image src={likeIcon} alt={''} />
          </div>
        </div>
        <div className={styles.commentInfoContainer}>
          <p className={styles.commentTime}>{commentCreatedAt}</p>
          {isLoggedIn && (
            <>
              <p className={styles.commentLikes}>{t('Likes')}: 12</p>
              <p className={styles.commentAnswer}>{t('Answer')}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
