import React, { useRef } from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import AvatarEditor from 'react-avatar-editor'
import { useWizard } from 'react-use-wizard'

import style from './cropping.module.scss'

import { ButtonFilterPanel, NextStepLink } from '@/features/create-post/components'
import { CloseModal } from '@/features/create-post/steps/close-modal/close-modal'
import { DotsBar, NewPostModal } from '@/features/create-post/ui'
import { calculateImageDimensions, useSlider } from '@/features/create-post/utils'
import { ArrowBack2 } from '@/shared/assets/icons/arrow-back-icon/arrow-back2'
import next from '@/shared/assets/icons/filter-post-photo/next.svg'
import prev from '@/shared/assets/icons/filter-post-photo/prev.svg'
import { useImageCropContext } from '@/shared/hooks/use-image-crop-context'
import { Button, ButtonTheme } from '@/shared/ui'

export const Cropping = () => {
  const cropContext = useImageCropContext()

  const { currentIndex, prevSlide, nextSlide, setCurrentIndex } = useSlider(
    cropContext.photos.length
  )
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
            {cropContext.photos.length > 1 && (
              <>
                <div className={style.sliderButtonsContainer}>
                  <Button
                    theme={ButtonTheme.CLEAR}
                    className={style.sliderButton}
                    onClick={prevSlide}
                  >
                    <Image src={prev} alt={'prev'} />
                  </Button>
                  <Button
                    theme={ButtonTheme.CLEAR}
                    className={style.sliderButton}
                    onClick={nextSlide}
                  >
                    <Image src={next} alt={'next'} />
                  </Button>
                </div>
                <div className={style.sliderDotsBarWrapper}>
                  <DotsBar activeIndex={index} count={cropContext.photos.length} />
                </div>
              </>
            )}
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
