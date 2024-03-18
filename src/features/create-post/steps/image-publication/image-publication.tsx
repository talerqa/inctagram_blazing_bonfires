import React from 'react'

import style from './image-publication.module.scss'

import { ImageFilter, SlideBar } from '@/features/create-post/components'
import { CropContextType } from '@/features/create-post/context/crop-provider'
import { useSlider } from '@/features/create-post/utils'

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
        tabIndexFlag={false}
      />

      {cropContext.photos.length > 1 && (
        <SlideBar nextSlide={nextSlide} prevSlide={prevSlide} styles={style} />
      )}
    </>
  )
}
