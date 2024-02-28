import { useState } from 'react'

export const useSlider = (length: number) => {
  const [currentIndex, setCurrentIndex] = useState(0)

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
