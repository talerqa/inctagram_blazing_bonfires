import React, { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form'
import * as yup from 'yup'

import styles from './CreateNewPassForm.module.scss'

import { useCreateNewPasswordMutation } from '@/shared/api/services/auth/auth.api'
import { NewPasswordType } from '@/shared/api/services/auth/auth.api.types'
import { RoutersPath } from '@/shared/constants/paths'
import { FormContainer, Input, InputType, LinearLoader, Button, ButtonSize } from '@/shared/ui'
import inputStyles from '@/shared/ui/input/Input.module.scss'

type FormType = {
  newPassword: string
  newPasswordConfirmation: string
}

export function CreateNewPassForm() {
  const [createNewPassword, { isLoading }] = useCreateNewPasswordMutation()
  const { t } = useTranslation('common', { keyPrefix: 'Auth' })
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })
  const [codeRecovery, setCodeRecovery] = useState('')

  const router = useRouter()
  const { query } = router
  const { code } = query

  useEffect(() => {
    if (code) setCodeRecovery(code as string)
  }, [code])

  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .min(6, tError('MinCharacters6'))
      .max(20, tError('MaxCharacters20'))
      .matches(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]+$/,
        tError('PasswordValidationError')
      )
      .required(tError('RequiredField')),
    newPasswordConfirmation: yup.string().required(tError('RequiredField')),
  })

  const {
    watch,
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      newPassword: '',
      newPasswordConfirmation: '',
    },
  })

  const password = watch('newPassword', '')

  const onSubmit: SubmitHandler<NewPasswordType> = data => {
    if (!data) {
      throw new Error('data is undefined')
    } else {
      data.recoveryCode = codeRecovery
    }
    createNewPassword(data)
      .unwrap()
      .then(() => {
        reset()
        router.push(RoutersPath.signIn)
      })
      .catch(error => {
        if (error.data.messages[0].field === 'newPassword') {
          setError('newPassword', {
            type: 'manual',
            message: error.data.messages[0].message,
          })
        }
      })
  }

  return (
    <>
      {isLoading && <LinearLoader />}
      <FormContainer title={t('CreateNewPassword')}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
          <Input
            {...register('newPassword')}
            label={t('Password')}
            type={InputType.PASSWORD}
            placeholder={t('EnterPassword')}
            className={inputStyles.input}
            error={errors.newPassword && errors.newPassword?.message}
          />
          <Input
            {...register('newPasswordConfirmation', {
              validate: {
                value: (value: string) => value === password || t('PasswordDoNotmatch'),
              },
            })}
            label={t('PasswordConfirmation')}
            type={InputType.PASSWORD}
            placeholder={t('EnterPasswordConfirmation')}
            className={inputStyles.input}
            error={errors.newPasswordConfirmation && errors.newPasswordConfirmation?.message}
          />
          <Button size={ButtonSize.STRETCHED} className={styles.sendLinkBtn}>
            {t('CreateNewPassword')}
          </Button>
        </form>
      </FormContainer>
    </>
  )
}
