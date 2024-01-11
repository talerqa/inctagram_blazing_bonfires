import * as React from 'react'
import { useEffect, useState } from 'react'

import { useTranslation } from 'next-i18next'

import styles from './Payments.module.scss'

import { useGetSubscriptionsQuery } from '@/shared/api'
import { SubscriptionDataType } from '@/shared/api/services/subscriptions/subscriptions.api.types'
import { formatDate } from '@/shared/libs/formatDates/formatDates'
import { LinearLoader, Modal, TablePagination } from '@/shared/ui'

export const Payments = () => {
  const { data: payments, isLoading, isError } = useGetSubscriptionsQuery(undefined)
  const [error, setError] = useState(false)
  const [allPayments, setAllPayment] = useState<SubscriptionDataType[]>([])
  const [page, setPage] = useState(1)
  const [itemsCountForPage, setItemsCountForPage] = useState(10)
  const [totalCount, setTotalCount] = useState(100)

  const { t } = useTranslation('common', { keyPrefix: 'Payments' })
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })

  const lastPaymentIndex = page * itemsCountForPage
  const firstPaymentIndex = lastPaymentIndex - itemsCountForPage
  const currentPayments: SubscriptionDataType[] = allPayments.slice(
    firstPaymentIndex,
    lastPaymentIndex
  )

  const onChangePagination = (newPage: number, newCount: number) => {
    setPage(newPage)
    setItemsCountForPage(newCount)
  }

  useEffect(() => {
    if (payments) {
      setError(isError)
      setTotalCount(payments.length)
      setAllPayment(payments)
    }
  }, [payments])

  return (
    <>
      {isLoading && <LinearLoader />}
      {error && (
        <Modal title={'Error'} mainButton={' Back '} callBackCloseWindow={() => setError(false)}>
          <p>{tError('LoadingFailed')}</p>
        </Modal>
      )}
      <div className={styles.wrapper} data-testid="table">
        {currentPayments && (
          <table className={styles.table}>
            <thead className={styles.head}>
              <tr>
                <th className={styles.item}>{t('DateOfPayment')}</th>
                <th className={styles.item}>{t('EndDateOfSubscription')}</th>
                <th className={styles.item}>{t('Price')}</th>
                <th className={styles.item}>{t('SubscriptionType')}</th>
                <th className={styles.item}>{t('PaymentType')}</th>
              </tr>
            </thead>
            <tbody className={styles.body}>
              {currentPayments.map((item: SubscriptionDataType, index: number) => (
                <tr key={index} className={styles.line}>
                  <td className={styles.item}>{formatDate(item.dateOfPayment, 'mm.dd.yyyy')}</td>
                  <td className={styles.item}>
                    {formatDate(item.endDateOfSubscription, 'mm.dd.yyyy')}
                  </td>
                  <td className={styles.item}>{item.price}</td>
                  <td className={styles.item}>
                    {(() => {
                      if (item.subscriptionType === 'DAY') {
                        return '1 day'
                      } else if (item.subscriptionType === 'WEEKLY') {
                        return '7 days'
                      } else if (item.subscriptionType === 'MONTHLY') {
                        return '1 month'
                      } else {
                        return ''
                      }
                    })()}
                  </td>
                  <td className={styles.item}>
                    {(() => {
                      if (item.paymentType === 'PAYPAL') {
                        return 'PayPal'
                      } else {
                        return 'Stripe'
                      }
                    })()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <TablePagination
          page={page}
          itemsCountForPage={itemsCountForPage}
          totalCount={totalCount}
          onChange={onChangePagination}
        />
      </div>
    </>
  )
}
