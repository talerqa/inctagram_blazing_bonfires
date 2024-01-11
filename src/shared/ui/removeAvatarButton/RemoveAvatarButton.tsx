import React from 'react'

import styles from './RemoveAvatarButton.module.scss'
type Props = {
  onClick: () => void
}

export const RemoveAvatarButton = ({ onClick }: Props) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.redBtn}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
      </div>
    </div>
  )
}
