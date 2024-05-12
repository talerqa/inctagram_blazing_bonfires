import React from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'

import s from './post.module.scss'

import { Post as PostType, User } from '@/__generated__/graphql'
import { UserBanModal } from '@/features/super-admin-user-management'
import {
  setBanModalOpenStatus,
  setSelectedUser,
} from '@/features/super-admin-user-management/model/user-management-slice'
import { BannedIcon } from '@/shared/assets/icons'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { useTruncateText } from '@/shared/hooks'
import { Text, Carousel } from '@/shared/ui'
import { findDate } from '@/shared/utils/find-date'

export const Post = (post: PostType) => {
  const { images, postOwner, description, createdAt, id } = post

  const { t } = useTranslation('common', { keyPrefix: 'Post' })
  const postCreatedAt = findDate.difference(createdAt)
  const dispatch = useDispatch()

  const { displayShowMore, isShowMoreActive, setIsShowMoreActive, semiTruncatedDynamicText } =
    useTruncateText(description, 200, 70)

  const openBanModal = (user: User) => {
    dispatch(setBanModalOpenStatus(true))
    dispatch(setSelectedUser(user))
  }

  const userName = `${postOwner.firstName} ${postOwner.lastName}` || t('AnonymousUser')

  if (!images) return

  return (
    <>
      <div className={s.post} key={id}>
        <div className={s.postLinkWrapper}>
          <Carousel images={images} isShowMoreActive={isShowMoreActive} />

          <div className={s.postContentWrapper}>
            <div>
              <Image
                src={postOwner?.avatars?.[0]?.url ?? noImage}
                width={36}
                height={36}
                alt={'Avatar picture'}
              />
              <h3 className={s.profileUrl}>{userName}</h3>
            </div>
            <div onClick={() => openBanModal(post.postOwner as User)} style={{ cursor: 'pointer' }}>
              <BannedIcon width={24} height={24} />
            </div>
          </div>
        </div>
        <Text size={'small'} style={{ color: 'var(--color-light-900)' }}>
          {postCreatedAt}
        </Text>
        <p className={s.postDescription}>
          {semiTruncatedDynamicText}
          {'...'}
          {displayShowMore && (
            <span onClick={() => setIsShowMoreActive(!isShowMoreActive)} className={s.showMore}>
              {isShowMoreActive ? 'Hide' : 'Show more'}
            </span>
          )}
        </p>
      </div>
      <UserBanModal />
    </>
  )
}
