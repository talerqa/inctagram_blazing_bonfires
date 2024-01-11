import React from 'react'

import Image from 'next/image'

import style from './ImagePublication.module.scss'

import ImageFilter from '@/features/create-post/components/imageFilter/ImageFilter'
import { CropContextType } from '@/features/create-post/context/CropProvider'
import { DotsBar } from '@/features/create-post/ui/dotsBar/DotsBar'
import { useSlider } from '@/features/create-post/utils/useSlider'
import next from '@/shared/assets/icons/filterPostPhoto/next.svg'
import prev from '@/shared/assets/icons/filterPostPhoto/prev.svg'
import { Button, ButtonTheme } from '@/shared/ui'

type Props = {
  cropContext: CropContextType
}
export const ImagePublication = ({ cropContext }: Props) => {
  const { currentIndex, prevSlide, nextSlide } = useSlider(cropContext.photos.length)

  return (
    <>
      <ImageFilter
        className={style.sliderImage}
        image={cropContext.photos[currentIndex].croppedUrl}
        filter={cropContext.photos[currentIndex].filter}
        onChange={(filteredImg: string) => {
          cropContext.setFilteredUrl(filteredImg, currentIndex)
        }}
        preserveAspectRatio={'contain'}
      />

      {cropContext.photos.length > 1 && (
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
            <DotsBar activeIndex={currentIndex} count={cropContext.photos.length} />
          </div>
        </>
      )}
    </>
  )
}
