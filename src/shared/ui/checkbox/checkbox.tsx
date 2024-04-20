import { ChangeEvent, forwardRef, ReactNode, Ref } from 'react'

import clsx from 'clsx'

import styles from './checkbox.module.scss'

type Props = {
  ref: Ref<HTMLInputElement>
  children: ReactNode
  value?: boolean
  disabled?: boolean
  error?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  fullWidth?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ children, disabled, error, value, onChange, fullWidth = true, ...rest }: Props, ref) => {
    const classNames = {
      root: clsx(styles.checkboxWrapper, fullWidth && styles.fullWidth),
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
    }
    const checkboxId = children ? children.toString() : ''

    return (
      <div className={classNames.root}>
        <div className={styles.checkboxLabel}>
          <input
            checked={value}
            id={checkboxId}
            type={'checkbox'}
            className={styles.checkbox}
            disabled={disabled}
            onChange={onChangeHandler}
            {...rest}
            ref={ref}
          />
          <span className={styles.check}></span>
          {children && (
            <label className={styles.label} htmlFor={checkboxId}>
              {children}
            </label>
          )}
        </div>
        <p className={styles.error}>{error && !value ? error : ''}</p>
      </div>
    )
  }
)
