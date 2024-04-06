import React from 'react'

import s from './Card.module.scss'

export const Card = ({ headerText, children, ...props }) => {
  const styles = {
    position: 'absolute',
    // textWrap: 'nowrap',
    top: 0,
    left: -283,
    background: 'var(--color-dark-500)',
    zIindex: 4,
  }

  const headerStyle = {
    color: 'white',
  }

  return (
    <div {...props} style={styles}>
      <div className={s.header} style={headerStyle}>
        {headerText}
      </div>
      {children}
    </div>
  )
}
