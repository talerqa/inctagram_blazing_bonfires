import React from 'react'

import { clsx } from 'clsx'
import { useSelector } from 'react-redux'

import style from './dots-bar.module.scss'

import { selectCurrentPhotoIndex, selectPhotosCount } from '@/shared/api/services/posts/post.slice'

export const DotsBar: React.FC = () => {
  const activeIndex = useSelector(selectCurrentPhotoIndex)
  const count = useSelector(selectPhotosCount)

  return (
    <div className={style.dotWrapper}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={clsx(style.dot, { [style.active]: activeIndex === index })}
        ></div>
      ))}
    </div>
  )
}
