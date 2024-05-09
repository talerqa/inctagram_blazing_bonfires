import React, { useState } from 'react'

import * as RDropdownMenu from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'

import { Comments } from '@/entities/post-modal/comments/comments'
import styles from '@/entities/post-modal/post-modal.module.scss'
import { EditDeletePost } from '@/features/post/ui/edit-delete-post/edit-delete-post'
import { EditDescriptionPost } from '@/features/post/ui/edit-description-modal/edit-description-post'
import { DeletePost } from '@/features/post/ui/icons/delete-post'
import { EditPost } from '@/features/post/ui/icons/edit-post'
import { PostImages } from '@/features/post/ui/post-images-modal/post-images'
import { selectIsLoggedIn } from '@/shared/api'
import { PostResponseType } from '@/shared/api/services/posts/posts.api.types'
import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import noImage from '@/shared/assets/icons/avatar-profile/not-photo.png'
import closeIcon from '@/shared/assets/icons/icons/close-icon.svg'
import { ThreeDots } from '@/shared/assets/icons/three-dots/icon/three-dots'
import { RoutersPath } from '@/shared/constants/paths'
import { DropdownMenu } from '@/shared/ui'

type Props = {
  postData: PostResponseType
  profileData?: ProfileUserType | undefined
  togglePostModal: () => void
}

export const PostModal = ({ postData, togglePostModal, profileData }: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { avatarOwner, ownerId, userName } = postData

  const { t } = useTranslation('common', { keyPrefix: 'Post' })
  const router = useRouter()
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const username = `${userName}` || t('AnonymousUser')

  const openEditModal = () => {
    setIsOpenEdit(true)
  }

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  return (
    <>
      {isOpenEdit ? (
        <EditDescriptionPost
          profileData={profileData}
          postData={postData}
          setIsOpenEdit={setIsOpenEdit}
          isOpenEdit={isOpenEdit}
        />
      ) : (
        <div className={styles.postContainer}>
          <div className={styles.post}>
            <div className={styles.closeIconContainer}>
              <Image src={closeIcon} alt={''} onClick={togglePostModal} />
            </div>
            <div className={styles.postPhotoContainer}>
              <PostImages postData={postData} />
            </div>
            <div className={styles.postBodyContainer}>
              <div className={styles.headerContainer}>
                <div
                  className={styles.avatarContainer}
                  onClick={() => router.push(`${RoutersPath.profile}/${ownerId}`)}
                >
                  <div className={styles.imgContainer}>
                    <Image
                      src={avatarOwner ?? noImage}
                      alt={'avatar'}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <p className={styles.userName}>{username}</p>
                </div>
                {isLoggedIn && postData.ownerId === profileData?.id && (
                  <DropdownMenu triggerIcon={<ThreeDots />}>
                    <RDropdownMenu.Item onSelect={openEditModal}>
                      <EditPost />
                      <p>{t('EditPost')}</p>
                    </RDropdownMenu.Item>
                    <RDropdownMenu.Item onSelect={openDeleteModal}>
                      <DeletePost />
                      <p>{t('DeletePost')}</p>
                    </RDropdownMenu.Item>
                  </DropdownMenu>
                )}
                {isDeleteModalOpen && (
                  <EditDeletePost
                    postData={postData}
                    setIsPostActive={togglePostModal}
                    setIsOpenEdit={setIsOpenEdit}
                    profileData={profileData}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    isDeleteModalOpen={isDeleteModalOpen}
                  />
                )}
              </div>
              <Comments {...postData} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
