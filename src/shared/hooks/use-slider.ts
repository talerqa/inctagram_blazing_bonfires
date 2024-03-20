import { useDispatch, useSelector } from 'react-redux'

import {
  selectCurrentPhotoIndex,
  setCurrentPhotoIndex,
} from '@/shared/api/services/posts/post.slice'
import { useImageCropContext } from '@/shared/hooks/use-image-crop-context'

export const useSlider = () => {
  const cropContext = useImageCropContext()
  const dispatch = useDispatch()
  const length = cropContext.photos.length
  const currentIndex = useSelector(selectCurrentPhotoIndex)
  const setCurrentIndex = (index: number) => dispatch(setCurrentPhotoIndex(index))

  const nextSlide = () => {
    if (currentIndex === length - 1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(length - 1)
    } else {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return {
    currentIndex,
    nextSlide,
    prevSlide,
    setCurrentIndex,
  }
}
