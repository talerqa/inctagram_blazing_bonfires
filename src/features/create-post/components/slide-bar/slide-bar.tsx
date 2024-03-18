import React, { MouseEventHandler } from 'react'

import Image from 'next/image'

import styles from '@/../css-modules'
import next from '@/shared/assets/icons/filter-post-photo/next.svg'
import prev from '@/shared/assets/icons/filter-post-photo/prev.svg'
import { Button, ButtonTheme } from '@/shared/ui'
type props = {
  prevSlide: MouseEventHandler<HTMLButtonElement>
  nextSlide: MouseEventHandler<HTMLButtonElement>
  styles: styles
}
export const SlideBar = ({ prevSlide, nextSlide, styles }: props) => {
  return (
    <>
      <div className={styles.sliderButtonsContainer}>
        <Button theme={ButtonTheme.CLEAR} className={styles.sliderButton} onClick={prevSlide}>
          <Image src={prev} alt={'prev'} />
        </Button>
        <Button theme={ButtonTheme.CLEAR} className={styles.sliderButton} onClick={nextSlide}>
          <Image src={next} alt={'next'} />
        </Button>
      </div>
    </>
  )
}
