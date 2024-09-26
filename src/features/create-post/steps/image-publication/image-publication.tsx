import React from 'react'

import { useSelector } from 'react-redux'

import style from './image-publication.module.scss'

import { ImageFilter, SlideBar } from '@/features/create-post/components'
import { CropContextType } from '@/features/create-post/context/crop-provider'
import { selectCurrentPhotoIndex } from '@/shared/api/services/posts/post.slice'

type Props = {
  cropContext: CropContextType
}
export const ImagePublication = ({ cropContext }: Props) => {
  const currentIndex = useSelector(selectCurrentPhotoIndex)

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

      {cropContext.photos.length > 1 && <SlideBar styles={style} />}
    </>
  )
}
