import React, { useState } from 'react'

import * as RDropdownMenu from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { EditDeletePost } from '@/features/post/ui/editDeletePost/EditDeletePost'
import { EditDescriptionPost } from '@/features/post/ui/editDescriptionModal/EditDescriptionPost'
import { DeletePost } from '@/features/post/ui/icons/DeletePost'
import { EditPost } from '@/features/post/ui/icons/EditPost'
import { PostImages } from '@/features/post/ui/postImagesModal/PostImages'
import { Comment } from '@/features/post/ui/postModal/Comment/Comment'
import styles from '@/features/post/ui/postModal/PostModal.module.scss'
import { PostsResponseType } from '@/shared/api/services/posts/posts.api.types'
import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import noImage from '@/shared/assets/icons/avatarProfile/notPhoto.png'
import closeIcon from '@/shared/assets/icons/icons/closeIcon.svg'
import { ThreeDots } from '@/shared/assets/icons/threeDots/icon/threeDots'
import { RoutersPath } from '@/shared/constants/paths'
import { DropdownMenu } from '@/shared/ui'

type Props = {
  postData: PostsResponseType
  profileData: ProfileUserType | undefined
  setIsPostActive: (isPostActive: boolean) => void
}

export const PostModal = ({ postData, setIsPostActive, profileData }: Props) => {
  const { t } = useTranslation('common', { keyPrefix: 'Post' })
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

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
          <Link href={RoutersPath.profile}>
            <div className={styles.closeIconContainer}>
              <Image src={closeIcon} alt={''} onClick={() => setIsPostActive(false)} />
            </div>
          </Link>
          <div className={styles.post}>
            <div className={styles.postPhotoContainer}>
              <PostImages postData={postData} />
            </div>
            <div className={styles.descriptionContainer}>
              <div className={styles.headerContainer}>
                <div className={styles.avatarContainer}>
                  <div className={styles.imgContainer}>
                    <Image
                      src={profileData?.avatars[0].url ?? noImage}
                      alt={'avatar'}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <p className={styles.userName}>{profileData?.userName}</p>
                </div>
                <DropdownMenu triggerIcon={<ThreeDots />}>
                  <RDropdownMenu.Item onSelect={() => setIsOpenEdit(true)}>
                    <EditPost />
                    <p>{t('EditPost')}</p>
                  </RDropdownMenu.Item>
                  <RDropdownMenu.Item onSelect={() => setIsDeleteModalOpen(true)}>
                    <DeletePost />
                    <p>{t('DeletePost')}</p>
                  </RDropdownMenu.Item>
                </DropdownMenu>
                {isDeleteModalOpen && (
                  <EditDeletePost
                    postData={postData}
                    setIsPostActive={setIsPostActive}
                    setIsOpenEdit={setIsOpenEdit}
                    profileData={profileData}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    isDeleteModalOpen={isDeleteModalOpen}
                  />
                )}
              </div>
              <Comment postData={postData} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
