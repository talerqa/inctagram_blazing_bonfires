import * as React from 'react'
import { useEffect, useState } from 'react'

import { useTranslation } from 'next-i18next'

import styles from './payments.module.scss'

import { useGetSubscriptionsQuery } from '@/shared/api'
import { SubscriptionDataType } from '@/shared/api/services/subscriptions/subscriptions.api.types'
import { formatDate } from '@/shared/libs/format-dates/format-dates'
import { LinearLoader, Modal, Pagination, TBody, TCell, THead, THeader, TRow } from '@/shared/ui'
import { Table } from '@/shared/ui/table/table'

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

  const handlePageChange = (page: number) => {
    setPage(page)
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
          <Table className={styles.table}>
            <THead className={styles.head}>
              <TRow>
                <THeader className={styles.item}>{t('DateOfPayment')}</THeader>
                <THeader className={styles.item}>{t('EndDateOfSubscription')}</THeader>
                <THeader className={styles.item}>{t('Price')}</THeader>
                <THeader className={styles.item}>{t('SubscriptionType')}</THeader>
                <THeader className={styles.item}>{t('PaymentType')}</THeader>
              </TRow>
            </THead>
            <TBody className={styles.body}>
              {currentPayments.map((item: SubscriptionDataType, index: number) => (
                <TRow key={index} className={styles.line}>
                  <TCell className={styles.item}>
                    {formatDate(item.dateOfPayment, 'mm.dd.yyyy')}
                  </TCell>
                  <TCell className={styles.item}>
                    {formatDate(item.endDateOfSubscription, 'mm.dd.yyyy')}
                  </TCell>
                  <TCell className={styles.item}>${item.price}</TCell>
                  <TCell className={styles.item}>
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
                  </TCell>
                  <TCell className={styles.item}>
                    {(() => {
                      if (item.paymentType === 'PAYPAL') {
                        return 'PayPal'
                      } else {
                        return 'Stripe'
                      }
                    })()}
                  </TCell>
                </TRow>
              ))}
            </TBody>
          </Table>
        )}

        <Pagination
          handlePageChange={handlePageChange}
          totalPages={totalCount}
          totalCount={totalCount}
          itemsPerPage={itemsCountForPage}
          currentPage={page}
          handleSetItemsPerPage={setItemsCountForPage}
          selectOptions={['10', '20', '30', '40', '50']}
        />
      </div>
    </>
  )
}
