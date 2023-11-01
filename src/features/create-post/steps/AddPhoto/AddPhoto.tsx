import React, { ChangeEvent } from 'react'

import NextImage from 'next/image'
import { useWizard } from 'react-use-wizard'

import styles from './AddPhoto.module.scss'

import { useImageCropContext } from '@/features/create-post/context/CropProvider'
import NewPostModal from '@/features/create-post/ui/NewPostModal/NewPostModal'
import mockupPhoto from '@/shared/assets/icons/avatarProfile/notPhoto.png'
import closeIcon from '@/shared/assets/icons/logout/close.svg'
import { Button } from '@/shared/ui/button/Button'

export const AddPhoto = () => {
  const { nextStep } = useWizard()
  const { setPhotoList, isOpen, setIsOpen } = useImageCropContext()

  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (!files) return
    setPhotoList(files)
    await nextStep()
  }

  const openSelectHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    inputRef.current?.click()
  }

  return (
    <NewPostModal
      isOpen={isOpen}
      title={'Add photo'}
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
            Select from Computer
          </Button>
          <Button onClick={nextStep} className={styles.button}>
            Open Draft
          </Button>
        </div>
      </div>
    </NewPostModal>
  )
}
