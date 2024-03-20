import React from 'react'

import style from './button-filter-panel.module.scss'

import AspectRatioPanel from '@/features/create-post/components/aspect-ratio-panel/aspect-ratio-panel'
import ZoomPanel from '@/features/create-post/components/zoom-panel/zoom-panel'
import { CropContextType } from '@/features/create-post/context/crop-provider'
import { AddPhotoSlider } from '@/features/create-post/steps/add-photo-slider/add-photo-slider'

type Props = {
  cropContext: CropContextType
  index: number
}

export const ButtonFilterPanel = ({ cropContext, index }: Props) => {
  const handleAspectRatio = (aspectRatio: number) => {
    cropContext.handleAspectRatioClick(index)(aspectRatio)
  }

  const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const zoom = Number(event.target.value)

    cropContext.setZoom(index)(zoom)
  }

  return (
    <div className={style.filterPanelContainer}>
      <div className={style.leftPanel}>
        <div>
          <AspectRatioPanel
            originalAspect={cropContext.photos[index]?.originalAspect}
            handleAspectRatio={handleAspectRatio}
          />
        </div>
        <div>
          <ZoomPanel
            zoom={cropContext.photos[index]?.zoom}
            handleZoomChange={handleZoomChange}
            index={index}
          />
        </div>
      </div>
      <div className={style.rightButton}>
        <AddPhotoSlider cropContext={cropContext} />
      </div>
    </div>
  )
}
