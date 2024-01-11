/* eslint-disable no-nested-ternary */
import React, { FormHTMLAttributes } from 'react'

import styles from './FormContainer.module.scss'

import { classNames } from '@/shared/libs/classNames/classNames'

type Props = {
  title: string
  className?: string
} & FormHTMLAttributes<HTMLFormElement>

export enum FormOption {
  SIGNIN = 'signin',
  SIGNUP = 'signup',
  CREATEPASSWORD = 'createPassword',
  FORGOTPASSWORD = 'forgotPassword',
}

export const FormContainer = ({ title, children, className }: Props) => {
  return (
    <div className={classNames(styles.formContainer, {}, [className ? className : ''])}>
      <h3>{title}</h3>
      {children}
    </div>
  )
}
