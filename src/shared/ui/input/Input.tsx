import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { clsx } from 'clsx'

import s from './Input.module.scss'

import { Label } from '@//shared/ui/label/label'
import { EyeIcon } from '@/shared/assets/icons/eye/eye'
import { EyeOffIcon } from '@/shared/assets/icons/eye/eyeoff'
import { Location } from '@/shared/assets/icons/location/location'
import SearchIcon from '@/shared/assets/icons/search/search'
import { ErrorMessage } from '@/shared/ui/error-message/error-message'

export enum InputType {
  SEARCH = 'search',
  EMAIL = 'email',
  PASSWORD = 'password',
  TEXT = 'text',
  TEL = 'tel',
  LOCATION = 'location',
}
export type InputProps = {
  classnamewrap?: string
  error?: string
  label?: string
  location?: 'fixed' | 'relative'
  callback?: (value: string) => void
  type?: InputType
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    disabled,
    error,
    label,
    location = 'relative',
    onChange,
    callback,
    type = InputType.TEXT,
    ...rest
  } = props
  const [isShowPassword, setIsShowPassword] = useState(false)
  const classes = {
    container: clsx(
      s.inputContainer,
      error && s.errorMessage,
      error && location === 'relative' && s.marginBottom,
      label && s.marginTop,
      className,
      disabled && s.disabled
    ),
    error: clsx(s.error, disabled && s.disabled),
    iconButton: clsx(s.iconButton, disabled && s.disabled),
    inputClassName: clsx(s.input, s[type], error && s.errorMessage),
    label: clsx(s.label, disabled && s.disabled, rest.required && s.required),
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(e)
    callback?.(e.target.value)
  }
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => inputRef.current!, [])

  return (
    <div className={classes.container}>
      <Label className={classes.label} label={label} />
      <div className={s.searchIcons}>
        {type === 'search' && <SearchIcon className={s.icon} disabled={disabled} />}
      </div>
      <input
        className={classes.inputClassName}
        disabled={disabled}
        id={label}
        onChange={handleChange}
        type={isShowPassword || type === 'search' ? 'text' : type}
        {...rest}
        ref={inputRef}
      />

      <button
        className={classes.iconButton}
        onClick={() => !disabled && setIsShowPassword(value => !value)}
        type={'button'}
      >
        {isShowPassword
          ? type === 'password' && <EyeIcon className={s.eyeIcon} disabled={disabled} />
          : type === 'password' && <EyeOffIcon className={s.eyeIcon} disabled={disabled} />}
        {type === 'location' && <Location className={s.eyeIcon} disabled={disabled} />}
      </button>
      <ErrorMessage className={classes.error} error={error} />
    </div>
  )
})
