import React from 'react'

import style from './dots-bar.module.scss'

import { classNames } from '@/shared/libs/class-names/class-names'

interface DotsBarProps {
  count: number
  activeIndex: number
}

export const DotsBar: React.FC<DotsBarProps> = ({ activeIndex, count }) => {
  return (
    <div className={style.dotWrapper}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={classNames(style.dot, { [style.active]: activeIndex === index })}
        />
      ))}
    </div>
  )
}
