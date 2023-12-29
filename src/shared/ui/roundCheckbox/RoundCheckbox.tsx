import { ChangeEvent, forwardRef, ReactNode, Ref } from 'react'
import * as React from 'react'

import styles from './RoundCheckbox.module.scss'

type Props = {
  error?: string
  name?: string
  value?: string
  label: ReactNode
  checked: boolean
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void
}

export const RoundCheckbox = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, checked, error, onChange, value, ...rest } = props

  return (
    <>
      <div className={styles.checkboxWrapper}>
        <input
          value={value}
          type={'radio'}
          onChange={onChange}
          checked={checked}
          className={styles.checkbox}
          {...rest}
          ref={ref}
        />
        <label htmlFor="#">{label}</label>
      </div>
    </>
  )
})
