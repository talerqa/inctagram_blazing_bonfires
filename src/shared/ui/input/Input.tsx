import { ComponentPropsWithoutRef, Ref, forwardRef, useState } from 'react'

import { clsx } from 'clsx'
import Image from 'next/image'

import styles from './Input.module.scss'

import eyeImg from '@/shared/assets/icons/input/eye.svg'
import searchImg from '@/shared/assets/icons/input/search.svg'
import location from '@/shared/assets/icons/location/location.svg'
import { classNames, Mods } from '@/shared/libs/classNames/classNames'

export enum InputType {
  SEARCH = 'search',
  EMAIL = 'email',
  PASSWORD = 'password',
  TEXT = 'text',
  TEL = 'tel',
  LOCATION = 'location',
}

type Props = {
  ref?: Ref<HTMLInputElement>
  classNameWrap?: string
  label: string
  value?: string
  disabled?: boolean
  placeholder: string
  error?: string
  type: InputType
  callback?: (value: string) => void
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    { label, classNameWrap, value, placeholder, error, type, callback, onChange, ...restProps },
    ref
  ) => {
    const [passwordInvisible, setPasswordInvisible] = useState<boolean>(true)

    const inputStyles = classNames(styles.input, {
      [styles.erroredInput]: error,
      [styles.inputSearch]: type === InputType.SEARCH,
    } as Mods)
    const inputStylesWrapper = classNames(styles.wrapper, {}, [classNameWrap ? classNameWrap : ''])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      callback?.(e.currentTarget.value)
    }

    const inputTypeMap: Record<InputType, string> = {
      [InputType.SEARCH]: 'search',
      [InputType.EMAIL]: 'email',
      [InputType.PASSWORD]: 'password',
      [InputType.TEXT]: 'text',
      [InputType.TEL]: 'tel',
      [InputType.LOCATION]: 'text',
    }

    return (
      <div className={inputStylesWrapper}>
        <label className={styles.label}>{label}</label>
        {type === InputType.SEARCH && (
          <Image src={searchImg} alt="search" width={15} height={15} className={styles.search} />
        )}
        {type === InputType.LOCATION && (
          <Image src={location} alt="location" width={24} height={24} className={styles.location} />
        )}
        <input
          ref={ref}
          className={inputStyles}
          type={inputTypeMap[type]}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          {...restProps}
        />
        {type === InputType.PASSWORD && (
          <>
            <Image
              src={eyeImg}
              alt="eye"
              width={24}
              height={24}
              className={styles.eye}
              onClick={() => setPasswordInvisible(!passwordInvisible)}
            />
            {passwordInvisible && (
              <div
                className={styles.eyeCrossLine}
                onClick={() => setPasswordInvisible(!passwordInvisible)}
              ></div>
            )}
          </>
        )}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    )
  }
)
