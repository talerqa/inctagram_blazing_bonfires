import React, { ChangeEvent, useRef } from 'react'

import { Popover } from '@headlessui/react'
import Image from 'next/image'
import { toast, Toaster } from 'react-hot-toast'

import style from './AddPhotoSlider.module.scss'

import { CropContextType } from '@/features/create-post/context/CropProvider'
import addPhoto from '@/shared/assets/icons/addPhoto/addPhoto.svg'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { Button, ButtonTheme } from '@/shared/ui'

type Props = {
  cropContext: CropContextType
  setCurrentIndex: (index: number) => void
}

export const AddPhotoSlider = ({ cropContext, setCurrentIndex }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

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

  const openSelectHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    inputRef.current?.click()
  }
  const handleDeleteClick = (index: number) => {
    cropContext.deletePhoto(index)
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
                  alt=""
                  width={50}
                  height={50}
                  objectFit="cover"
                  className={style.thumbnailImage}
                  onClick={() => setCurrentIndex(index)}
                />
                <button className={style.deleteButton} onClick={() => handleDeleteClick(index)}>
                  x
                </button>
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
              <Button
                onClick={openSelectHandler}
                className={style.button}
                disabled={isButtonDisabled}
              >
                <Image src={addPhoto} alt={''} width={20} height={20} />
              </Button>
            </div>
          </div>
        </Popover.Panel>
        <Popover.Button as="div">
          <Button theme={ButtonTheme.CLEAR} className={style.sizeButton}>
            <Image
              src={noImage}
              alt=""
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                flexDirection: 'column',
              }}
            />
          </Button>
        </Popover.Button>
      </Popover>
    </>
  )
}
