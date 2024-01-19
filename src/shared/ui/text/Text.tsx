import { ComponentPropsWithoutRef, ElementType } from 'react'

import { clsx } from 'clsx'

import style from './Text.module.scss'

export type TextType<T extends ElementType> = {
  size?: 'small' | 'medium' | 'regular' | 'large' | 'xl' | 'xxl' | 'link' | 'small_link'
  weight?: 'regular' | 'medium' | 'semi_bold' | 'bold'
  as: T
  className?: string
  color?: 'light' | 'primary' | 'error' | 'info'
} & ComponentPropsWithoutRef<T>

export const Text = <T extends ElementType>(
  props: TextType<T> & Omit<ComponentPropsWithoutRef<T>, keyof TextType<T>>
) => {
  const { size, weight, color, className, as: Component = 'div', ...rest } = props

  const classname = clsx(
    style.default,
    {
      [style.fs_xxl]: size === 'xxl',
      [style.fs_xl]: size === 'xl',
      [style.fs_large]: size === 'large',
      [style.fs_regular]: size === 'regular',
      [style.fs_medium]: size === 'medium',
      [style.fs_small]: size === 'small',
      [style.fs_link]: size === 'link',
      [style.fs_small_link]: size === 'small_link',
    },
    {
      [style.fw_regular]: weight === 'regular',
      [style.fw_medium]: weight === 'medium',
      [style.fw_semi_bold]: weight === 'semi_bold',
      [style.fw_bold]: weight === 'bold',
    },
    {
      [style.light]: color === 'light',
      [style.primary]: color === 'primary',
      [style.error]: color === 'error',
      [style.info]: color === 'info',
    }
  )

  return <Component className={classname + ' ' + className} {...rest} />
}
