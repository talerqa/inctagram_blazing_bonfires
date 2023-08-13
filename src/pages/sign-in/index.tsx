import React from 'react'

import { Sign } from '@/features/auth-register'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'
import { getLayout } from '@/shared/ui/layout/MainLayout/MainLayout'

const SignInPage = () => {
  return (
    <div>
      <FormContainer title={'Sing in'}>
        <Sign />
      </FormContainer>
    </div>
  )
}

SignInPage.getLayout = getLayout
export default SignInPage
