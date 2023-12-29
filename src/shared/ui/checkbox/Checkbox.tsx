import { ChangeEvent, forwardRef, ReactNode, Ref } from 'react'

import styles from './Checkbox.module.scss'

type Props = {
  ref: Ref<HTMLInputElement>
  children: ReactNode
  value?: boolean
  disabled?: boolean
  error?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ children, disabled, error, value, onChange, ...rest }: Props, ref) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
    }

    return (
      <div className={styles.checkboxWrapper}>
        <div className={styles.checkboxLabel}>
          <input
            checked={value}
            type={'checkbox'}
            className={styles.checkbox}
            disabled={disabled}
            onChange={onChangeHandler}
            {...rest}
            ref={ref}
          />
          <span className={styles.check}></span>
        </div>
        <label>{children}</label>
        <p className={styles.error}>{error && !value ? error : ''}</p>
      </div>
    )
  }
)
