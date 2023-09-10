import React, { ChangeEvent, FC, useState } from 'react'

import NextImage from 'next/image'

import style from '../profilePostModal/PostModal.module.scss'

import { ImageCropper, ModalComponent } from '@/features/profile-setting'
import { useImageCropContext } from '@/features/profile-setting/ui/profilePostModal/cropper/CropProvider'
import { readFile } from '@/features/profile-setting/ui/profilePostModal/cropper/GetCroppedImage'
import { SwiperSlider } from '@/features/profile-setting/ui/profilePostModal/slider/SwiperSlider'
import notPhotoImg from '@/shared/assets/icons/avatarProfile/notPhoto.png'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'

type Props = {
  closeWindow: () => void
}

export const PostModal: FC<Props> = ({ closeWindow }) => {
  const [isCropping, setIsCropping] = useState(false)
  const [showButtons, setShowButtons] = useState(false)

  const { setImage, setOriginalAspectRatio, photos, thumbsSwiper, setPhotos } =
    useImageCropContext()

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    const file = files && files[0]

    if (file) {
      const image: HTMLImageElement = new Image()

      const imageDataUrl = await readFile(file)

      image.src = imageDataUrl

      image.onload = () => {
        const aspectRatio = image.width / image.height

        setOriginalAspectRatio(aspectRatio)
        setImage(imageDataUrl)
        setIsCropping(true)
        setShowButtons(true)
        setPhotos([{ url: imageDataUrl }, ...photos])
      }
    }
  }

  const openSelectHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    document.getElementById('inputPhotoPost')?.click()
  }

  const openDraftHandler = () => {}

  return (
    <ModalComponent
      title={isCropping ? 'Cropping' : 'Add photo'}
      callBackCloseWindow={closeWindow}
      showButtons={!showButtons}
    >
      <>
        {photos.length > 1 && (
          <div className={style.sliderWrapper}>
            <SwiperSlider photos={photos} thumbsSwiper={thumbsSwiper} />
          </div>
        )}
        {isCropping && (
          <div className={style.crop}>
            <ImageCropper objectFit={'cover'} />
          </div>
        )}
        {!isCropping && (
          <div className={style.contentWrapper}>
            <div className={style.emptyContainer}>
              <NextImage src={notPhotoImg} alt={''} />
            </div>
            <input
              type={'file'}
              onChange={handleFileChange}
              id={'inputPhotoPost'}
              className={style.inputPhoto}
            />
            <Button
              onClick={openSelectHandler}
              size={ButtonSize.LARGE}
              className={style.buttonSelect}
            >
              Select from Computer
            </Button>
            <Button
              onClick={openDraftHandler}
              theme={ButtonTheme.CLEAR}
              size={ButtonSize.LARGE}
              className={style.buttonSelect}
            >
              Open Draft
            </Button>
          </div>
        )}
      </>
    </ModalComponent>
  )
}
