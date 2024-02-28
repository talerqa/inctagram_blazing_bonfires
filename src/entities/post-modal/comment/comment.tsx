import React from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'

import styles from './comment.module.scss'

import { selectIsLoggedIn } from '@/shared/api'
import { useCreatePostCommentQuery } from '@/shared/api/services/posts/posts.api'
import { PostResponseType } from '@/shared/api/services/posts/posts.api.types'
import noImage from '@/shared/assets/icons/avatar-profile/not-photo.png'
import likeIcon from '@/shared/assets/icons/icons/like-icon.svg'
import saveIcon from '@/shared/assets/icons/icons/save-icon.svg'
import shareIcon from '@/shared/assets/icons/icons/share-icon.svg'
import { findDate } from '@/shared/utils/find-date'

export const Comment = ({ avatarOwner, createdAt, id }: PostResponseType) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { t } = useTranslation('common', { keyPrefix: 'Post' })
  const postCreatedAt = findDate.format(createdAt)

  const postLikes = 2435

  const { data } = useCreatePostCommentQuery({ postId: id, content: 'hardcode' })

  return (
    <div className={styles.commentContainerWrapper}>
      <div className={styles.summaryContainer}>
        {isLoggedIn && (
          <div className={styles.actionsContainer}>
            <div className={styles.likeShareContainer}>
              <Image src={likeIcon} width={24} height={24} style={{ cursor: 'pointer' }} alt={''} />
              <Image
                src={shareIcon}
                width={24}
                height={24}
                style={{ cursor: 'pointer' }}
                alt={''}
              />
            </div>
            <div>
              <Image src={saveIcon} width={24} height={24} style={{ cursor: 'pointer' }} alt={''} />
            </div>
          </div>
        )}
        <div className={styles.totalLikes}>
          <div className={styles.avatarContainer}>
            <Image
              className={styles.totalLikesAvatar}
              src={avatarOwner || noImage}
              alt={'avatar'}
              width={24}
              height={24}
            />
          </div>
          <p className={styles.totalLikesCount}>
            {postLikes.toLocaleString()} {t('Likes')}
          </p>
        </div>
        <div className={styles.postDate}>{postCreatedAt}</div>
      </div>
      {isLoggedIn && (
        <div className={styles.addCommentContainer}>
          <form className={styles.addCommentForm}>
            <input className={styles.addCommentInput} placeholder={t('AddComment')} type="text" />
            <button className={styles.addCommentButton}>{t('Publish')}</button>
          </form>
        </div>
      )}
    </div>
  )
}
