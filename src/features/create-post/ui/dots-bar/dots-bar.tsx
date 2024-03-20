import { clsx } from 'clsx'
import { useSelector } from 'react-redux'

import style from './dots-bar.module.scss'

import { selectCurrentPhotoIndex } from '@/shared/api/services/posts/post.slice'
import { useImageCropContext } from '@/shared/hooks/use-image-crop-context'

export const DotsBar = () => {
  const cropContext = useImageCropContext()
  const activeIndex = useSelector(selectCurrentPhotoIndex)
  const count = cropContext.photos.length

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
