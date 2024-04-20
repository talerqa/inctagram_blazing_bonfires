import { ChangeEvent, forwardRef, ReactNode } from 'react'
import * as React from 'react'

import styles from './round-checkbox.module.scss'

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
  const checkboxId = label ? label.toString() : ''

  return (
    <>
      <div className={styles.checkboxWrapper}>
        <input
          id={checkboxId}
          value={value}
          type={'radio'}
          onChange={onChange}
          checked={checked}
          className={styles.checkbox}
          {...rest}
          ref={ref}
        />
        <label className={styles.label} htmlFor={checkboxId}>
          {label}
        </label>
      </div>
    </>
  )
})
