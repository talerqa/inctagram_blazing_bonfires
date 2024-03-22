import React from 'react'

import { Popover } from '@headlessui/react'

import styles from './aspect-ratio-panel.module.scss'

import HorizontalRectangle from '@/features/create-post/ui/icons/horizontal-rectangle'
import OriginalAspectIcon from '@/features/create-post/ui/icons/original-aspect-icon'
import SquareIcon from '@/features/create-post/ui/icons/square-icon'
import VerticalRectangle from '@/features/create-post/ui/icons/vertical-rectangle'
import RatioIcon from '@/shared/assets/icons/ratio-icon/ratio-icon'
import RatioIconOpen from '@/shared/assets/icons/ratio-icon/ratio-icon-open'
import { Button, ButtonTheme } from '@/shared/ui'

interface AspectRatioPanelProps {
  currentAspect: number
  handleAspectRatio: (aspect: number) => void
  originalAspect: number
}

const aspectRatio = {
  square: 1,
  verticalRectangle: 4 / 5,
  horizontalRectangle: 16 / 9,
}

const AspectRatioPanel: React.FC<AspectRatioPanelProps> = ({
  currentAspect,
  originalAspect,
  handleAspectRatio,
}) => {
  return (
    <Popover className={styles.relative}>
      <Popover.Panel className={styles.buttonPanel}>
        <button
          className={styles.button}
          onClick={() => {
            handleAspectRatio(originalAspect)
          }}
        >
          <span className={currentAspect === originalAspect ? styles.current : styles.aspect}>
            Оригинал
          </span>
          <OriginalAspectIcon color={currentAspect === originalAspect ? '#fff' : '#8D9094'} />
        </button>
        <button
          className={styles.button}
          onClick={() => {
            handleAspectRatio(aspectRatio.square)
          }}
        >
          <span className={currentAspect === 1 ? styles.current : styles.aspect}>1:1</span>
          <SquareIcon color={currentAspect === 1 ? '#fff' : '#8D9094'} />
        </button>
        <button
          className={styles.button}
          onClick={() => {
            handleAspectRatio(aspectRatio.verticalRectangle)
          }}
        >
          <span className={currentAspect === 4 / 5 ? styles.current : styles.aspect}>4:5</span>
          <VerticalRectangle color={currentAspect === 4 / 5 ? '#fff' : '#8D9094'} />
        </button>
        <button
          className={styles.button}
          onClick={() => {
            handleAspectRatio(aspectRatio.horizontalRectangle)
          }}
        >
          <span className={currentAspect === 16 / 9 ? styles.current : styles.aspect}>16:9</span>
          <HorizontalRectangle color={currentAspect === 16 / 9 ? '#fff' : '#8D9094'} />
        </button>
      </Popover.Panel>
      <Popover.Button as="div" className={styles.popoverBtn}>
        <Button theme={ButtonTheme.CLEAR} className={styles.sizeButton}>
          <RatioIcon className={styles.ratioIcon} />
          <RatioIconOpen className={styles.ratioIconOpen} />
        </Button>
      </Popover.Button>
    </Popover>
  )
}

export default AspectRatioPanel
