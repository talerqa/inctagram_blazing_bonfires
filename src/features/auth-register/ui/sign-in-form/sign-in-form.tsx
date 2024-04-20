import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { toast, Toaster } from 'react-hot-toast'
import * as yup from 'yup'

import styles from './sign-in-form.module.scss'

import { OAuth } from '@/features/auth-register/ui/oauth/oauth'
import { LoginFormType, useLoginMutation } from '@/shared/api'
import { useLoginMutation, LoginFormType, LoginFormType, useLoginMutation } from '@/shared/api'
import { RoutersPath } from '@/shared/constants/paths'
import { Button, ButtonSize, FormContainer, Input, InputType, LinearLoader } from '@/shared/ui'

export const SignInForm = () => {
  const { t: tAuth } = useTranslation('common', { keyPrefix: 'Auth' })
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })
  const { t } = useTranslation('common')

  const schema = yup.object().shape({
    email: yup.string().required('Error.RequiredField'),
    password: yup.string().required('Error.RequiredField'), // to change locale instantly you have to use "t" as close as possible to error place. Here it's JSX error prop.
  })

  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [login, { isLoading }] = useLoginMutation()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (args: LoginFormType) => {
    login(args)
      .unwrap()
      .then(() => router.push(RoutersPath.profile))
      .catch(error => {
        if (error && error.data) {
          const { statusCode } = error.data

          if (statusCode === 400) {
            setPasswordError(tError('PasswordIncorrect'))
          } else if (statusCode === 401) {
            setEmailError(tError('EmailNotRegistered'))
          }
        } else {
          toast.error(tError('NetworkError'))
        }
      })
  }

  return (
    <>
      <Toaster position="top-right" />
      {isLoading && <LinearLoader />}
      <FormContainer title={tAuth('SignIn')}>
        <OAuth />
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            label={tAuth('Email')}
            type={InputType.EMAIL}
            placeholder={tAuth('EnterEmail')}
            error={t(errors.email?.message || '') || t(emailError)}
            {...register('email')}
          />
          <Input
            label={tAuth('Password')}
            type={InputType.PASSWORD}
            placeholder={tAuth('EnterPassword')}
            error={t(errors.password?.message || '') || t(passwordError)}
            {...register('password')}
          />
          <Link href="/forgot-password" className={styles.signInForgotText}>
            {tAuth('ForgotPassword')}
          </Link>
          <Button size={ButtonSize.STRETCHED}>{tAuth('SignIn')}</Button>
          <p className={styles.helpText}>{tAuth('DontHaveAccount?')}</p>
          <Link href={RoutersPath.signUp} className={styles.link}>
            <p className={styles.oppositeBtn}>{tAuth('SignUp')}</p>
          </Link>
        </form>
      </FormContainer>
    </>
  )
}
