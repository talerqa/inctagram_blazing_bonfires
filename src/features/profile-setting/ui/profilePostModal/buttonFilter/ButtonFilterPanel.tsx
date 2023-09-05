import React from 'react'

import Image from 'next/image'

import style from './ButtonFilterPanel.module.scss'

import { ModalButton } from '@/features/profile-setting'
import { useImageCropContext } from '@/features/profile-setting/ui/profilePostModal/cropper/CropProvider'
import maxmMin from '@/shared/assets/icons/filterPostPhoto/maximize-outline.svg'
import sizePhoto from '@/shared/assets/icons/filterPostPhoto/size.svg'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'

export const ButtonFilterPanel = () => {
  const {
    zoom,
    handleAspectRatioClick,
    isModalOpen,
    handleCropOpen,
    showZoomInput,
    handleZoomChange,
    handleToggleZoomInput,
  } = useImageCropContext()

  return (
    <div className={style.filterPanelContainer}>
      <div className={style.leftPanel}>
        <div className={style.buttonContainer}>
          {isModalOpen && <ModalButton onAspectRatioChange={handleAspectRatioClick} />}
          <Button theme={ButtonTheme.CLEAR} className={style.sizeButton} onClick={handleCropOpen}>
            <Image src={sizePhoto} alt={''} />
          </Button>
        </div>
        <div>
          {showZoomInput && (
            <div className={style.zoomInput}>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={handleZoomChange}
              />
            </div>
          )}
          <Button
            theme={ButtonTheme.CLEAR}
            className={style.sizeButton}
            onClick={handleToggleZoomInput}
          >
            <Image src={maxmMin} alt={''} />
          </Button>
        </div>
      </div>
      <div className={style.rightButton}>
        <Button theme={ButtonTheme.CLEAR} className={style.sizeButton}>
          <Image src={noImage} alt={''} style={{ width: '24px', height: '24px' }} />
        </Button>
      </div>
    </div>
  )
}
