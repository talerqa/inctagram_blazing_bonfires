import React from 'react'

import Image from 'next/image'

import style from './SavedImage.module.scss'

import { DotsBar } from '@/features/create-post/ui/dotsBar/DotsBar'
import { useSlider } from '@/features/create-post/utils/useSlider'
import { ImageDataType } from '@/shared/api/services/posts/posts.api.types'
import next from '@/shared/assets/icons/filterPostPhoto/next.svg'
import prev from '@/shared/assets/icons/filterPostPhoto/prev.svg'
import { Button, ButtonTheme } from '@/shared/ui'

type Prop = {
  savedImages: ImageDataType[]
}
export const SavedImage = ({ savedImages }: Prop) => {
  const { currentIndex, prevSlide, nextSlide } = useSlider(savedImages.length)

  return (
    <>
      <img
        src={savedImages[currentIndex].url}
        alt={`uploadedImage`}
        className={style.sliderImage}
      />
      {savedImages.length > 1 && (
        <>
          <div className={style.sliderButtonsContainer}>
            <Button theme={ButtonTheme.CLEAR} className={style.sliderButton} onClick={prevSlide}>
              <Image src={prev} alt={''} />
            </Button>
            <Button theme={ButtonTheme.CLEAR} className={style.sliderButton} onClick={nextSlide}>
              <Image src={next} alt={''} />
            </Button>
          </div>
          <div className={style.sliderDotsBarWrapper}>
            <DotsBar activeIndex={currentIndex} count={savedImages.length} />
          </div>
        </>
      )}
    </>
  )
}
