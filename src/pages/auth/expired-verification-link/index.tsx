import React, { useState } from 'react'

import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast, Toaster } from 'react-hot-toast'

import styles from './ExpiredVerificationLink.module.scss'

import { useResendVerificationLinkMutation } from '@/shared/api/services/auth/auth.api'
import { ResendVerificationLinkType } from '@/shared/api/services/auth/auth.api.types'
import broResend from '@/shared/assets/icons/login/broResend.svg'
import { getLayout } from '@/shared/layouts/mainLayout/MainLayout'
import { ShortLangs } from '@/shared/types/langSwitcherTypes'
import { Modal, CircularLoader, Button, ButtonSize, ButtonTheme } from '@/shared/ui'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const ExpiredVerificationLinkPage = () => {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'Auth' })

  const [resendNewVerificationLink, { isLoading }] = useResendVerificationLinkMutation()
  const [resendVerificationLinkSuccess, setResendVerificationLinkSuccess] = useState(false)
  const callBackCloseWindow = () => setResendVerificationLinkSuccess(false)

  const router = useRouter()
  const { query } = router
  const { email, baseUrl } = query as ResendVerificationLinkType

  const { handleSubmit } = useForm<ResendVerificationLinkType>({
    mode: 'onChange',
    defaultValues: {
      email: email,
      baseUrl: baseUrl,
    },
  })
  const onSubmit: SubmitHandler<ResendVerificationLinkType> = (
    data: ResendVerificationLinkType
  ) => {
    resendNewVerificationLink(data)
      .unwrap()
      .then(() => {
        setResendVerificationLinkSuccess(true)
      })
      .catch(error => toast.error(error.data.messages[0].message))
  }

  return (
    <>
      <Toaster position="top-right" />
      {resendVerificationLinkSuccess && (
        <Modal title={t('NewLinkSent')} mainButton={'OK'} callBackCloseWindow={callBackCloseWindow}>
          <p>{t('NewLinkHaveSentEmail')}</p>
        </Modal>
      )}
      {isLoading && <CircularLoader />}
      <div className={styles.expiredContainer}>
        <h3
          style={
            i18n.language === ShortLangs.RU ? { marginBottom: '0', fontSize: '1rem' } : undefined
          }
        >
          {t('EmailVerificationExpired')}
        </h3>
        <p>{t('LookLikeVerification')}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button theme={ButtonTheme.FILLED} size={ButtonSize.LARGE}>
            {t('ResendVerificationLink')}
          </Button>
        </form>
        <Image src={broResend} alt={'man waits and looks at clock'} />
      </div>
    </>
  )
}

ExpiredVerificationLinkPage.getLayout = getLayout
export default ExpiredVerificationLinkPage
