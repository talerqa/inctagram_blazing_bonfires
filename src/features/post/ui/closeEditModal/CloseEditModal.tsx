import React from 'react'

import NextImage from 'next/image'
import { useTranslation } from 'next-i18next'

import NewPostModal from '@/features/create-post/ui/newPostModal/NewPostModal'
import styles from '@/features/post/ui/editDeletePost/EditDeletePost.module.scss'
import closeIcon from '@/shared/assets/icons/icons/closeIcon.svg'
import { Button, ButtonTheme } from '@/shared/ui'

type Props = {
  closeEditModal: boolean
  setCloseEditModal: (closeEditModal: boolean) => void
  setIsOpenEdit: (isOpenEdit: boolean) => void
}
export const CloseEditModal = ({ closeEditModal, setCloseEditModal, setIsOpenEdit }: Props) => {
  const { t } = useTranslation('common', { keyPrefix: 'Post' })

  return (
    <NewPostModal
      isOpen={closeEditModal}
      setIsOpen={() => setCloseEditModal(false)}
      title={t('ClosePost')}
      right={
        <NextImage
          style={{ cursor: 'pointer' }}
          src={closeIcon}
          alt={''}
          onClick={() => setCloseEditModal(false)}
        />
      }
    >
      <div className={styles.modalWrapper}>
        <div className={styles.textWrapper}>
          <p className={styles.text}>{t('CloseEditPost')}</p>
        </div>

        <div className={styles.buttonsContainer}>
          <Button
            theme={ButtonTheme.CLEAR}
            className={styles.button}
            onClick={() => setIsOpenEdit(false)}
          >
            {t('Yes')}
          </Button>
          <Button className={styles.button} onClick={() => setCloseEditModal(false)}>
            {t('No')}
          </Button>
        </div>
      </div>
    </NewPostModal>
  )
}
