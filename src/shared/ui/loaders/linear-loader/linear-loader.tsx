import React, { useEffect, useRef } from 'react'

import LoadingBar from 'react-top-loading-bar'

import styles from '../loader.module.scss'

export const LinearLoader = ({ start = true }) => {
  let ref = useRef<any>(null)

  useEffect(() => {
    if (start) {
      ref.current.continuousStart()
    }
  }, [start])

  return (
    <div className={styles.loaderWrapper}>
      <LoadingBar color="#f11946" ref={ref} />
    </div>
  )
}
