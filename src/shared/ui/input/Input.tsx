import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  forwardRef,
  ReactNode,
  Ref,
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
  FRAMELESS = 'frameless',
}
export type InputProps<T extends ElementType = 'input' | 'textarea'> = {
  as?: T
  classnamewrap?: string
  error?: string
  label?: string
  location?: 'fixed' | 'relative'
  callback?: (value: string) => void
  resize?: boolean
  type?: InputType
} & ComponentPropsWithoutRef<T> & { cols?: number | undefined; rows?: number | undefined }

export const Input = forwardRef(
  <T extends ElementType = 'input'>(props: InputProps<T>, ref: ElementRef<T>) => {
    const {
      as: Component = 'input',
      className,
      disabled,
      error,
      label,
      location = 'relative',
      onChange,
      callback,
      type = InputType.TEXT,
      cols,
      resize = false,
      rows,
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
      inputClassName: clsx(
        s.input,
        Component == 'textarea' && type !== InputType.FRAMELESS && s.textarea,
        s[type],
        error && s.errorMessage,
        resize || s.resize
      ),
      label: clsx(s.label, disabled && s.disabled, rest.required && s.required),
      location: clsx(s.eyeIcon, s.locationStyle),
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      onChange?.(e)
      callback?.(e.target.value)
    }
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref as Ref<unknown> | undefined, () => inputRef.current!, [])

    return (
      <div className={classes.container}>
        {label && <Label className={classes.label} label={label} />}
        {type === 'search' && (
          <div className={s.searchIcons}>
            <SearchIcon className={s.icon} disabled={disabled} />
          </div>
        )}
        <Component
          className={classes.inputClassName}
          disabled={disabled}
          id={label}
          onChange={handleChange}
          type={isShowPassword || type === 'search' ? 'text' : type}
          {...rest}
          cols={cols}
          ref={inputRef as any}
          rows={rows}
        />

        {type === 'password' && (
          <button
            className={classes.iconButton}
            onClick={() => !disabled && setIsShowPassword(value => !value)}
            type={'button'}
          >
            {isShowPassword ? (
              <EyeIcon className={s.eyeIcon} disabled={disabled} />
            ) : (
              <EyeOffIcon className={s.eyeIcon} disabled={disabled} />
            )}
          </button>
        )}
        {type === 'location' && <Location className={classes.location} disabled={disabled} />}
        {error && <ErrorMessage className={classes.error} error={error} />}
      </div>
    )
  }
) as <T extends ElementType = 'input'>(
  props: InputProps<T> & {
    ref?: ForwardedRef<ElementRef<T>>
  }
) => ReactNode
