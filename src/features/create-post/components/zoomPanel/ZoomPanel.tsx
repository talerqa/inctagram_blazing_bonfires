import React from 'react'

import { Popover } from '@headlessui/react'
import Image from 'next/image'

import styles from './ZoomPanel.module.scss'

import maxmMin from '@/shared/assets/icons/filterPostPhoto/maximize-outline.svg'
import { Button, ButtonTheme } from '@/shared/ui'

type ZoomPanelProps = {
  zoom: number
  handleZoomChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  index: number
}

const ZoomPanel: React.FC<ZoomPanelProps> = ({ zoom, handleZoomChange, index }) => {
  return (
    <Popover className={styles.relative}>
      <Popover.Panel className={styles.zoomPanel}>
        <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={handleZoomChange} />
      </Popover.Panel>
      <Popover.Button as="div">
        <Button theme={ButtonTheme.CLEAR} className={styles.sizeButton}>
          <Image src={maxmMin} alt={''} />
        </Button>
      </Popover.Button>
    </Popover>
  )
}

export default ZoomPanel
