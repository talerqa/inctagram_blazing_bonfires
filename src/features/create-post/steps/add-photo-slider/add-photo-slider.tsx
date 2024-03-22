import React, { ChangeEvent, useRef } from 'react'

import { Popover } from '@headlessui/react'
import Image from 'next/image'
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import style from './add-photo-slider.module.scss'

import { CropContextType } from '@/features/create-post/context/crop-provider'
import {
  setPhotosCount,
  selectCurrentPhotoIndex,
  setCurrentPhotoIndex,
} from '@/shared/api/services/posts/post.slice'
import CloseIcon from '@/shared/assets/icons/close-icon/close-icon'
import ImageIcon from '@/shared/assets/icons/image/image-icon'
import ImageIconOpen from '@/shared/assets/icons/image/image-icon-open'
import PlusCircle from '@/shared/assets/icons/plus-circle/plus-circle'
import { Button, ButtonTheme } from '@/shared/ui'

type Props = {
  cropContext: CropContextType
}

export const AddPhotoSlider = ({ cropContext }: Props) => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const photosLength = cropContext.photos.length
  const currentIndex = useSelector(selectCurrentPhotoIndex)
  const handlerAddImageClick = async (event: ChangeEvent<HTMLInputElement>) => {
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

    cropContext.setNewPhotoList(files)
  }

  const openSelectHandler = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault()
    inputRef.current?.click()
  }
  const changeCurrentPhotoIndex = (index: number) => dispatch(setCurrentPhotoIndex(index))
  const handleDeleteClick = (index: number) => {
    if (photosLength > 1) {
      cropContext.deletePhoto(index)
      dispatch(setPhotosCount(photosLength - 1))
      if ((index === currentIndex && index > 0) || index < currentIndex) {
        changeCurrentPhotoIndex(currentIndex - 1)
      }
    } else {
      cropContext.setIsOpenModal(true)
    }
  }
  const isButtonDisabled = cropContext.photos.length >= 10

  return (
    <>
      <Toaster position={'bottom-center'} />
      <Popover>
        <Popover.Panel className={style.buttonPanel}>
          <div className={style.thumbnailContainer}>
            {cropContext.photos.map((photo, index) => (
              <div key={index} className={style.buttonImageWrapper}>
                <Image
                  src={photo.url}
                  alt="img"
                  height={82}
                  width={82 * photo.originalAspect}
                  objectFit="cover"
                  className={style.thumbnailImage}
                  onClick={() => changeCurrentPhotoIndex(index)}
                />
                <CloseIcon
                  className={style.deleteButton}
                  onClick={() => handleDeleteClick(index)}
                />
              </div>
            ))}
            <div className={style.buttonsContainer}>
              <input
                type={'file'}
                accept={'image/*'}
                multiple={true}
                onChange={handlerAddImageClick}
                ref={inputRef}
                className={style.inputPhoto}
              />
              {isButtonDisabled || (
                <PlusCircle onClick={openSelectHandler} className={style.button} />
              )}
            </div>
          </div>
        </Popover.Panel>
        <Popover.Button as="div" className={style.popoverBtn}>
          <Button theme={ButtonTheme.CLEAR} className={style.sizeButton}>
            <ImageIconOpen className={style.imageIconOpen} />
            <ImageIcon className={style.imageIcon} />
          </Button>
        </Popover.Button>
      </Popover>
    </>
  )
}
