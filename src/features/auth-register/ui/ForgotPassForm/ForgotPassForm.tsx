/* eslint-disable import/no-named-as-default */
import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast, Toaster } from 'react-hot-toast'
import * as yup from 'yup'

import styles from './ForgotPassForm.module.scss'

import { useRecoverPasswordMutation } from '@/shared/api/services/auth/auth.api'
import { PasswordRecoveryType } from '@/shared/api/services/auth/auth.api.types'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'
import { Input, InputType } from '@/shared/ui/Input/Input'
import inputStyles from '@/shared/ui/Input/Input.module.scss'
import { LinearLoader } from '@/shared/ui/Loaders/LinearLoader'
import { Modal } from '@/shared/ui/Modal/Modal'

export function ForgotPass() {
  const { t } = useTranslation('common', { keyPrefix: 'Auth' })
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })

  const [isSentPass, setIsSentPass] = useState(false)
  const [recoverPassword, { isLoading }] = useRecoverPasswordMutation()
  const callBackCloseWindow = () => setIsSentPass(false)

  const schema = yup.object().shape({
    email: yup.string().email(tError('EmailValidationError')).required(tError('RequiredField')),
    recaptcha: yup.string().required(),
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<PasswordRecoveryType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      recaptcha: '',
    },
  })

  const onChangeRecaptchaHandler = (value: string | null) => {
    value && setValue('recaptcha', value)
  }

  const onSubmit: SubmitHandler<PasswordRecoveryType> = data => {
    recoverPassword(data)
      .unwrap()
      .then(() => {
        reset()
        setIsSentPass(true)
      })
      .catch(error => {
        if (error) {
          toast.error(error.data.error)
        }
      })
  }

  return (
    <>
      <Toaster position="top-right" />
      {isLoading && <LinearLoader />}
      <FormContainer title={t('ForgotPassword')}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
          <Input
            {...register('email')}
            label={t('Email')}
            type={InputType.EMAIL}
            placeholder={t('EnterEmail')}
            className={inputStyles.input}
            error={errors.email && errors.email?.message}
          />
          <p className={styles.forgotHelpText}>{t('EnterEmailForGetInstruction')}</p>
          {isSentPass && (
            <Modal
              title={t('PasswordSent')}
              mainButton={' OK '}
              callBackCloseWindow={callBackCloseWindow}
            >
              <p>{t('LinkHasBeenSent')}</p>
            </Modal>
          )}
          {!isSentPass ? (
            <Button size={ButtonSize.STRETCHED} className={styles.sendLinkBtn}>
              {t('SendLink')}
            </Button>
          ) : (
            <Button size={ButtonSize.STRETCHED} className={styles.sendLinkBtn}>
              {t('SendAgain')}
            </Button>
          )}
          <Link href={'/sign-in'}>
            <Button
              className={styles.oppositeBtn}
              theme={ButtonTheme.CLEAR}
              size={ButtonSize.MIDDLE}
            >
              {t('BackToSignIn')}
            </Button>
          </Link>
          <ReCAPTCHA
            sitekey="6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ" // replace to .env.production
            onChange={onChangeRecaptchaHandler}
            theme={'dark'}
            aria-required
          />
        </form>
      </FormContainer>
    </>
  )
}
