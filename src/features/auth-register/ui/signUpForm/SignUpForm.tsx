import React, { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast, Toaster } from 'react-hot-toast'
import * as yup from 'yup'

import styles from './SignUpForm.module.scss'

import { OAuth } from '@/features/auth-register/ui/oAuth/OAuth'
import { SignUpType, useSignUpMutation } from '@/shared/api'
import { RoutersPath } from '@/shared/constants/paths'
import { registrationSchema } from '@/shared/constants/validation-schema/registrationSchema'
import { RegistrationFormType } from '@/shared/types/schemaTypes'
import {
  Button,
  ButtonSize,
  ButtonTheme,
  Checkbox,
  FormContainer,
  Input,
  InputType,
  LinearLoader,
  Modal,
} from '@/shared/ui'

export const SignUpForm = () => {
  const { t } = useTranslation('common')

  const [signUp, { isLoading }] = useSignUpMutation()
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [email, setEmail] = useState('')

  const callBackCloseWindow = () => setRegistrationSuccess(false)

  const {
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { isValid, errors, touchedFields },
    reset,
  } = useForm<RegistrationFormType>({
    resolver: yupResolver(registrationSchema(t)) as yup.InferType<yup.Schema>,
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      agreement: false,
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const passwordConfirm = watch('passwordConfirmation')

  const onSubmit: SubmitHandler<SignUpType> = (data: SignUpType) => {
    signUp(data)
      .unwrap()
      .then(() => {
        setEmail(data.email)
        reset()
        setRegistrationSuccess(true)
      })
      .catch(error => toast.error(error.data.messages[0].message))
  }

  useEffect(() => {
    const touchedFieldsList = Object.keys(touchedFields) as Array<keyof RegistrationFormType>

    touchedFieldsList.forEach((field: keyof RegistrationFormType) => {
      if (errors[field]) {
        trigger(field)
      }
    })
  }, [t])

  return (
    <>
      <Toaster position="top-right" />
      {isLoading && <LinearLoader />}
      {registrationSuccess && (
        <Modal
          title={t('Auth.EmailSent')}
          mainButton={'OK'}
          callBackCloseWindow={callBackCloseWindow}
        >
          <p>
            {t('Auth.LinkConfirmYourEmail')} {email}
          </p>
        </Modal>
      )}
      <FormContainer title={t('Auth.SignUp')}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer} noValidate>
          <div className={styles.oAuth}>
            <OAuth />
          </div>
          <Controller
            control={control}
            name="userName"
            render={({ field, fieldState: { error } }) => (
              <Input
                type={InputType.TEXT}
                label={t('Auth.UserName')}
                placeholder={t('Auth.EnterName')}
                error={error && error?.message}
                classNameWrap={error ? '' : styles.inputUserName}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState: { error } }) => (
              <Input
                label={t('Auth.Email')}
                placeholder={t('Auth.EnterEmail')}
                type={InputType.EMAIL}
                error={error && error?.message}
                classNameWrap={error ? '' : styles.inputEmail}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
              <Input
                label={t('Auth.Password')}
                placeholder={t('Auth.EnterPassword')}
                type={InputType.PASSWORD}
                error={error && error?.message}
                value={value || ''}
                onChange={onChange}
                classNameWrap={error ? '' : styles.inputPassword}
                onBlur={() => {
                  onBlur()
                  if (passwordConfirm.length) {
                    return trigger(['password', 'passwordConfirmation'])
                  }
                }}
                ref={ref}
              />
            )}
          />
          <Controller
            control={control}
            name="passwordConfirmation"
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => (
              <Input
                label={t('Auth.PasswordConfirmation')}
                placeholder={t('Auth.PasswordConfirmation')}
                type={InputType.PASSWORD}
                error={error && error?.message}
                value={value || ''}
                ref={ref}
                classNameWrap={styles.inputPasswordConfirm}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <div className={styles.agreementContainer}>
            <Controller
              control={control}
              name="agreement"
              render={({ field }) => (
                <Checkbox {...field}>
                  <p className={styles.agreementText}>
                    {t('Auth.AgreeToThe') + ' '}
                    <Link href={RoutersPath.authTermsOfService} className={styles.agreementLink}>
                      {t('Auth.TermsOfService')}
                    </Link>
                    {' ' + t('And') + ' '}
                    <Link
                      href={{
                        pathname: `${RoutersPath.authPrivacyPolicy}`,
                        query: { previousPage: `${RoutersPath.signUp}` },
                      }}
                      className={styles.agreementLink}
                    >
                      {t('PrivacyPolicy')}
                    </Link>
                  </p>
                </Checkbox>
              )}
            />
          </div>
          <Button className={styles.signUpBtn} size={ButtonSize.STRETCHED} disabled={!isValid}>
            {t('Auth.SignUp')}
          </Button>
          <p className={styles.helpText}>{t('Auth.HaveAccount?')}</p>
          <Button
            className={styles.oppositeBtn}
            theme={ButtonTheme.NOBORDER}
            size={ButtonSize.SMALL}
          >
            <Link href={RoutersPath.signIn} className={styles.linkOppositeBtn} tabIndex={-1}>
              {t('Auth.SignIn')}
            </Link>
          </Button>
        </form>
      </FormContainer>
    </>
  )
}
