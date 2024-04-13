import { useDispatch, useSelector } from 'react-redux'

import {
  selectCurrentPhotoIndex,
  selectPhotosCount,
  setCurrentPhotoIndex,
} from '@/shared/api/services/posts/post.slice'

export const useSlider = () => {
  const dispatch = useDispatch()
  const length = useSelector(selectPhotosCount)
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
