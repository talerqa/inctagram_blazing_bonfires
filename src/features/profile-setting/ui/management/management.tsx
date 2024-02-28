import * as React from 'react'
import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from './management.module.scss'

import { AccountType } from '../../../../entities/account-type'
import { PaymentButtons } from '../../../../entities/payment-buttons'
import { SubscriptionType } from '../../../../entities/subscription-type'
import {
  useCancelAutoRenewalMutation,
  useCreateNewSubscriptionMutation,
  useGetCurrentSubscriptionsQuery,
} from '@/shared/api/services/subscriptions/subscriptions.api'
import {
  NewSubscriptionType,
  SubscriptionDataType,
} from '@/shared/api/services/subscriptions/subscriptions.api.types'
import { paymentSchema } from '@/shared/constants/validation-schema/payment-schema'
import { formatDate } from '@/shared/libs/format-dates/format-dates'
import { Checkbox, LinearLoader, Modal } from '@/shared/ui'

export const Management = () => {
  const router = useRouter()
  const { success } = router.query

  const { t } = useTranslation('common', { keyPrefix: 'AccountManagement' })
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })

  const currentUrl =
    typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''

  const [subscribed, setSubscribed] = useState(false)
  const [accType, setAccType] = useState('personal')
  const [error, setError] = useState(false)
  const [currentLocalSubs, setCurrentLocalSubs] = useState<SubscriptionDataType[]>([])

  const callBackCloseWindow = () => setSubscribed(false)
  const callBackCloseErrorWindow = () => setError(false)
  const setAccountType = () => setAccType('personal')

  const [cancelAutoRenewal] = useCancelAutoRenewalMutation()
  const { data: currentSubscriptions, isLoading: currentSubscriptionsLoading } =
    useGetCurrentSubscriptionsQuery()

  const [createNewSubscription, { isLoading }] = useCreateNewSubscriptionMutation()
  const {
    handleSubmit: handleSubmitSubscriptions,
    setValue,
    control,
  } = useForm<NewSubscriptionType>({
    resolver: yupResolver(paymentSchema(currentUrl)),
    defaultValues: { typeSubscription: 'DAY' },
    mode: 'onChange',
  })

  const handleStripePayment = () => {
    setValue('paymentType', 'STRIPE')

    return handleSubmitSubscriptions(onSubmit as SubmitHandler<NewSubscriptionType>)()
  }
  const handlePaypalPayment = () => {
    setValue('paymentType', 'PAYPAL')

    return handleSubmitSubscriptions(onSubmit as SubmitHandler<NewSubscriptionType>)()
  }

  const onSubmit: SubmitHandler<NewSubscriptionType> = async (data: NewSubscriptionType) => {
    await createNewSubscription(data)
      .unwrap()
      .then(data => {
        router.replace(data.url)
      })
      .catch(error => {
        setError(error)
      })
  }

  const handleHasAutoRenewal = () => {
    cancelAutoRenewal()
      .unwrap()
      .then(() => {})
      .catch(error => {
        setError(error)
      })
  }

  useEffect(() => {
    currentSubscriptions?.data?.length && setCurrentLocalSubs(currentSubscriptions.data)
  }, [currentSubscriptions]) // don't work with PayPal

  useEffect(() => {
    if (success === 'true') {
      setSubscribed(true)
      router.push('/profile/account-management')
    }
  }, [success])

  const wrapper =
    styles.wrapper + ' ' + (currentSubscriptions?.data?.length === 0 ? styles.wrapperTop : '')

  return (
    <>
      {isLoading && <LinearLoader />}
      {currentSubscriptionsLoading && <LinearLoader />}
      {error && (
        <Modal title={'Error'} mainButton={' Back '} callBackCloseWindow={callBackCloseErrorWindow}>
          <p>{tError('TransactionFailed')}</p>
        </Modal>
      )}
      {subscribed && (
        <Modal title={'Success'} mainButton={' OK '} callBackCloseWindow={callBackCloseWindow}>
          <p>{t('PaymentSuccessful')}</p>
        </Modal>
      )}

      {currentLocalSubs.length! > 0 && (
        <div className={styles.wrapper}>
          <div>
            <h3 className={styles.title}> {t('CurrentSubscription')}:</h3>
            <div className={styles.listWrapper}>
              <div className={styles.currentSubscriptionRow}>
                <p className={styles.currentSubscriptionColumnName}>{t('ExpireAt')}:</p>
                <p className={styles.currentSubscriptionColumnName} style={{ marginLeft: '10px' }}>
                  {t('NextPayment')}:
                </p>
              </div>
              {currentLocalSubs.map((item: SubscriptionDataType, index) => {
                return (
                  <div key={index}>
                    <div className={styles.currentSubscriptionRow}>
                      <p className={styles.currentSubscriptionColumnData}>
                        {formatDate(item.endDateOfSubscription, 'mm.dd.yyyy')}
                      </p>
                      <p className={styles.currentSubscriptionColumnData}>
                        {formatDate(item.dateOfPayment, 'mm.dd.yyyy')}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className={styles.autoRenewalWrapper}>
              <Checkbox
                onChange={handleHasAutoRenewal}
                value={currentSubscriptions?.hasAutoRenewal}
              >
                <p className={styles.autoRenewalLabelStyle}> {t('AutoRenewal')}</p>
              </Checkbox>
            </div>
          </div>
        </div>
      )}

      <div className={wrapper}>
        <div>
          <h3 className={styles.title}>{t('AccountType')}:</h3>
          <AccountType
            setAccountType={setAccountType}
            accType={accType}
            setAccType={setAccType}
            currentLocalSubs={currentLocalSubs}
          />
        </div>

        {(accType === 'business' || (currentLocalSubs && currentLocalSubs.length > 0)) && (
          <form onSubmit={handleSubmitSubscriptions(onSubmit)}>
            <h3 className={styles.title}>{t('YourSubscriptionCosts')}:</h3>
            <SubscriptionType control={control} />
            <PaymentButtons
              paypalHandler={handlePaypalPayment}
              stripeHandler={handleStripePayment}
            />
          </form>
        )}
      </div>
    </>
  )
}
