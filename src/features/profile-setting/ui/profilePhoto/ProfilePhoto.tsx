import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import styles from './ProfilePhoto.module.scss'

import { PhotoModal } from '@/features/profile-setting/ui/photoModal/PhotoModal'
import { AvatarsType } from '@/shared/api/services/profile/profile.api.types'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { ShortLangs } from '@/shared/types/langSwitcherTypes'
import { RemoveAvatarButton, Modal, Button, ButtonSize, ButtonTheme } from '@/shared/ui'

type Props = {
  outsideOnChange: (photo: Blob) => void
  value: AvatarsType
  deleteAvatar: (data: boolean) => void
}

export const ProfilePhoto = ({ outsideOnChange, value, deleteAvatar }: Props) => {
  const {
    t,
    i18n: { t: tRoot, language },
  } = useTranslation('common', { keyPrefix: 'ProfileSettings' })
  const isPhotoFromServer = value?.length > 0
  const photoDefaultSRC = isPhotoFromServer ? (value[0].url as string) : noImage

  const [open, setOpen] = useState(false)
  const [photoSRC, setPhotoSRC] = useState<string>(photoDefaultSRC)
  const [isDeleteBtn, setIsDeleteBtn] = useState<boolean>(isPhotoFromServer)
  const [isModal, setIsModal] = useState(false)

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setOpen(true)
  }

  const savePhoto = (photo: Blob | MediaSource | null) => {
    setPhotoSRC(URL.createObjectURL(photo as Blob))
    deleteAvatar(false)
    setIsDeleteBtn(true)
    photo && outsideOnChange(photo as Blob)
  }

  const deletePhoto = () => {
    setPhotoSRC(noImage)
    deleteAvatar(true)
    setIsDeleteBtn(false)
  }

  return (
    <div className={styles.container}>
      {isDeleteBtn && (
        <div className={styles.delPhotoBtn}>
          <RemoveAvatarButton
            onClick={() => {
              setIsModal(true)
            }}
          />
        </div>
      )}
      <div className={styles.photoContainer}>
        <Image
          src={photoSRC}
          width={photoSRC === noImage ? 48 : 192}
          height={photoSRC === noImage ? 48 : 192}
          alt="avatar"
          property="true"
        />
      </div>
      <Button
        size={ButtonSize.STRETCHED}
        theme={ButtonTheme.CLEAR}
        className={styles.addPhotoBtn}
        style={language === ShortLangs.RU ? { fontSize: '15px' } : undefined}
        onClick={openModal}
      >
        {t('AddProfilePhoto')}
      </Button>

      {open && <PhotoModal savePhoto={savePhoto} closeWindow={() => setOpen(false)} />}

      {isModal && (
        <Modal
          title={tRoot('Notification')}
          callBackCloseWindow={() => {
            setIsModal(false)
          }}
          extraButtonCB={() => {
            deletePhoto()
            setIsModal(false)
          }}
          mainButtonCB={() => {
            setIsModal(false)
          }}
          extraButton={tRoot('Yes')}
          mainButton={tRoot('No')}
        >
          {t('ReallyDeletePhoto')}
        </Modal>
      )}
    </div>
  )
}
