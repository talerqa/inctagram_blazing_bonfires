import Image from 'next/image'
import { useSelector } from 'react-redux'

import styles from '@/../css-modules'
import { DotsBar } from '@/features/create-post/ui/'
import { selectPhotosCount } from '@/shared/api/services/posts/post.slice'
import next from '@/shared/assets/icons/filter-post-photo/next.svg'
import prev from '@/shared/assets/icons/filter-post-photo/prev.svg'
import { useSlider } from '@/shared/hooks/use-slider'
import { Button, ButtonTheme } from '@/shared/ui'
export const SlideBar = ({ styles }: { styles: styles }) => {
  const { currentIndex, nextSlide, prevSlide } = useSlider()
  const photosCount = useSelector(selectPhotosCount)

  return (
    <>
      <div className={styles.sliderButtonsContainer}>
        {currentIndex > 0 ? (
          <Button theme={ButtonTheme.CLEAR} className={styles.sliderButton} onClick={prevSlide}>
            <Image src={prev} alt={'prev'} />
          </Button>
        ) : (
          <div></div>
        )}
        {currentIndex < photosCount - 1 && (
          <Button theme={ButtonTheme.CLEAR} className={styles.sliderButton} onClick={nextSlide}>
            <Image src={next} alt={'next'} />
          </Button>
        )}
      </div>
      <div className={styles.sliderDotsBarWrapper}>
        <DotsBar />
      </div>
    </>
  )
}
