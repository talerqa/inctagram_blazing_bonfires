import * as React from 'react'
import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import styles from './Management.module.scss'

import {
  useCancelAutoRenewalMutation,
  useCreateNewSubscriptionMutation,
  useGetCurrentSubscriptionsQuery,
} from '@/shared/api/services/subscriptions/subscriptions.api'
import {
  NewSubscriptionType,
  PaymentType,
  SubscriptionDataType,
  SubscriptionType,
} from '@/shared/api/services/subscriptions/subscriptions.api.types'
import payPal from '@/shared/assets/icons/payments/payPal.svg'
import stripe from '@/shared/assets/icons/payments/stripe.svg'
import { formatDate } from '@/shared/libs/formatDates/formatDates'
import { Checkbox } from '@/shared/ui/checkbox/Checkbox'
import { LinearLoader } from '@/shared/ui/loaders/LinearLoader'
import { Modal } from '@/shared/ui/modal/Modal'
import { RoundCheckbox } from '@/shared/ui/roundCheckbox/RoundCheckbox'

// create new subscription
const schema = yup.object({
  typeSubscription: yup.string<SubscriptionType>().required(),
  paymentType: yup.string<PaymentType>().required(),
  amount: yup.number().default(1).required(),
  baseUrl: yup.string().default('http://localhost:3000/').required(),
})

export const Management = () => {
  const router = useRouter()

  const {
    t,
    i18n: { t: tRoot },
  } = useTranslation('common', { keyPrefix: 'AccountManagement' })
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })

  const { success } = router.query

  const [subscribed, setSubscribed] = useState(false)
  const callBackCloseWindow = () => setSubscribed(false)

  const [accType, setAccType] = useState('personal')

  const [error, setError] = useState(false)
  const callBackCloseErrorWindow = () => setError(false)

  const [cancelAutoRenewal] = useCancelAutoRenewalMutation()

  const { data: currentSubscriptions, isLoading: currentSubscriptionsLoading } =
    useGetCurrentSubscriptionsQuery()

  const [createNewSubscription, { isLoading }] = useCreateNewSubscriptionMutation()
  const {
    handleSubmit: handleSubmitSubscriptions,
    setValue,
    control,
  } = useForm<NewSubscriptionType>({
    resolver: yupResolver(schema),
    defaultValues: { typeSubscription: 'DAY' },
    mode: 'onChange',
  })

  const handleStripePaymentType = () => {
    setValue('paymentType', 'STRIPE')

    return handleSubmitSubscriptions(onSubmit as SubmitHandler<NewSubscriptionType>)()
  }
  const handlePaypalPaymentType = () => {
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

  const wrapper =
    styles.wrapper + ' ' + (currentSubscriptions?.data?.length === 0 ? styles.wrapperTop : '')

  const setAccountType = () => setAccType('personal')

  const [currentLocalSubs, setCurrentLocalSubs] = useState<SubscriptionDataType[]>([])

  useEffect(() => {
    currentSubscriptions?.data?.length && setCurrentLocalSubs(currentSubscriptions.data)
  }, [currentSubscriptions]) // don't work with PayPal

  useEffect(() => {
    if (success === 'true') {
      setSubscribed(true)
      router.push('/profile/account-management')
    }
  }, [success])

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
      {/*current subscription*/}
      {currentLocalSubs.length! > 0 && (
        <div className={styles.wrapper} style={{ marginTop: '-30px' }}>
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
            {/*auto-renewal*/}
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
      {/*business or personal acc*/}
      <div className={wrapper}>
        <div>
          <h3 className={styles.title}>{t('AccountType')}:</h3>
          <div className={styles.listWrapper}>
            <RoundCheckbox
              name={'accType'}
              onChange={setAccountType}
              label={<p className={styles.listItem}>{t('Personal')}</p>}
              checked={accType === 'personal'}
            />
            <RoundCheckbox
              name={'accType'}
              onChange={() => setAccType('business')}
              label={<p className={styles.listItem}>{t('Business')}</p>}
              checked={accType === 'business' || (currentLocalSubs && currentLocalSubs.length > 0)}
            />
          </div>
        </div>
        {/*due date*/}
        {(accType === 'business' || (currentLocalSubs && currentLocalSubs.length > 0)) && (
          <form onSubmit={handleSubmitSubscriptions(onSubmit)}>
            <h3 className={styles.title}>{t('YourSubscriptionCosts')}:</h3>
            <div className={styles.listWrapper}>
              <Controller
                control={control}
                name="typeSubscription"
                render={({ field: { onChange, value } }) => (
                  <>
                    <RoundCheckbox
                      key={'day'}
                      value={'DAY'}
                      label={<p className={styles.listItem}>{t('$10per1Day')}</p>}
                      onChange={onChange}
                      checked={value === 'DAY'}
                    />
                    <RoundCheckbox
                      key={'weekly'}
                      value={'WEEKLY'}
                      label={<p className={styles.listItem}>{t('$50per7Days')}</p>}
                      onChange={onChange}
                      checked={value === 'WEEKLY'}
                    />
                    <RoundCheckbox
                      key={'monthly'}
                      value={'MONTHLY'}
                      label={<p className={styles.listItem}>{t('$100per1month')}</p>}
                      onChange={onChange}
                      checked={value === 'MONTHLY'}
                    />
                  </>
                )}
              />
            </div>
            {/*payment method*/}
            <div className={styles.footerWrapper}>
              <div className={styles.footer}>
                <button className={styles.imgWrapper} onClick={handlePaypalPaymentType}>
                  <Image className={styles.img} src={payPal} alt="payPal icon" />
                </button>
                <p>{t('or')}</p>
                <button className={styles.imgWrapper} onClick={handleStripePaymentType}>
                  <Image className={styles.img} src={stripe} alt="stripe icon" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  )
}
