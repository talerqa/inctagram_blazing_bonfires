import Image from 'next/image'

import styles from '@/../css-modules'
import { DotsBar } from '@/features/create-post/ui/'
import next from '@/shared/assets/icons/filter-post-photo/next.svg'
import prev from '@/shared/assets/icons/filter-post-photo/prev.svg'
import { useSlider } from '@/shared/hooks/use-slider'
import { Button, ButtonTheme } from '@/shared/ui'
export const SlideBar = ({ styles }: { styles: styles }) => {
  const { nextSlide, prevSlide } = useSlider()

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
      <div className={styles.sliderDotsBarWrapper}>
        <DotsBar />
      </div>
    </>
  )
}
