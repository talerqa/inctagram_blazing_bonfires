import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import NextImage from 'next/image'
import { useTranslation } from 'next-i18next'
import { toast, Toaster } from 'react-hot-toast'
import { useWizard } from 'react-use-wizard'

import styles from './AddPhoto.module.scss'

import { useImageCropContext } from '@/features/create-post/context/CropProvider'
import { Publication } from '@/features/create-post/steps/publication/Publication'
import NewPostModal from '@/features/create-post/ui/newPostModal/NewPostModal'
import { ImageDataType } from '@/shared/api/services/posts/posts.api.types'
import mockupPhoto from '@/shared/assets/icons/avatarProfile/notPhoto.png'
import closeIcon from '@/shared/assets/icons/logout/close.svg'
import { Button } from '@/shared/ui/button/Button'

export const AddPhoto = () => {
  const { nextStep } = useWizard()
  const { setPhotoList, isOpen, setIsOpen, setIsSelectFromComputerOpen } = useImageCropContext()

  const inputRef = useRef<HTMLInputElement>(null)

  const [isPublicationOpen, setIsPublicationOpen] = useState(false)
  const [savedImage, setSavedImage] = useState<ImageDataType[]>([])

  const { t } = useTranslation('common', { keyPrefix: 'AddPost' })

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const savedImagesString = localStorage.getItem('uploadedImages')
      const savedImages = savedImagesString ? JSON.parse(savedImagesString) : null

      if (savedImages) {
        setSavedImage(savedImages)
      }
    }
  }, [])

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (!files) return

    // Проверка формата и размера каждого файла
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const allowedFormats = ['image/jpeg', 'image/png']
      const maxSizeInBytes = 20 * 1024 * 1024

      if (!allowedFormats.includes(file.type)) {
        // Формат файла не подходит
        toast('Пожалуйста, выберите файлы в формате JPEG или PNG.')

        return
      }

      if (file.size > maxSizeInBytes) {
        // Размер файла превышает лимит
        toast('Пожалуйста, выберите файлы размером не более 20 МБ.')

        return
      }
    }

    setPhotoList(files)
    await nextStep()
  }

  const openSelectHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsSelectFromComputerOpen(true)
    inputRef.current?.click()
  }

  const handleOpenDraft = () => {
    setIsPublicationOpen(true)
  }

  return (
    <>
      <Toaster position={'bottom-center'} />
      <NewPostModal
        isOpen={isOpen}
        title={t('AddPhoto')}
        setIsOpen={setIsOpen}
        right={
          <NextImage
            style={{ cursor: 'pointer' }}
            src={closeIcon}
            alt={''}
            onClick={() => setIsOpen(false)}
          />
        }
      >
        <div className={styles.addPhotoContentContainer}>
          <div className={styles.darkBox}>
            <NextImage src={mockupPhoto} alt={'mockup photo'} />
          </div>
          <div className={styles.buttonsContainer}>
            <input
              type={'file'}
              accept={'image/*'}
              multiple={true}
              onChange={handleFileChange}
              ref={inputRef}
              className={styles.inputPhoto}
            />
            <Button onClick={openSelectHandler} className={styles.button}>
              {t('SelectFromComputer')}
            </Button>
            {savedImage.length > 0 && (
              <Button onClick={handleOpenDraft} className={styles.button}>
                {t('OpenDraft')}
              </Button>
            )}
          </div>
          {isPublicationOpen && <Publication />}
        </div>
      </NewPostModal>
    </>
  )
}
