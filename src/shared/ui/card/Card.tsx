import React, { forwardRef, PropsWithChildren, ReactNode, useEffect, useRef } from 'react'

import s from './Card.module.scss'

type CardType = {
  headerText?: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  icon?: ReactNode
  className?: string
} & PropsWithChildren

export const Card = forwardRef<HTMLDivElement, CardType>(
  ({ headerText, children, isOpen, setIsOpen, icon, className, ...props }: CardType, ref) => {
    const notificationRef = useRef<any>(null)
    const styles = {
      visible: {
        opacity: 1,
        display: 'initial',
      },
      hidden: {
        opacity: 0,
        display: 'none',
      },
    }

    useEffect(() => {
      // Function to handle clicks outside of the notification container
      const handleClickOutside = (event: MouseEvent) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
          // Click occurred outside of the notification container, so close it
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [])

    return (
      <div className={s.card} ref={notificationRef}>
        <div onClick={() => setIsOpen(!isOpen)}>{icon}</div>
        <div
          style={isOpen ? styles.visible : styles.hidden}
          className={s.contentContainer + ' ' + className}
          ref={ref}
          {...props}
        >
          <div className={s.header}>{headerText}</div>
          {children}
        </div>
      </div>
    )
  }
)
