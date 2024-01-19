import React, { ChangeEvent, useState } from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import style from './EditDescriptionPost.module.scss'

import NewPostModal from '@/features/create-post/ui/newPostModal/NewPostModal'
import { CloseEditModal } from '@/features/post/ui/closeEditModal/CloseEditModal'
import { PostImages } from '@/features/post/ui/postImagesModal/PostImages'
import { useUpdatePostMutation } from '@/shared/api/services/posts/posts.api'
import { PostResponseType } from '@/shared/api/services/posts/posts.api.types'
import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import noImage from '@/shared/assets/icons/avatarProfile/notPhoto.png'
import closeIcon from '@/shared/assets/icons/icons/closeIcon.svg'
import { Button, ButtonSize } from '@/shared/ui'

type Props = {
  profileData: ProfileUserType | undefined
  postData: PostResponseType | undefined
  setIsOpenEdit: (isOpenEdit: boolean) => void
  isOpenEdit: boolean
}
export const EditDescriptionPost = ({
  profileData,
  postData,
  setIsOpenEdit,
  isOpenEdit,
}: Props) => {
  const [description, setDescription] = useState(postData?.description || '')
  const [closeEditModal, setCloseEditModal] = useState(false)
  const [updatePost] = useUpdatePostMutation()
  const avatar = profileData?.avatars[1]?.url || noImage
  const { t } = useTranslation('common', { keyPrefix: 'Post' })

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value)
  }

  const saveNewDescription = () => {
    if (postData && description !== postData.description) {
      const data = {
        postId: postData.id,
        body: {
          description,
        },
      }

      updatePost(data)
        .unwrap()
        .then(() => setIsOpenEdit(false))
    }
  }
  const openCloseEditModal = () => {
    if (postData && description !== postData.description) {
      setIsOpenEdit(true)
      setCloseEditModal(true)
    } else {
      setIsOpenEdit(false)
      setCloseEditModal(false)
    }
  }

  return (
    <>
      <NewPostModal
        isOpen={isOpenEdit}
        title={t('EditPost')}
        setIsOpen={openCloseEditModal}
        right={
          <Image
            src={closeIcon}
            alt={''}
            onClick={openCloseEditModal}
            style={{ cursor: 'pointer' }}
          />
        }
      >
        <div className={style.publishModalContent}>
          <div className={style.sliderWrapper}>
            <PostImages postData={postData} />
          </div>
          <div className={style.publish}>
            <div className={style.publishContent}>
              <div className={style.avatarWrapper}>
                {avatar && (
                  <Image
                    src={avatar}
                    alt="userPhoto"
                    className={style.avatar}
                    width={45}
                    height={45}
                  />
                )}
                <div className={style.userName}>{profileData?.userName}</div>
              </div>
              <div className={style.description}>
                <label className={style.label}>{t('Descriptions')}</label>
                <textarea
                  rows={6}
                  cols={60}
                  value={description}
                  maxLength={500}
                  onChange={handleChange}
                  style={{ backgroundColor: 'black', width: '100%' }}
                />
                <div className={style.maxLength}> {description.length}/500</div>
              </div>
              <div className={style.button}>
                <Button size={ButtonSize.MIDDLE} onClick={saveNewDescription}>
                  {t('SaveChanges')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </NewPostModal>
      {closeEditModal && (
        <CloseEditModal
          closeEditModal={closeEditModal}
          setCloseEditModal={setCloseEditModal}
          setIsOpenEdit={setIsOpenEdit}
        />
      )}
    </>
  )
}
