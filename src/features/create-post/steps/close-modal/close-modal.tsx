import React from 'react'

import NextImage from 'next/image'
import { useTranslation } from 'next-i18next'
import { useWizard } from 'react-use-wizard'

import style from './close-modal.module.scss'

import { CropContextType } from '@/features/create-post/context/crop-provider'
import { NewPostModal } from '@/features/create-post/ui/new-post-modal/new-post-modal'
import closeIcon from '@/shared/assets/icons/logout/close.svg'
import { Button, ButtonTheme } from '@/shared/ui'

type Props = {
  cropContext: CropContextType
}
export const CloseModal = ({ cropContext }: Props) => {
  const { t } = useTranslation('common', { keyPrefix: 'AddPost' })
  const { goToStep } = useWizard()
  const handleDiscard = () => {
    cropContext.resetData()
    cropContext.setIsOpenModal(false)
    cropContext.setIsOpen(false)
    localStorage.removeItem('uploadedImages')
    goToStep(0)
  }
  const handleClose = () => {
    cropContext.setIsOpenModal(false)
  }
  const handleSave = () => {
    localStorage.setItem('uploadedImages', JSON.stringify(cropContext.photos))
    cropContext.resetData()
    cropContext.setIsOpenModal(false)
    cropContext.setIsOpen(false)
    goToStep(0)
  }

  return (
    <>
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
