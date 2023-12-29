import * as React from 'react'

import styles from './Table.module.scss'

import { SubscriptionDataType } from '@/shared/api/services/subscriptions/subscriptions.api.types'
import { formatDate } from '@/shared/libs/formatDates/formatDates'

type Props = {
  items: Array<SubscriptionDataType>
}

export const Table: React.FC<Props> = ({ items }) => {
  return (
    <table className={styles.table}>
      <thead className={styles.head}>
        <tr>
          <th className={styles.item}>Date of Payment</th>
          <th className={styles.item}>End date of subscription</th>
          <th className={styles.item}>Price</th>
          <th className={styles.item}>Subscription Type</th>
          <th className={styles.item}>Payment Type</th>
        </tr>
      </thead>
      <tbody className={styles.body}>
        {items.map((item: SubscriptionDataType, index: number) => (
          <tr key={index} className={styles.line}>
            <td className={styles.item}>
              {index + 1}, {formatDate(item.dateOfPayment, 'mm.dd.yyyy')}
            </td>
            <td className={styles.item}>{formatDate(item.endDateOfSubscription, 'mm.dd.yyyy')}</td>
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
  )
}
