import React, { useRef } from 'react'

import { useTranslation } from 'next-i18next'
import AvatarEditor from 'react-avatar-editor'
import { useWizard } from 'react-use-wizard'

import style from './cropping.module.scss'

import { ButtonFilterPanel, NextStepLink, SlideBar } from '@/features/create-post/components'
import { CloseModal } from '@/features/create-post/steps/close-modal/close-modal'
import { NewPostModal } from '@/features/create-post/ui'
import { calculateImageDimensions, useSlider } from '@/features/create-post/utils'
import { ArrowBack2 } from '@/shared/assets/icons/arrow-back-icon/arrow-back2'
import { useImageCropContext } from '@/shared/hooks/use-image-crop-context'

export const Cropping = () => {
  const cropContext = useImageCropContext()

  const { currentIndex, setCurrentIndex } = useSlider()
  const index = currentIndex

  const { nextStep, previousStep } = useWizard()
  const { t } = useTranslation('common', { keyPrefix: 'AddPost' })

  const editor = useRef<AvatarEditor>(null)

  const handleSave = () => {
    if (editor.current) {
      const canvas = editor.current
      const croppedImage = canvas.getImageScaledToCanvas().toDataURL()

      cropContext.setCroppedUrl(croppedImage, index)
    }
  }

  const nextStepHandler = () => {
    handleSave()
    void nextStep()
  }

  // ширина и высота контейнера редактора в пикселях
  // значения такие же как в style.editorContainer
  const editorContainerWidth = 500
  const editorContainerHeight = 500

  const { width, height } = calculateImageDimensions(
    cropContext.photos[index].currentAspect,
    editorContainerWidth,
    editorContainerHeight
  )

  return (
    <>
      <NewPostModal
        isOpen={cropContext.isOpen}
        setIsOpen={() => cropContext.setIsOpenModal(true)}
        left={<ArrowBack2 onClick={previousStep} />}
        title={t('Cropping')}
        right={<NextStepLink onClick={nextStepHandler} title={'Next'} />}
      >
        <div className={style.editorContainer}>
          <div className={style.sliderWrapper}>
            <AvatarEditor
              className={style.imageFullWidth}
              ref={editor}
              width={width}
              height={height}
              border={0}
              image={cropContext.photos[index].url} // Ссылка на изображение
              scale={cropContext.photos[index].zoom} // Масштаб
            />
            {cropContext.photos.length > 1 && <SlideBar styles={style} />}
          </div>
          <ButtonFilterPanel
            setCurrentIndex={setCurrentIndex}
            index={index}
            cropContext={cropContext}
          />
        </div>
      </NewPostModal>
      {cropContext.isOpenModal && <CloseModal cropContext={cropContext} />}
    </>
  )
}
