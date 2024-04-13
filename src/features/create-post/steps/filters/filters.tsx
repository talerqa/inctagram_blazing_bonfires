import React from 'react'

import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import { useWizard } from 'react-use-wizard'

import style from './filters.module.scss'

import { ImageFilter, NextStepLink, SlideBar } from '@/features/create-post/components'
import { filterNames } from '@/features/create-post/constants/canvas-filters'
import { CloseModal } from '@/features/create-post/steps/close-modal/close-modal'
import { NewPostModal } from '@/features/create-post/ui'
import { selectCurrentPhotoIndex } from '@/shared/api/services/posts/post.slice'
import { ArrowBack2 } from '@/shared/assets/icons/arrow-back-icon/arrow-back2'
import { useImageCropContext } from '@/shared/hooks/use-image-crop-context'

export const Filters = () => {
  const { nextStep, previousStep } = useWizard()
  const cropContext = useImageCropContext()
  const currentIndex = useSelector(selectCurrentPhotoIndex)
  const setFilter = cropContext.setFilter(currentIndex)
  const { t } = useTranslation('common', { keyPrefix: 'AddPost' })

  return (
    <>
      <NewPostModal
        isOpen={cropContext.isOpen}
        title={t('Filters')}
        setIsOpen={() => cropContext.setIsOpenModal(true)}
        left={<ArrowBack2 onClick={previousStep} />}
        right={<NextStepLink onClick={nextStep} title={'Next'} />}
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
              tabIndexFlag={false}
              preserveAspectRatio={'contain'}
            />
            {cropContext.photos.length > 1 && <SlideBar styles={style} />}
          </div>
          <div className={style.filters}>
            {filterNames.map((filter, index) => (
              <div
                key={index}
                className={style.filterItem}
                onClick={() => setFilter(filter.filter)}
                onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
                  if (event.key === 'Enter') {
                    setFilter(filter.filter)
                  }
                }}
              >
                <div className={style.filterImageContainer}>
                  <ImageFilter
                    className={style.filterImage}
                    image={cropContext.photos[currentIndex].croppedUrl}
                    filter={filter.filter}
                    onChange={() => {}}
                    preserveAspectRatio={'contain'}
                    tabIndexFlag={true}
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
