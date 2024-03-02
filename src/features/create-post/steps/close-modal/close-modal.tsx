import React from 'react'

import NextImage from 'next/image'
import { useTranslation } from 'next-i18next'
import { toast } from 'react-hot-toast'
import { useWizard } from 'react-use-wizard'

import style from './close-modal.module.scss'

import { CropContextType } from '@/features/create-post/context/crop-provider'
import NewPostModal from '@/features/create-post/ui/new-post-modal/new-post-modal'
import { filterBestQualityImages } from '@/features/create-post/utils/filter-best-quality-images'
import { useUploadImageMutation } from '@/shared/api/services/posts/posts.api'
import closeIcon from '@/shared/assets/icons/logout/close.svg'
import { LinearLoader, Button, ButtonTheme } from '@/shared/ui'

type Props = {
  cropContext: CropContextType
}
export const CloseModal = ({ cropContext }: Props) => {
  // const [uploadImage, { isLoading }] = useUploadImageMutation()
  const { t } = useTranslation('common', { keyPrefix: 'AddPost' })
  const { goToStep } = useWizard()
  const handleDiscard = () => {
    cropContext.resetData()
    cropContext.setIsOpenModal(false)
    cropContext.setIsOpen(false)
    // localStorage.removeItem('uploadedImages') todo
    goToStep(0)
  }
  const handleClose = () => {
    cropContext.setIsOpenModal(false)
  }
  // const handleSave = async () => {
  //   console.log('we  are in handleSave cropContext', cropContext)
  //   const formData = new FormData()
  //
  //   // преобразование url всех изображений в file
  //   for (const photo of cropContext.photos) {
  //     const result = await fetch(photo.filteredUrl)
  //
  //     const blob = await result.blob()
  //     const file = new File([blob], 'image', { type: 'image/jpeg' })
  //
  //     // Добавление file в FormData
  //     formData.append('file', file)
  //     console.log(formData, 'fileFormData')
  //   }

  // uploadImage(formData)
  //   .unwrap()
  //   .then(res => {
  //     const uploadedImages = res.images
  //     const filteredPhoto = filterBestQualityImages(uploadedImages)
  //
  //     console.log(filteredPhoto, 'filteredPhoto')
  //
  //     console.log('we  are in uploadImages then')
  //     localStorage.setItem('uploadedImages', JSON.stringify(filteredPhoto))
  //     cropContext.setIsOpenModal(false)
  //     cropContext.setIsOpen(false)
  //   })
  //   .catch(error => {
  //     console.log('we  are in uploadImages catch')
  //     toast.error(error.data.messages)
  //   })
  // goToStep(0)
  const handleSave = () => {
    localStorage.setItem('uploadedImages', JSON.stringify(cropContext.photos))
    cropContext.resetData()
    cropContext.setIsOpenModal(false)
    cropContext.setIsOpen(false)
    goToStep(0)
  }

  return (
    <>
      {/*{isLoading && <LinearLoader />}*/}
      <NewPostModal
        isOpen={cropContext.isOpenModal}
        title={t('Close')}
        setIsOpen={() => cropContext.setIsOpenModal(false)}
        right={
          <NextImage style={{ cursor: 'pointer' }} src={closeIcon} alt={''} onClick={handleClose} />
        }
      >
        <div className={style.modalWrapper}>
          <div className={style.textWrapper}>
            <p className={style.text}>{t('ClosePublication')}</p>
          </div>

          <div className={style.buttonsContainer}>
            <Button theme={ButtonTheme.CLEAR} className={style.button} onClick={handleDiscard}>
              {t('Discard')}
            </Button>
            <Button className={style.button} onClick={handleSave}>
              {t('SaveDraft')}
            </Button>
          </div>
        </div>
      </NewPostModal>
    </>
  )
}
