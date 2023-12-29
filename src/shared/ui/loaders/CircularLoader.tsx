import React from 'react'

import { CircularProgress } from '@mui/material'

import styles from '@/shared/ui/loaders/Loader.module.scss'

export const CircularLoader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}>
        <CircularProgress />
      </div>
    </div>
  )
}
