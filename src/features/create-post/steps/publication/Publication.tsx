import React, { ChangeEvent, useState } from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { toast, Toaster } from 'react-hot-toast'
import { useWizard } from 'react-use-wizard'

import style from './Publication.module.scss'

import { useImageCropContext } from '@/features/create-post/context/CropProvider'
import { ImagePublication } from '@/features/create-post/steps/imagePablication/ImagePublication'
import { SavedImage } from '@/features/create-post/steps/savedImage/SavedImage'
import NewPostModal from '@/features/create-post/ui/newPostModal/NewPostModal'
import {
  useCreatePostMutation,
  useUploadImageMutation,
} from '@/shared/api/services/posts/posts.api'
import { ImageDataType } from '@/shared/api/services/posts/posts.api.types'
import { useGetProfileUserQuery } from '@/shared/api/services/profile/profile.api'
import backIcon from '@/shared/assets/icons/arrow back/back.svg'
import { Input, InputType } from '@/shared/ui/input/Input'
import { LinearLoader } from '@/shared/ui/loaders/LinearLoader'

export const Publication = () => {
  const { isOpen, setIsOpen, isSelectFromComputerOpen } = useImageCropContext()
  const [text, setText] = useState<string>('')
  const { previousStep } = useWizard()
  const cropContext = useImageCropContext()

  const { data: profileData } = useGetProfileUserQuery()
  const [uploadImage, { isLoading: isUploadLoading }] = useUploadImageMutation()
  const [createPost, { isLoading: isCreatePostLoading }] = useCreatePostMutation()
  const savedImagesString = localStorage.getItem('uploadedImages')
  const savedImages: ImageDataType[] = savedImagesString ? JSON.parse(savedImagesString) : null

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
            toast.success('Post Created')
            setIsOpen(!isOpen)
          })
          .catch(error => {
            toast.error(error.data.messages[0].message)
          })
      })
      .catch(error => {
        toast.error(error.data.messages)
      })
  }
  const handleSavedImagePublish = () => {
    const uploadIds = savedImages.map(image => image.uploadId)
    const body = {
      description: text,
      childrenMetadata: uploadIds.map(uploadId => ({ uploadId })),
    }

    createPost(body)
      .unwrap()
      .then(() => {
        toast.success('Post Created')
        localStorage.removeItem('uploadedImages')
        setIsOpen(!isOpen)
      })
      .catch(error => {
        toast.error(error.data.messages[0].message)
      })
  }

  return (
    <>
      <Toaster position={'bottom-center'} />
      {isLoading && <LinearLoader />}
      <NewPostModal
        isOpen={isOpen}
        title={t('Publication')}
        setIsOpen={setIsOpen}
        left={
          <Image style={{ cursor: 'pointer' }} src={backIcon} alt={''} onClick={previousStep} />
        }
        right={
          <span
            style={{ cursor: 'pointer' }}
            onClick={savedImages ? handleSavedImagePublish : handlePublish}
          >
            {t('Publish')}
          </span>
        }
      >
        <div className={style.publishModalContent}>
          <div className={style.sliderWrapper}>
            {isSelectFromComputerOpen ? (
              <ImagePublication cropContext={cropContext} />
            ) : (
              savedImages.length > 0 && <SavedImage savedImages={savedImages} />
            )}
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
                  classNameWrap={'myCustomLabel'}
                />
              </div>
            </div>
          </div>
        </div>
      </NewPostModal>
    </>
  )
}
