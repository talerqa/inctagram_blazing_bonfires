import React from 'react'

import { Popover } from '@headlessui/react'

import styles from './zoom-panel.module.scss'

import ZoomIcon from '@/shared/assets/icons/zoom-icon/zoom-icon'
import ZoomIconOpen from '@/shared/assets/icons/zoom-icon/zoom-icon-open'
import { Button, ButtonTheme } from '@/shared/ui'

type ZoomPanelProps = {
  zoom: number
  handleZoomChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  index: number
}

const ZoomPanel: React.FC<ZoomPanelProps> = ({ zoom, handleZoomChange }) => {
  return (
    <Popover className={styles.relative}>
      <Popover.Panel className={styles.zoomPanel}>
        <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={handleZoomChange} />
      </Popover.Panel>
      <Popover.Button as="div" className={styles.popoverBtn}>
        <Button theme={ButtonTheme.CLEAR} className={styles.sizeButton}>
          <ZoomIcon className={styles.zoomIcon} />
          <ZoomIconOpen className={styles.zoomIconOpen} />
        </Button>
      </Popover.Button>
    </Popover>
  )
}

export default ZoomPanel
