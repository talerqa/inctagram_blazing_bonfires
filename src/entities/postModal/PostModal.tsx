import React, { useState } from 'react'

import * as RDropdownMenu from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'

import { Comment } from '@/entities/postModal/Comment/Comment'
import styles from '@/entities/postModal/PostModal.module.scss'
import { EditDeletePost } from '@/features/post/ui/editDeletePost/EditDeletePost'
import { EditDescriptionPost } from '@/features/post/ui/editDescriptionModal/EditDescriptionPost'
import { DeletePost } from '@/features/post/ui/icons/DeletePost'
import { EditPost } from '@/features/post/ui/icons/EditPost'
import { PostImages } from '@/features/post/ui/postImagesModal/PostImages'
import { selectIsLoggedIn } from '@/shared/api'
import { PostResponseType } from '@/shared/api/services/posts/posts.api.types'
import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import noImage from '@/shared/assets/icons/avatarProfile/notPhoto.png'
import closeIcon from '@/shared/assets/icons/icons/closeIcon.svg'
import { ThreeDots } from '@/shared/assets/icons/threeDots/icon/threeDots'
import { RoutersPath } from '@/shared/constants/paths'
import { DropdownMenu } from '@/shared/ui'

type Props = {
  postData: PostResponseType
  profileData?: ProfileUserType | undefined
  togglePostModal: () => void
}

export const PostModal = ({ postData, togglePostModal, profileData }: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const {
    avatarOwner,
    owner: { firstName, lastName },
    ownerId,
  } = postData

  const { t } = useTranslation('common', { keyPrefix: 'Post' })
  const router = useRouter()
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const userName = `${firstName} ${lastName}` || t('AnonymousUser')

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
            <div className={styles.descriptionContainer}>
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
                  <p className={styles.userName}>{userName}</p>
                </div>
                {isLoggedIn && (
                  <DropdownMenu triggerIcon={<ThreeDots />}>
                    <RDropdownMenu.Item onSelect={togglePostModal}>
                      <EditPost />
                      <p>{t('EditPost')}</p>
                    </RDropdownMenu.Item>
                    <RDropdownMenu.Item onSelect={togglePostModal}>
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
              <Comment postData={postData} isLoggedIn={isLoggedIn} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
