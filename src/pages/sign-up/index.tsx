import React from 'react'

import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { SignUpForm } from '@/features/auth-register'
import { getLayout } from '@/shared/layouts/main-layout/main-layout'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const SignUp = () => {
  return <SignUpForm />
}

SignUp.getLayout = getLayout
export default SignUp
