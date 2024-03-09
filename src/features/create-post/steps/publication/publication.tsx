import React, { ChangeEvent, useState } from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { toast, Toaster } from 'react-hot-toast'
import { useWizard } from 'react-use-wizard'

import style from './publication.module.scss'

import { useImageCropContext } from '@/features/create-post/context/crop-provider'
import { CloseModal } from '@/features/create-post/steps/close-modal/close-modal'
import NewPostModal from '@/features/create-post/ui/new-post-modal/new-post-modal'
import {
  useCreatePostMutation,
  useUploadImageMutation,
} from '@/shared/api/services/posts/posts.api'
import { ImageDataType } from '@/shared/api/services/posts/posts.api.types'
import { useGetProfileUserQuery } from '@/shared/api/services/profile/profile.api'
import backIcon from '@/shared/assets/icons/arrow-back/back.svg'
import { LinearLoader, Input, InputType } from '@/shared/ui'

export const Publication = () => {
  const { isOpen, setIsOpen, isSelectFromComputerOpen } = useImageCropContext()
  const [text, setText] = useState<string>('')
  const { previousStep, goToStep } = useWizard()
  const cropContext = useImageCropContext()

  const { data: profileData } = useGetProfileUserQuery()
  const [uploadImage, { isLoading: isUploadLoading }] = useUploadImageMutation()
  const [createPost, { isLoading: isCreatePostLoading }] = useCreatePostMutation()
  const savedImagesString = localStorage.getItem('uploadedImages')

  const { t } = useTranslation('common', { keyPrefix: 'AddPost' })

  const avatar = profileData?.avatars[1]?.url || ''

  const isLoading = isUploadLoading || isCreatePostLoading

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const handlePublish = async () => {
    const formData = new FormData()

    // преобразование url всех изображений в file
    for (const photo of cropContext.photos) {
      const result = await fetch(photo.filteredUrl)
      const blob = await result.blob()
      const file = new File([blob], 'image', { type: 'image/jpg' })

      // Добавление file в FormData
      formData.append('file', file)
    }

    uploadImage(formData)
      .unwrap()
      .then(res => {
        const uploadIds = res.images.map(image => image.uploadId)

        const body = {
          description: text,
          childrenMetadata: uploadIds.map(uploadId => ({ uploadId })),
        }

        createPost(body)
          .unwrap()
          .then(() => {
            toast.success('PublicPost Created')
            cropContext.setIsOpenModal(false)
            cropContext.setIsOpen(false)
            localStorage.removeItem('uploadedImages')
            cropContext.resetData()
            setTimeout(() => {
              goToStep(0)
            })
          })
          .catch(error => {
            toast.error(error.data.messages[0]?.message)
          })
      })
      .catch(error => {
        toast.error(error.data.messages[0]?.message)
      })
  }

  return (
    <>
      <Toaster position={'bottom-center'} />
      {isLoading && <LinearLoader />}
      <NewPostModal
        isOpen={isOpen}
        title={t('Publication')}
        setIsOpen={() => cropContext.setIsOpenModal(true)}
        left={
          <Image style={{ cursor: 'pointer' }} src={backIcon} alt={''} onClick={previousStep} />
        }
        right={
          <span style={{ cursor: 'pointer' }} onClick={handlePublish}>
            {t('Publish')}
          </span>
        }
      >
        <div className={style.publishModalContent}>
          <div className={style.sliderWrapper}></div>
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
                  value={text}
                  maxLength={500}
                  onChange={handleChange}
                  style={{ backgroundColor: 'black', width: '100%' }}
                />
                <div className={style.maxLength}> {text.length}/500</div>
                <Input
                  label={t('AddLocation')}
                  placeholder={''}
                  type={InputType.LOCATION}
                  style={{ marginBottom: '20px' }}
                  classnamewrap={'myCustomLabel'}
                />
              </div>
            </div>
          </div>
        </div>
      </NewPostModal>
      {cropContext.isOpenModal && <CloseModal cropContext={cropContext} />}
    </>
  )
}
