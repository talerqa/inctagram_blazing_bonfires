import React, { useState } from 'react'

import Image from 'next/image'

import s from './carousel.module.scss'

export const Carousel = ({ images, isShowMoreActive }: any) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedCircleIndex, setSelectedCircleIndex] = useState(activeIndex)
  const [isFading, setIsFading] = useState(false)

  const nextSlide = () => {
    setIsFading(true)
    setActiveIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    setSelectedCircleIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    setTimeout(() => setIsFading(false), 100)
  }

  const prevSlide = () => {
    setIsFading(true)
    setActiveIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
    setSelectedCircleIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
    setTimeout(() => setIsFading(false), 100)
  }

  const handleCircleClick = (index: number) => {
    setSelectedCircleIndex(index)
  }

  const imagesUrls = images.map((image: any) => image.url)

  return (
    <div className={s.carousel}>
      {imagesUrls.length > 1 && (
        <button onClick={prevSlide} className={s.carouselBtnPrev}>
          ‹
        </button>
      )}

      <div className={s.carousel__container}>
        <Image
          src={imagesUrls[activeIndex]}
          width={234}
          height={isShowMoreActive ? 110 : 240}
          alt={`Slide ${activeIndex}`}
          className={isFading ? s.carousel__img_fading : s.carousel__img}
        />

        {images.length > 1 && (
          <div className={s.carousel__circles}>
            {images.map((_: any, index: number) => (
              <div
                key={index}
                className={
                  selectedCircleIndex === index
                    ? s.carousel__circle + ' ' + s.carousel__circle_selected
                    : s.carousel__circle
                }
                onClick={() => handleCircleClick(index)}
              />
            ))}
          </div>
        )}
      </div>

      {imagesUrls.length > 1 && (
        <button onClick={nextSlide} className={s.carouselBtnNext}>
          ›
        </button>
      )}
    </div>
  )
}
