/* eslint-disable no-console */
import React, { ChangeEvent, useRef, useState } from 'react'

import Slider from '@mui/material/Slider'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import AvatarEditor from 'react-avatar-editor'

import styles from './PhotoModal.module.scss'

import notPhotoImg from '@/shared/assets/icons/avatarProfile/notPhoto.png'
import { resizerImage } from '@/shared/libs/resizerImage/resizerImage'
import { Modal, Button, ButtonSize } from '@/shared/ui'

type Props = {
  closeWindow: () => void
  savePhoto: (photo: null | Blob | MediaSource) => void
}

export const PhotoModal = ({ closeWindow, savePhoto }: Props) => {
  const { t } = useTranslation()
  const [photoProfile, setPhotoProfile] = useState<null | Blob | MediaSource>(null)
  const [uploadError, setUploadError] = useState('')
  const cropRef = useRef<null | any>(null)
  const [slideValue, setSlideValue] = useState(10)

  const selectedPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const maxSizeForBack = 10 * 1024 * 1024
    const allowedFormats = ['image/jpeg', 'image/png']

    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (!allowedFormats.includes(file.type)) {
        e.preventDefault()
        setUploadError('Invalid file format! Please choose a JPEG or PNG image.')

        return
      }

      if (file.size > maxSizeForBack) {
        e.preventDefault()
        setUploadError('File is too big! Choose another photo less than 10Mb')

        return
      } else {
        setPhotoProfile(file)
      }
    }
  }

  const openSelectHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    document.getElementById('inputPhotoProfile')?.click()
  }

  const savePhotoHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    try {
      if (cropRef) {
        const dataUrl = cropRef.current.getImage().toDataURL()
        const result = await fetch(dataUrl)
        const blob = await result.blob()
        const file = new File([blob], 'image')
        const image = await resizerImage(file)

        setPhotoProfile(image as File)
        savePhoto(image as File)
      } else {
        savePhoto(photoProfile)
      }
    } catch (err) {
      console.log(err)
    }
    closeWindow()
  }

  return (
    <div>
      <Modal
        title={t('AddProfilePhoto')}
        callBackCloseWindow={closeWindow}
        styles={{ width: '492px', height: '564px' }}
        isShowButton={false}
      >
        <div className={styles.contentWrapper}>
          {!photoProfile && (
            <>
              <div className={styles.emptyContainer}>
                <Image src={notPhotoImg} alt={''} />
              </div>
              <input
                type={'file'}
                accept="image/*,.png,.jpg"
                onChange={selectedPhotoHandler}
                id={'inputPhotoProfile'}
                className={styles.inputPhoto}
              />
              <p className={styles.error}>{uploadError}</p>
              <Button onClick={openSelectHandler} className={styles.buttonSelect}>
                {t('SelectFromComputer')}
              </Button>
            </>
          )}
          {photoProfile && (
            <>
              <AvatarEditor
                ref={cropRef}
                image={URL.createObjectURL(photoProfile)}
                width={316}
                height={316}
                border={8}
                borderRadius={150}
                color={[0, 0, 0, 0.72]}
                scale={slideValue / 10}
                rotate={0}
              />
              <Slider
                min={5}
                max={50}
                sx={{
                  margin: '0.5rem auto',
                  width: '80%',
                  color: '#2f68cc',
                }}
                size="small"
                defaultValue={slideValue}
                value={slideValue}
                onChange={(e: Event, value: number | number[]) => setSlideValue(value as number)}
              />

              <Button
                size={ButtonSize.SMALL}
                className={styles.buttonSave}
                onClick={savePhotoHandler}
              >
                {t('Save')}
              </Button>
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}
