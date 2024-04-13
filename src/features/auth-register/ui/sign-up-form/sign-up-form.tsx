import React, { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast, Toaster } from 'react-hot-toast'
import * as yup from 'yup'

import styles from './sign-up-form.module.scss'

import { OAuth } from '@/features/auth-register/ui/oauth/oauth'
import { SignUpType, useSignUpMutation } from '@/shared/api'
import { RoutersPath } from '@/shared/constants/paths'
import { registrationSchema } from '@/shared/constants/validation-schema/registration-schema'
import { RegistrationFormType } from '@/shared/types/schema-types'
import {
  Button,
  ButtonSize,
  ButtonTheme,
  Checkbox,
  FormContainer,
  InputType,
  LinearLoader,
  Modal,
} from '@/shared/ui'
import { ControlledTextField } from '@/shared/ui/controlled/controlled-textfield/controlled-text-field'

export const SignUpForm = () => {
  const { t } = useTranslation('common')

  const [signUp, { isLoading }] = useSignUpMutation()
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [email, setEmail] = useState('')

  const callBackCloseWindow = () => setRegistrationSuccess(false)

  const {
    handleSubmit,
    control,
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
  const onSubmit: SubmitHandler<SignUpType> = (data: SignUpType) => {
    signUp(data)
      .unwrap()
      .then(() => {
        setEmail(data.email)
        reset()
        setRegistrationSuccess(true)
      })
      .catch(error => {
        const errField = error.data.messages[0].field
        const errMessage = error.data.messages[0].message

        if (errField === 'userName') {
          toast.error(t('Error.UsernameAlreadyExist'))
        } else if (errField === 'email' && errMessage === 'User with this email is already exist') {
          toast.error(t('Error.EmailIsAlreadyRegistered'))
        } else if (errField === 'email' && errMessage === 'email must be an email') {
          toast.error(toast.error(t('Error.EmailValidationError')))
        } else {
          toast.error(errMessage)
        }
      })
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
          <div className={styles.textContainer}>
            <ControlledTextField
              control={control}
              name="userName"
              label={t('Auth.UserName')}
              placeholder={t('Auth.EnterName')}
            />
            <ControlledTextField
              control={control}
              name="email"
              label={t('Auth.Email')}
              placeholder={t('Auth.EnterEmail')}
            />
            <ControlledTextField
              control={control}
              name="password"
              label={t('Auth.Password')}
              placeholder={t('Auth.EnterPassword')}
              type={InputType.PASSWORD}
            />
            <ControlledTextField
              control={control}
              name="passwordConfirmation"
              label={t('Auth.PasswordConfirmation')}
              placeholder={t('Auth.PasswordConfirmation')}
              type={InputType.PASSWORD}
            />
          </div>
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
              <p className={styles.oppositeBtn}>{t('Auth.SignIn')}</p>
            </Link>
          </Button>
        </form>
      </FormContainer>
    </>
  )
}
