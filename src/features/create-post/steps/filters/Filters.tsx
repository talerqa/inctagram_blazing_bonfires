import React from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useWizard } from 'react-use-wizard'

import style from './Filters.module.scss'

import ImageFilter from '@/features/create-post/components/imageFilter/ImageFilter'
import { filterNames } from '@/features/create-post/constants/canvasFilters'
import { useImageCropContext } from '@/features/create-post/context/CropProvider'
import { CloseModal } from '@/features/create-post/steps/closeModal/CloseModal'
import { DotsBar } from '@/features/create-post/ui/dotsBar/DotsBar'
import NewPostModal from '@/features/create-post/ui/newPostModal/NewPostModal'
import { useSlider } from '@/features/create-post/utils/useSlider'
import backIcon from '@/shared/assets/icons/arrow back/back.svg'
import next from '@/shared/assets/icons/filterPostPhoto/next.svg'
import prev from '@/shared/assets/icons/filterPostPhoto/prev.svg'
import { Button, ButtonTheme } from '@/shared/ui/button/Button'

export const Filters = () => {
  const { nextStep, previousStep } = useWizard()
  const cropContext = useImageCropContext()
  const { currentIndex, prevSlide, nextSlide } = useSlider(cropContext.photos.length)
  const setFilter = cropContext.setFilter(currentIndex)
  const { t } = useTranslation('common', { keyPrefix: 'AddPost' })

  return (
    <>
      <NewPostModal
        isOpen={cropContext.isOpen}
        title={t('Filters')}
        setIsOpen={() => cropContext.setIsOpenModal(true)}
        left={
          <Image style={{ cursor: 'pointer' }} src={backIcon} alt={''} onClick={previousStep} />
        }
        right={
          <span style={{ cursor: 'pointer' }} onClick={nextStep}>
            {t('Next')}
          </span>
        }
      >
        <div className={style.filtersModalContent}>
          <div className={style.sliderWrapper}>
            <ImageFilter
              className={style.sliderImage}
              image={cropContext.photos[currentIndex].croppedUrl}
              filter={cropContext.photos[currentIndex].filter}
              onChange={(filteredImg: string) => {
                cropContext.setFilteredUrl(filteredImg, currentIndex)
              }}
              preserveAspectRatio={'contain'}
            />
            {cropContext.photos.length > 1 && (
              <>
                <div className={style.sliderButtonsContainer}>
                  <Button
                    theme={ButtonTheme.CLEAR}
                    className={style.sliderButton}
                    onClick={prevSlide}
                  >
                    <Image src={prev} alt={''} />
                  </Button>
                  <Button
                    theme={ButtonTheme.CLEAR}
                    className={style.sliderButton}
                    onClick={nextSlide}
                  >
                    <Image src={next} alt={''} />
                  </Button>
                </div>
                <div className={style.sliderDotsBarWrapper}>
                  <DotsBar activeIndex={currentIndex} count={cropContext.photos.length} />
                </div>
              </>
            )}
          </div>
          <div className={style.filters}>
            {filterNames.map((filter, index) => (
              <div
                key={index}
                className={style.filterItem}
                onClick={() => setFilter(filter.filter)}
              >
                <div className={style.filterImageContainer}>
                  <ImageFilter
                    className={style.filterImage}
                    image={cropContext.photos[currentIndex].croppedUrl}
                    filter={filter.filter}
                    onChange={() => {}}
                    preserveAspectRatio={'contain'}
                  />
                </div>
                <div className={style.filterLabel}>{t(`FiltersList.${filter.name}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </NewPostModal>
      {cropContext.isOpenModal && <CloseModal cropContext={cropContext} />}
    </>
  )
}
