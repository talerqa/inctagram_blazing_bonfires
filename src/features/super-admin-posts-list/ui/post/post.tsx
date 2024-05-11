import React, { useRef, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'

import s from './post.module.scss'

import { Post as PostType, User } from '@/__generated__/graphql'
import { UnbanUserModal, UserBanModal } from '@/features/super-admin-user-management'
import {
  setBanModalOpenStatus,
  setSearchParameter,
  setSelectedUser,
} from '@/features/super-admin-user-management/model/user-management-slice'
import { handleInputChange } from '@/pages/super-admin/lib/utils/utils'
import { selectIsLoggedIn } from '@/shared/api'
import { BannedIcon } from '@/shared/assets/icons'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { RoutersPath } from '@/shared/constants/paths'
import { useTruncateText } from '@/shared/hooks'
import { Input, InputType, Text } from '@/shared/ui'
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

  return (
    <>
      <div className={s.post} key={id}>
        <div className={s.postLinkWrapper}>
          <Image
            src={images?.[0]?.url ?? noImage}
            width={234}
            height={isShowMoreActive ? 110 : 240}
            alt="Picture of the post"
          />
          <div className={s.postContentWrapper}>
            <div>
              <Image
                src={images?.[0]?.url ?? noImage}
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
