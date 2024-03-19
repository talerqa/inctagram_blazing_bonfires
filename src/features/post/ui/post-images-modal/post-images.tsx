import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { useSelector } from 'react-redux'

import style from './post-images.module.scss'

import { SlideBar } from '@/features/create-post/components'
import { filterBestQualityImages } from '@/features/create-post/utils/filter-best-quality-images'
import { selectCurrentPhotoIndex } from '@/shared/api/services/posts/post.slice'
import { ImageDataType, PostResponseType } from '@/shared/api/services/posts/posts.api.types'

type Props = {
  postData: PostResponseType | undefined
}
export const PostImages = ({ postData }: Props) => {
  const [images, setImages] = useState<ImageDataType[]>([])
  const currentIndex = useSelector(selectCurrentPhotoIndex)

  useEffect(() => {
    if (postData?.images && postData.images.length > 0) {
      setImages(filterBestQualityImages(postData.images))
    }
  }, [postData])

  return (
    <div className={style.sliderWrapper}>
      {images.length && <Image src={images[currentIndex].url} alt={''} height={560} width={490} />}
      {images.length > 1 && <SlideBar styles={style} />}
    </div>
  )
}
