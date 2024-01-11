import React, { ReactNode, useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import closeImg from '../../assets/icons/logout/close.svg'

import style from './Modal.module.scss'

import { Button, ButtonSize, ButtonTheme } from '@/shared/ui'

type Props = {
  title: string
  mainButton?: string
  extraButton?: string
  styles?: {}
  isShowButton?: boolean
  mainButtonCB?: () => void
  extraButtonCB?: () => void
  callBackCloseWindow: () => void
  children: ReactNode
}

export const Modal = ({
  isShowButton = true,
  styles,
  children,
  title,
  mainButton,
  extraButton,
  callBackCloseWindow,
  extraButtonCB,
  mainButtonCB,
}: Props) => {
  const refModalWindow = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(true)

  const closeOpenMenu = (e: DocumentEventMap['mousedown']) => {
    if (
      refModalWindow.current &&
      isOpen &&
      !refModalWindow.current!.contains(e.target as HTMLDivElement)
    ) {
      setIsOpen(false)
      callBackCloseWindow()
    }
  }
  const mainButtonHandler = () => {
    mainButtonCB && mainButtonCB()
    callBackCloseWindow()
  }
  const extraButtonHandler = () => {
    extraButtonCB && extraButtonCB()
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', closeOpenMenu)
    }

    return () => {
      document.removeEventListener('mousedown', closeOpenMenu)
    }
  }, [isOpen])

  return (
    <div className={style.windowWrapper}>
      <div style={styles ? styles : {}} className={style.mainWindow} ref={refModalWindow}>
        <div className={style.header}>
          <div>{title}</div>
          <div>
            <Button
              theme={ButtonTheme.CLEAR}
              className={style.buttonClose}
              onClick={callBackCloseWindow}
            >
              <Image src={closeImg} alt={''} />
            </Button>
          </div>
        </div>
        <div className={style.mainDescription}>{children}</div>
        <div className={style.buttons}>
          <div className={style.button}>
            {extraButton && (
              <Button
                size={ButtonSize.SMALL}
                theme={ButtonTheme.CLEAR}
                onClick={extraButtonHandler}
              >
                {extraButton}
              </Button>
            )}
          </div>
          {isShowButton && (
            <Button size={ButtonSize.SMALL} onClick={mainButtonHandler}>
              {mainButton}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
