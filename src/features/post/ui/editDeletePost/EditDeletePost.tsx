import React, { useState } from 'react'

import NextImage from 'next/image'
import { useTranslation } from 'next-i18next'

import styles from './EditDeletePost.module.scss'

import NewPostModal from '@/features/create-post/ui/newPostModal/NewPostModal'
import { DeletePost } from '@/features/post/ui/icons/DeletePost'
import { EditPost } from '@/features/post/ui/icons/EditPost'
import { useDeletePostMutation } from '@/shared/api/services/posts/posts.api'
import { PostsResponseType } from '@/shared/api/services/posts/posts.api.types'
import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import closeIcon from '@/shared/assets/icons/logout/close.svg'
import { Button, ButtonTheme } from '@/shared/ui/'

type Props = {
  postData: PostsResponseType | undefined
  setIsPostActive: (isPostActive: boolean) => void
  profileData: ProfileUserType | undefined
  setIsOpenEdit: (isOpenEdit: boolean) => void
  setIsDeleteModalOpen: (isDeleteModalOpen: boolean) => void
  isDeleteModalOpen: boolean
}
export const EditDeletePost = ({
  postData,
  setIsPostActive,
  setIsDeleteModalOpen,
  isDeleteModalOpen,
}: Props) => {
  const [deletePost] = useDeletePostMutation()
  const { t } = useTranslation('common', { keyPrefix: 'Post' })
  const removePostHandler = () => {
    if (postData) {
      deletePost(postData.id)
        .unwrap()
        .then(() => setIsPostActive(false))
    }
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  return (
    <>
      {isDeleteModalOpen && (
        <NewPostModal
          isOpen={isDeleteModalOpen}
          setIsOpen={closeDeleteModal}
          title={t('DeletePost')}
          right={
            <NextImage
              style={{ cursor: 'pointer' }}
              src={closeIcon}
              alt={''}
              onClick={closeDeleteModal}
            />
          }
        >
          <div className={styles.modalWrapper}>
            <div className={styles.textWrapper}>
              <p className={styles.text}>{t('DeleteUserPost')}</p>
            </div>

            <div className={styles.buttonsContainer}>
              <Button
                theme={ButtonTheme.CLEAR}
                className={styles.button}
                onClick={removePostHandler}
              >
                {t('Yes')}
              </Button>
              <Button className={styles.button} onClick={closeDeleteModal}>
                {t('No')}
              </Button>
            </div>
          </div>
        </NewPostModal>
      )}
    </>
  )
}
