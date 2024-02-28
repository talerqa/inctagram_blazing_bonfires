import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Controller, useForm } from 'react-hook-form'
import { toast, Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'

import styles from './admin-sign-in-form.module.scss'

import { emailRegex } from '@/entities/admin/admin-sign-in-form/lib'
import { ADMIN_LOGIN } from '@/pages/super-admin/lib/graphql-query-constants/graphql-query-constanst'
import { signInAdmin } from '@/pages/super-admin/modal/slices/admin-auth-reducer'
import { LoginFormType } from '@/shared/api'
import { RoutersPath } from '@/shared/constants/paths'
import { RootState } from '@/shared/providers/store-provider'
import { Button, ButtonSize, FormContainer, Input, InputType } from '@/shared/ui'

export const AdminSignInForm = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t: tAuth } = useTranslation('common', { keyPrefix: 'Auth' })
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })
  const { t } = useTranslation('common')
  const isAdminLogged = useSelector((state: RootState) => state.adminAuth.isAdminLogged)

  if (isAdminLogged) {
    router.replace(RoutersPath.superAdminUsersList)
  }

  const schema = yup.object().shape({
    email: yup.string().required('Error.RequiredField').matches(emailRegex, 'Auth.InvalidEmail'),
    password: yup.string().required(tError('Error.RequiredField')),
  })

  const [loginAdmin] = useMutation(ADMIN_LOGIN, {
    onCompleted: ({ loginAdmin }) => {
      // loginAdmin is taken from data object which comes as second argument in useMutation hook after loginAdmin function
      const isAdminLogged = loginAdmin?.logged

      // Since graphql will never return error ala "Wrong credentials" but always returns { logged: true/false }
      // we cannot add validation before loginAdmin request. Thus we always send request to backend and if "logged" is false ->
      // show toast.error.
      if (!isAdminLogged) {
        toast.error(tAuth('InvalidCredentials'))
      } else {
        sessionStorage.setItem('adminAuth', String(loginAdmin?.logged))
        // Since all components are SSR ( I can't make them client-side for some reason) we have to dispatch "logged" value to store.
        // Because if we will try to sign in again. 29th line will redirect us back to UsersList page.
        dispatch(signInAdmin(isAdminLogged))
        router.replace(RoutersPath.superAdminUsersList)
      }
    },
  })

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

  const onSubmit = handleSubmit((args: LoginFormType) => {
    loginAdmin({
      variables: { email: String(args.email), password: String(args.password) },
    })
  })

  return (
    <>
      <Toaster position="top-right" />
      <FormContainer title={tAuth('SignIn')}>
        <form className={styles.formContainer} onSubmit={onSubmit}>
          <Input
            label={tAuth('Email')}
            type={InputType.EMAIL}
            placeholder={tAuth('EnterEmail')}
            error={t(errors.email?.message || '')}
            {...register('email')}
          />
          <Input
            label={tAuth('Password')}
            type={InputType.PASSWORD}
            placeholder={tAuth('EnterPassword')}
            error={t(errors.password?.message || '')}
            {...register('password')}
          />
          <Button size={ButtonSize.STRETCHED}>{tAuth('SignIn')}</Button>
        </form>
      </FormContainer>
    </>
  )
}
