import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'

import styles from './comment.module.scss'

import { AddComment } from '@/entities/post-modal/comments/add-comment/add-comment'
import { SomeComment } from '@/entities/post-modal/comments/some-comment/some-comment'
import { Description } from '@/entities/post-modal/description/description'
import { selectIsLoggedIn } from '@/shared/api'
import { useGetPostCommentsQuery } from '@/shared/api/services/posts/posts.api'
import { CommentType, PostResponseType } from '@/shared/api/services/posts/posts.api.types'
import noImage from '@/shared/assets/icons/avatar-profile/not-photo.png'
import likeIcon from '@/shared/assets/icons/icons/like-icon.svg'
import saveIcon from '@/shared/assets/icons/icons/save-icon.svg'
import shareIcon from '@/shared/assets/icons/icons/share-icon.svg'
import PlusCircle from '@/shared/assets/icons/plus-circle/plus-circle'
import { CircularLoader } from '@/shared/ui'
import { findDate } from '@/shared/utils'

export const Comments = (props: PostResponseType) => {
  const { avatarOwner, createdAt, id } = props
  const postCreatedAt = findDate.format(createdAt)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const { t } = useTranslation('common', { keyPrefix: 'Post' })

  const postLikes = props.likesCount
  const [pageNumber, setPageNumber] = useState(1)
  const [items, setItems] = useState<Array<CommentType> | undefined>(undefined)
  const { data: CommentData, isLoading } = useGetPostCommentsQuery({
    postId: id,
    pageNumber,
    pageSize: 10,
  })

  useEffect(() => {
    if (items && CommentData?.items) {
      setItems([...items, ...CommentData.items])
    } else if (CommentData?.items) {
      setItems(CommentData.items)
    }
  }, [CommentData])

  return (
    <div className={styles.commentContainerWrapper}>
      <div className={styles.allComments}>
        <Description {...props} />
        {items?.map(item => <SomeComment {...item} key={item.id} isLoggedIn />)}
        {!!CommentData?.totalCount &&
          !!items?.length &&
          CommentData?.totalCount > items?.length && (
            <div className={styles.plusIconContainer} onClick={() => setPageNumber(pageNumber + 1)}>
              <PlusCircle className={styles.plusIcon} />
            </div>
          )}
        {isLoading && <CircularLoader />}
      </div>
      <div className={styles.summaryContainer}>
        {isLoggedIn && (
          <div className={styles.actionsContainer}>
            <div className={styles.likeShareContainer}>
              {isLoggedIn && (
                <Image className={styles.icon} src={likeIcon} width={24} height={24} alt={'like'} />
              )}
              <Image className={styles.icon} src={shareIcon} width={24} height={24} alt={'share'} />
            </div>
            <div>
              <Image className={styles.icon} src={saveIcon} width={24} height={24} alt={'save'} />
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
      {isLoggedIn && <AddComment {...props} />}
    </div>
  )
}
