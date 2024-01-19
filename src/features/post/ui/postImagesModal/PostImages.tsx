import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import style from './PostImages.module.scss'

import { DotsBar } from '@/features/create-post/ui/dotsBar/DotsBar'
import { filterBestQualityImages } from '@/features/create-post/utils/filterBestQualityImages'
import { useSlider } from '@/features/create-post/utils/useSlider'
import { ImageDataType, PostResponseType } from '@/shared/api/services/posts/posts.api.types'
import next from '@/shared/assets/icons/filterPostPhoto/next.svg'
import prev from '@/shared/assets/icons/filterPostPhoto/prev.svg'
import { Button, ButtonTheme } from '@/shared/ui'

type Props = {
  postData: PostResponseType | undefined
}
export const PostImages = ({ postData }: Props) => {
  const [images, setImages] = useState<ImageDataType[]>([])
  const { currentIndex, prevSlide, nextSlide } = useSlider(images.length)

  useEffect(() => {
    if (postData?.images && postData.images.length > 0) {
      setImages(filterBestQualityImages(postData.images))
    }
  }, [postData])

  return (
    <div className={style.sliderWrapper}>
      {images.length && <Image src={images[currentIndex].url} alt={''} height={560} width={490} />}
      {images.length > 1 && (
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
            <DotsBar activeIndex={currentIndex} count={images.length} />
          </div>
        </>
      )}
    </div>
  )
}
