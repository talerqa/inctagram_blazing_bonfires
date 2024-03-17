import React, { ChangeEvent, useState } from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { toast, Toaster } from 'react-hot-toast'
import { useWizard } from 'react-use-wizard'

import style from './publication.module.scss'

import { NextStepLink } from '@/features/create-post/components/next-step-link/next-step-link'
import { CloseModal } from '@/features/create-post/steps/close-modal/close-modal'
import { ImagePublication } from '@/features/create-post/steps/image-publication/image-publication'
import { NewPostModal } from '@/features/create-post/ui/new-post-modal/new-post-modal'
import {
  useCreatePostMutation,
  useUploadImageMutation,
} from '@/shared/api/services/posts/posts.api'
import { useGetProfileUserQuery } from '@/shared/api/services/profile/profile.api'
import { ArrowBack2 } from '@/shared/assets/icons/arrow-back-icon/arrow-back2'
import { useImageCropContext } from '@/shared/hooks/use-image-crop-context'
import { LinearLoader, Input, InputType } from '@/shared/ui'

export const Publication = () => {
  const { isOpen } = useImageCropContext()
  const [text, setText] = useState<string>('')
  const { previousStep, goToStep } = useWizard()
  const cropContext = useImageCropContext()

  const { data: profileData } = useGetProfileUserQuery()
  const [uploadImage, { isLoading: isUploadLoading }] = useUploadImageMutation()
  const [createPost, { isLoading: isCreatePostLoading }] = useCreatePostMutation()

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
        left={<ArrowBack2 onClick={previousStep} />}
        right={<NextStepLink onClick={handlePublish} title={'Publish'} />}
      >
        <div className={style.publishModalContent}>
          <div className={style.sliderWrapper}>
            <ImagePublication cropContext={cropContext} />
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
                <Input
                  as={'textarea'}
                  label={t('Descriptions')}
                  rows={6}
                  cols={60}
                  value={text}
                  maxLength={500}
                  onChange={handleChange}
                />
                <div className={style.maxLength}> {text.length}/500</div>
                <Input label={t('AddLocation')} type={InputType.LOCATION} />
              </div>
            </div>
          </div>
        </div>
      </NewPostModal>
      {cropContext.isOpenModal && <CloseModal cropContext={cropContext} />}
    </>
  )
}
