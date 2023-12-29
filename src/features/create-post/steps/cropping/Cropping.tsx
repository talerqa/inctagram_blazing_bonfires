import React, { useRef } from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import AvatarEditor from 'react-avatar-editor'
import { useWizard } from 'react-use-wizard'

import { useSlider } from './../../utils/useSlider'
import style from './Cropping.module.scss'

import { ButtonFilterPanel } from '@/features/create-post/components/buttonFilterPanel/ButtonFilterPanel'
import { useImageCropContext } from '@/features/create-post/context/CropProvider'
import { DotsBar } from '@/features/create-post/ui/dotsBar/DotsBar'
import NewPostModal from '@/features/create-post/ui/newPostModal/NewPostModal'
import { calculateImageDimensions } from '@/features/create-post/utils/calculateImageDimensions'
import backIcon from '@/shared/assets/icons/arrow back/back.svg'
import next from '@/shared/assets/icons/filterPostPhoto/next.svg'
import prev from '@/shared/assets/icons/filterPostPhoto/prev.svg'
import { Button, ButtonTheme } from '@/shared/ui/button/Button'

export const Cropping = () => {
  const cropContext = useImageCropContext()
  const { currentIndex, prevSlide, nextSlide, setCurrentIndex } = useSlider(
    cropContext.photos.length
  )
  const index = currentIndex

  const { nextStep, previousStep } = useWizard()
  const { t } = useTranslation('common', { keyPrefix: 'AddPost' })
  const positionChange = (position: { x: number; y: number }) => {
    cropContext.setPosition(index)(position)
  }

  const editor = useRef(null)

  const handleSave = () => {
    if (editor.current) {
      const canvas = editor.current as any
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
    <NewPostModal
      isOpen={cropContext.isOpen}
      setIsOpen={cropContext.setIsOpen}
      left={<Image style={{ cursor: 'pointer' }} src={backIcon} alt={''} onClick={previousStep} />}
      title={t('Cropping')}
      right={
        <span style={{ cursor: 'pointer' }} onClick={nextStepHandler}>
          {t('Next')}
        </span>
      }
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
            position={cropContext.photos[index].position} // Позиция
            onPositionChange={positionChange}
          />
          {cropContext.photos.length > 1 && (
            <>
              <div className={style.sliderButtonsContainer}>
                <Button
                  theme={ButtonTheme.CLEAR}
                  className={style.sliderButton}
                  onClick={prevSlide}
                >
                  <Image src={prev} alt={''} />
                </Button>
                <Button
                  theme={ButtonTheme.CLEAR}
                  className={style.sliderButton}
                  onClick={nextSlide}
                >
                  <Image src={next} alt={''} />
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
  )
}
