import React, { ButtonHTMLAttributes } from 'react'

import cls from './button.module.scss'

import { classNames } from '@/shared/libs/class-names/class-names'

export enum ButtonTheme {
  NOBORDER = 'noborder',
  CLEAR = 'clear',
  FILLED = 'filled',
}

export enum ButtonSize {
  SMALL = 'small',
  MIDDLE = 'middle',
  LARGE = 'large',
  STRETCHED = 'stretched',
  CLEAN = 'clean',
}

type Props = {
  className?: string
  theme?: ButtonTheme
  size?: ButtonSize
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: Props) => {
  const {
    className,
    children,
    theme = ButtonTheme.FILLED,
    size = ButtonSize.CLEAN,
    ...otherProps
  } = props

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={classNames(cls.Button, {}, [className ? className : '', cls[theme], cls[size]])}
      {...otherProps}
    >
      {children}
    </button>
  )
}
