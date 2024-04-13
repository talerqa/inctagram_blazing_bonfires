import React from 'react'

import s from '@/shared/ui/loaders/circular-loader/circular-loader.module.scss'

export const CircularLoader = () => {
  return (
    <div className={s.loaderContainer}>
      <div className={s.loader} />
    </div>
  )
}
