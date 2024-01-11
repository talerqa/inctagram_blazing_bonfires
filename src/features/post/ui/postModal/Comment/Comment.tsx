import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import styles from './Comment.module.scss'

import { PostsResponseType } from '@/shared/api/services/posts/posts.api.types'
import noImage from '@/shared/assets/icons/avatarProfile/notPhoto.png'
import likeIcon from '@/shared/assets/icons/icons/likeIcon.svg'
import saveIcon from '@/shared/assets/icons/icons/saveIcon.svg'
import shareIcon from '@/shared/assets/icons/icons/shareIcon.svg'
import { findDate } from '@/shared/utils/findDate'

type Props = {
  postData: PostsResponseType
}

export const Comment = ({ postData }: Props) => {
  const { t } = useTranslation('common', { keyPrefix: 'Post' })
  const postCreatedAt = findDate.format(postData.createdAt)
  const postUpdatedAt = findDate.difference(postData.updatedAt)

  return (
    <>
      <div className={styles.commentContainerWrapper}>
        <div className={styles.commentContainer}>
          <div className={styles.avatarContainer}>
            <Image
              src={postData.images[0].url ?? noImage}
              alt={'avatar'}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles.commentTextAndLikeWrapper}>
            <div className={styles.commentTextContainer}>
              <p className={styles.commentText}>
                <strong>{postData.owner.firstName || 'null'} </strong>
                {postData?.description}
              </p>
              <div className={styles.commentLikeContainer}>
                <Link href={'#'}>
                  <Image src={likeIcon} alt={''} />
                </Link>
              </div>
            </div>
            <div className={styles.commentInfoContainer}>
              <p className={styles.commentTime}>{postUpdatedAt}</p>
              <p className={styles.commentLikes}>{t('Likes')}: 12</p>
              <p className={styles.commentAnswer}>{t('Answer')}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.summaryContainer}>
        <div className={styles.actionsContainer}>
          <div className={styles.likeShareContainer}>
            <Image src={likeIcon} width={24} height={24} style={{ cursor: 'pointer' }} alt={''} />
            <Image src={shareIcon} width={24} height={24} style={{ cursor: 'pointer' }} alt={''} />
          </div>
          <div>
            <Image src={saveIcon} width={24} height={24} style={{ cursor: 'pointer' }} alt={''} />
          </div>
        </div>
        <div className={styles.totalLikes}>
          <div className={styles.avatarContainer}>
            <Image src={noImage} alt={'avatar'} width={36} height={36} />
          </div>
          <p className={styles.totalLikesCount}>2435 {t('Likes')}</p>
        </div>
        <div className={styles.postDate}>{postCreatedAt}</div>
      </div>
      <div className={styles.addCommentContainer}>
        <form className={styles.addCommentForm}>
          <input className={styles.addCommentInput} placeholder={t('AddComment')} type="text" />
          <button className={styles.addCommentButton}>{t('Publish')}</button>
        </form>
      </div>
    </>
  )
}
